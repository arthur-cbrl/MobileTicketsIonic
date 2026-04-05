import { Pipe, PipeTransform } from '@angular/core';
import { TipoSenha } from '../../models/senha.model';

const LABELS: Record<TipoSenha, string> = {
  SP: 'Prioritário',
  SE: 'Retirada de Exames',
  SG: 'Geral',
};

@Pipe({ name: 'tipoLabel', standalone: true })
export class TipoLabelPipe implements PipeTransform {
  transform(value: TipoSenha | string): string {
    return LABELS[value as TipoSenha] ?? value;
  }
}
