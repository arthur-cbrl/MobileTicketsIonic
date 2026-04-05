export type TipoSenha = 'SP' | 'SE' | 'SG';

export interface Senha {
  numero: string;
  tipo: TipoSenha;
  emitidaEm: Date;
  chamadaEm?: Date;
  guiche?: number;
  atendida: boolean;
  descartada: boolean;
  tmMinutos?: number;
}
