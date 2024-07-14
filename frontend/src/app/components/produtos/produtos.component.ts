import { Component } from '@angular/core';
import { Produtos } from './produtos.interface';
import { ProdutosService } from './produtos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css',
})
export class ProdutosComponent {
  produtos: Produtos[] = [];
  loading: boolean = true;

  constructor(private produtosService: ProdutosService) {}

  loadData() {
    this.loading = true;
    this.produtosService.getAllProdutos().subscribe((data) => {
      this.loading = false;
      console.log(data)
      this.produtos = data;
    });
  }

  deleteProduto(id: number) {
    this.produtosService.deleteProduto(id).subscribe(() => {
      this.loadData();
    });
  }
}