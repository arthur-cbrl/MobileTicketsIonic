import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon, ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { starOutline, documentOutline, peopleOutline, timeOutline } from 'ionicons/icons';
import { FilaService } from '../../services/fila.service';
import { Senha, TipoSenha } from '../../models/senha.model';
import { TipoLabelPipe } from '../../shared/pipes/tipo-label.pipe';

@Component({
  selector: 'app-totem',
  templateUrl: './totem.page.html',
  styleUrls: ['./totem.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon, TipoLabelPipe],
})
export class TotemPage {
  ultimaSenha: Senha | null = null;

  constructor(private filaService: FilaService, private toastCtrl: ToastController) {
    addIcons({ starOutline, documentOutline, peopleOutline, timeOutline });
  }

  get expedienteAberto(): boolean {
    return this.filaService.expedienteAberto;
  }

  async emitir(tipo: TipoSenha) {
    const senha = this.filaService.emitirSenha(tipo);
    if (!senha) {
      const toast = await this.toastCtrl.create({ message: 'Fora do horário de atendimento.', duration: 2000, color: 'danger' });
      await toast.present();
      return;
    }
    this.ultimaSenha = senha;
  }
}
