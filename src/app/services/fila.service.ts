import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Senha, TipoSenha } from '../models/senha.model';

@Injectable({ providedIn: 'root' })
export class FilaService {

  private sequencias: Record<TipoSenha, number> = { SP: 0, SE: 0, SG: 0 };
  private filaSP: Senha[] = [];
  private filaSE: Senha[] = [];
  private filaSG: Senha[] = [];

  private ultimasChamadas: Senha[] = [];
  private todasSenhas: Senha[] = [];

  private _painel$ = new BehaviorSubject<Senha[]>([]);
  painel$ = this._painel$.asObservable();

  private _filaAtual$ = new BehaviorSubject<{ SP: number; SE: number; SG: number }>({ SP: 0, SE: 0, SG: 0 });
  filaAtual$ = this._filaAtual$.asObservable();

  private ultimoTipoChamado: 'SP' | 'OUTRO' = 'OUTRO';
  readonly NUM_GUICHES = 3;
  private guiches: boolean[] = Array(this.NUM_GUICHES).fill(true);

  get expedienteAberto(): boolean {
    const agora = new Date();
    const h = agora.getHours();
    return h >= 7 && h < 17;
  }

  emitirSenha(tipo: TipoSenha): Senha | null {
    if (!this.expedienteAberto) return null;
    this.sequencias[tipo]++;
    const numero = this.gerarNumero(tipo, this.sequencias[tipo]);
    const senha: Senha = {
      numero,
      tipo,
      emitidaEm: new Date(),
      atendida: false,
      descartada: false,
    };
    if (Math.random() < 0.05) {
      senha.descartada = true;
      this.todasSenhas.push(senha);
      this.atualizarContadores();
      return senha;
    }
    this.todasSenhas.push(senha);
    if (tipo === 'SP') this.filaSP.push(senha);
    else if (tipo === 'SE') this.filaSE.push(senha);
    else this.filaSG.push(senha);
    this.atualizarContadores();
    return senha;
  }

  chamarProximo(): Senha | null {
    if (!this.expedienteAberto) return null;
    const guiche = this.guicheLivre();
    if (guiche === -1) return null;
    let senha: Senha | undefined;
    if (this.ultimoTipoChamado === 'OUTRO') {
      senha = this.filaSP.shift();
      if (senha) {
        this.ultimoTipoChamado = 'SP';
      } else {
        senha = this.filaSE.shift() ?? this.filaSG.shift();
      }
    } else {
      senha = this.filaSE.shift() ?? this.filaSG.shift();
      if (senha) {
        this.ultimoTipoChamado = 'OUTRO';
      } else {
        senha = this.filaSP.shift();
        if (senha) this.ultimoTipoChamado = 'SP';
      }
    }
    if (!senha) return null;
    this.guiches[guiche] = false;
    senha.chamadaEm = new Date();
    senha.guiche = guiche + 1;
    senha.atendida = true;
    senha.tmMinutos = this.calcularTM(senha.tipo);
    setTimeout(() => { this.guiches[guiche] = true; }, senha.tmMinutos * 60 * 1000);
    this.ultimasChamadas.unshift(senha);
    if (this.ultimasChamadas.length > 5) this.ultimasChamadas.pop();
    this._painel$.next([...this.ultimasChamadas]);
    this.atualizarContadores();
    return senha;
  }

  getRelatorio(filtro: 'diario' | 'mensal') {
    const agora = new Date();
    const senhas = this.todasSenhas.filter(s => {
      if (filtro === 'diario') return s.emitidaEm.toDateString() === agora.toDateString();
      return s.emitidaEm.getMonth() === agora.getMonth() && s.emitidaEm.getFullYear() === agora.getFullYear();
    });
    const result = {
      emitidas: senhas.length,
      atendidas: senhas.filter(s => s.atendida).length,
      porTipo: {
        SP: { emitidas: 0, atendidas: 0 },
        SE: { emitidas: 0, atendidas: 0 },
        SG: { emitidas: 0, atendidas: 0 },
      } as Record<TipoSenha, { emitidas: number; atendidas: number }>,
      detalhes: senhas,
      tmMedio: { SP: 0, SE: 0, SG: 0 } as Record<TipoSenha, number>,
    };
    for (const s of senhas) {
      result.porTipo[s.tipo].emitidas++;
      if (s.atendida) result.porTipo[s.tipo].atendidas++;
    }
    for (const tipo of ['SP', 'SE', 'SG'] as TipoSenha[]) {
      const atendidas = senhas.filter(s => s.tipo === tipo && s.atendida && s.tmMinutos);
      result.tmMedio[tipo] = atendidas.length ? atendidas.reduce((acc, s) => acc + (s.tmMinutos ?? 0), 0) / atendidas.length : 0;
    }
    return result;
  }

  getPainel(): Senha[] { return [...this.ultimasChamadas]; }

  private gerarNumero(tipo: TipoSenha, seq: number): string {
    const agora = new Date();
    const yy = String(agora.getFullYear()).slice(-2);
    const mm = String(agora.getMonth() + 1).padStart(2, '0');
    const dd = String(agora.getDate()).padStart(2, '0');
    const sq = String(seq).padStart(3, '0');
    return `${yy}${mm}${dd}-${tipo}${sq}`;
  }

  private calcularTM(tipo: TipoSenha): number {
    if (tipo === 'SP') return 15 + (Math.random() * 10 - 5);
    else if (tipo === 'SE') return Math.random() < 0.95 ? 1 : 5;
    else return 5 + (Math.random() * 6 - 3);
  }

  private guicheLivre(): number { return this.guiches.findIndex(g => g); }

  private atualizarContadores() {
    this._filaAtual$.next({ SP: this.filaSP.length, SE: this.filaSE.length, SG: this.filaSG.length });
  }

  encerrarExpediente() {
    this.filaSP = []; this.filaSE = []; this.filaSG = [];
    this.atualizarContadores();
  }
}
