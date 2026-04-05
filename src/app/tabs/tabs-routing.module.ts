import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'totem', loadComponent: () => import('../pages/totem/totem.page').then(m => m.TotemPage) },
      { path: 'painel', loadComponent: () => import('../pages/painel/painel.page').then(m => m.PainelPage) },
      { path: 'atendente', loadComponent: () => import('../pages/atendente/atendente.page').then(m => m.AtendentePage) },
      { path: 'relatorios', loadComponent: () => import('../pages/relatorios/relatorios.page').then(m => m.RelatoriosPage) },
      { path: '', redirectTo: '/tabs/totem', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/tabs/totem', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TabsPage],
  exports: [RouterModule],
})
export class TabsPageModule {}
