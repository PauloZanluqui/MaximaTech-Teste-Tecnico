import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosComponent } from './produtos.component';
import { ProdutoDetailComponent } from './produto-detail/produto-detail.component';

const routes: Routes = [
  {
    path: 'produtos',
    children: [
      { path: '', component: ProdutosComponent },
      { path: ':id', component: ProdutoDetailComponent },
      { path: 'new', component: ProdutoDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutosRoutingModule {}
