import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoLabelPipe } from './pipes/tipo-label.pipe';

@NgModule({
  declarations: [TipoLabelPipe],
  imports: [CommonModule],
  exports: [TipoLabelPipe],
})
export class SharedModule {}
