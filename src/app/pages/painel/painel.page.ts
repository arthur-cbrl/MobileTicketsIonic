import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonBadge
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { hourglassOutline } from 'ionicons/icons';
import { Observable } from 'rxjs';
import { Senha, TipoSenha } from '../../models/senha.model';
import { FilaService } from '../../services/fila.service';
import { TipoLabelPipe } from '../../shared/pipes/tipo-label.pipe';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.page.html',
  styleUrls: ['./painel.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonBadge, TipoLabelPipe],
})
export class PainelPage {
  painel$: Observable<Senha[]>;
  constructor(private filaService: FilaService) {
    this.painel$ = this.filaService.painel$;
    addIcons({ hourglassOutline });
  }
  corBadge(tipo: TipoSenha): string {
    return { SP: 'danger', SE: 'warning', SG: 'success' }[tipo];
  }
}
