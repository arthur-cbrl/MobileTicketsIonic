import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon,
  IonBadge, IonGrid, IonRow, IonCol, IonText, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { megaphoneOutline } from 'ionicons/icons';
import { Observable } from 'rxjs';
import { FilaService } from '../../services/fila.service';
import { Senha, TipoSenha } from '../../models/senha.model';
import { TipoLabelPipe } from '../../shared/pipes/tipo-label.pipe';

@Component({
  selector: 'app-atendente',
  templateUrl: './atendente.page.html',
  styleUrls: ['./atendente.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton,
    IonIcon, IonBadge, IonGrid, IonRow, IonCol, IonText, TipoLabelPipe],
})
export class AtendentePage {
  ultimaChamada: Senha | null = null;
  filaInfo$: Observable<{ SP: number; SE: number; SG: number }>;

  constructor(private filaService: FilaService, private toastCtrl: ToastController) {
    this.filaInfo$ = this.filaService.filaAtual$;
    addIcons({ megaphoneOutline });
  }

  get expedienteAberto(): boolean { return this.filaService.expedienteAberto; }

  async chamarProximo() {
    const senha = this.filaService.chamarProximo();
    if (!senha) {
      const toast = await this.toastCtrl.create({ message: 'Não há senhas na fila ou todos os guichês estão ocupados.', duration: 2500, color: 'warning' });
      await toast.present();
      return;
    }
    this.ultimaChamada = senha;
  }

  corBadge(tipo: string): string {
    return ({ SP: 'danger', SE: 'warning', SG: 'success' } as Record<string,string>)[tipo] ?? 'medium';
  }
}
