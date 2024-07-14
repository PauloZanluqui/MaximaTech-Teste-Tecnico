import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentosComponent } from './departamentos.component';
import { DepartamentoDetailComponent } from './departamento-detail/departamento-detail.component';

const routes: Routes = [
  {
    path: 'departamentos',
    children: [
      { path: '', component: DepartamentosComponent },
      { path: ':id', component: DepartamentoDetailComponent },
      { path: 'new', component: DepartamentoDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartamentosRoutingModule {}
