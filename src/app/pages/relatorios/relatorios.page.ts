import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonItem, IonLabel, IonBadge, IonList,
  IonIcon, IonSegment, IonSegmentButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';
import { FilaService } from '../../services/fila.service';
import { TipoSenha } from '../../models/senha.model';
import { TipoLabelPipe } from '../../shared/pipes/tipo-label.pipe';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.page.html',
  styleUrls: ['./relatorios.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel,
    IonBadge, IonList, IonIcon, IonSegment, IonSegmentButton, TipoLabelPipe],
})
export class RelatoriosPage implements OnInit {
  filtro: 'diario' | 'mensal' = 'diario';
  relatorio: ReturnType<FilaService['getRelatorio']> | null = null;
  tipos: TipoSenha[] = ['SP', 'SE', 'SG'];

  constructor(private filaService: FilaService) {
    addIcons({ checkmarkCircle, closeCircle });
  }

  ngOnInit() { this.gerarRelatorio(); }

  gerarRelatorio() { this.relatorio = this.filaService.getRelatorio(this.filtro); }

  corBadge(tipo: TipoSenha): string {
    return { SP: 'danger', SE: 'warning', SG: 'success' }[tipo];
  }
}
