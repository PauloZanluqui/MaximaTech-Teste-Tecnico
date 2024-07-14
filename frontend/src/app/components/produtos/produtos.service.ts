import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Produtos } from './produtos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private api: string = environment.APIEndpoint + '/produtos';
  constructor(private http: HttpClient) { }

  getAllProdutos() {
    return this.http.get<Produtos[]>(this.api);
  }

  getProduto(id: number) {
    return this.http.get<Produtos>(this.api + '/' + id);
  }

  createProduto(produto: Produtos) {
    return this.http.post<Produtos>(this.api, produto);
  }

  updateProduto(produto: Produtos) {
    return this.http.put(this.api + '/' + produto.id, produto);
  }

  deleteProduto(id: number) {
    return this.http.delete<Produtos[]>(this.api + '/' + id)
  }
}
