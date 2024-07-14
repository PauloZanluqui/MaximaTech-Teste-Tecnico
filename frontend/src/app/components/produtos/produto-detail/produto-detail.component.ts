import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Produtos } from '../produtos.interface';
import { ProdutosService } from '../produtos.service';

import { Departamentos } from '../../departamentos/departamentos.interface';
import { DepartamentosService } from '../../departamentos/departamentos.service';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.component.html',
  styleUrl: './produto-detail.component.css',
})
export class ProdutoDetailComponent {
  produto: Produtos | undefined;
  prodId: number | undefined;
  formProduto: FormGroup;
  departamentosDropdown: Departamentos[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private produtosService: ProdutosService,
    private location: Location,
    private departamentosService: DepartamentosService,
    private messageService: MessageService,
  ) {
    this.formProduto = this.formBuilder.group({
      id: new FormControl({ value: null, disabled: true }),
      codigo: new FormControl(null, Validators.required),
      descricao: new FormControl(null, Validators.required),
      departamentoId: new FormControl(null, Validators.required),
      preco: new FormControl(null, Validators.required),
      status: new FormControl(true, Validators.required),
    });
  }

  ngOnInit() {
    this.prodId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(this.prodId)) {
      this.produtosService.getProduto(this.prodId).subscribe((data) => {
        this.produto = data;
        this.createForm(this.produto);
      });
    }

    this.departamentosService.getAllDepartamentos().subscribe((data) => {
      this.departamentosDropdown = data
    })
  }

  createForm(produto: Produtos) {
    this.formProduto.controls['id'].patchValue(produto.id)
    this.formProduto.controls['codigo'].patchValue(produto.codigo)
    this.formProduto.controls['descricao'].patchValue(produto.descricao)
    this.formProduto.controls['departamentoId'].patchValue(produto.departamentoId)
    this.formProduto.controls['preco'].patchValue(produto.preco)
    this.formProduto.controls['status'].patchValue(produto.status)
  }

  createProduto() {
    if (this.formProduto.valid) {
      this.produto = {
        codigo: this.formProduto.controls['codigo'].value,
        descricao: this.formProduto.controls['descricao'].value,
        departamentoId: this.formProduto.controls['departamentoId'].value,
        preco: this.formProduto.controls['preco'].value,
        status: this.formProduto.controls['status'].value,
      }

      this.produtosService.createProduto(this.produto).subscribe((data) => {
        this.goToProdutos()
      })
    }else {
      this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos'});
    }
  }

  updateProduto(){
    if (this.formProduto.valid) {
      this.produto = {
        id: this.formProduto.controls['id'].value,
        codigo: this.formProduto.controls['codigo'].value,
        descricao: this.formProduto.controls['descricao'].value,
        departamentoId: this.formProduto.controls['departamentoId'].value,
        preco: this.formProduto.controls['preco'].value,
        status: this.formProduto.controls['status'].value,
      }

      this.produtosService.updateProduto(this.produto).subscribe(() => {
        this.goToProdutos()
      })
    }else {
      this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Preencha todos os campos'});
    }
  }

  goToProdutos() {
    this.location.back();
  }
}
