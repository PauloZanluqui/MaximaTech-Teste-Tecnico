import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { DepartamentosService } from '../departamentos.service';
import { Departamentos } from '../departamentos.interface';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-departamento-detail',
  templateUrl: './departamento-detail.component.html',
  styleUrl: './departamento-detail.component.css',
})
export class DepartamentoDetailComponent {
  departamento: Departamentos | undefined;
  departId: number | undefined;
  formDepartamento: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private departamentosService: DepartamentosService,
    private messageService: MessageService
  ) {
    this.formDepartamento = this.formBuilder.group({
      id: new FormControl({ value: null, disabled: true }),
      codigo: new FormControl(null, Validators.required),
      descricao: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
    this.departId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(this.departId)) {
      this.departamentosService
        .getDepartamento(this.departId)
        .subscribe((data) => {
          this.departamento = data;
          this.createForm(this.departamento);
        });
    }
  }

  createForm(depart: Departamentos) {
    this.formDepartamento.controls['id'].patchValue(depart.id);
    this.formDepartamento.controls['codigo'].patchValue(depart.codigo);
    this.formDepartamento.controls['descricao'].patchValue(depart.descricao);
  }

  createDepartamento() {
    if (this.formDepartamento.valid) {
      this.departamento = {
        codigo: this.formDepartamento.controls['codigo'].value,
        descricao: this.formDepartamento.controls['descricao'].value,
      };

      this.departamentosService
        .createDepartamento(this.departamento)
        .subscribe((data) => {
          this.goToDepartamentos();
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha todos os campos',
      });
    }
  }

  updateDepartamento() {
    if (this.formDepartamento.valid) {
      this.departamento = {
        id: this.formDepartamento.controls['id'].value,
        codigo: this.formDepartamento.controls['codigo'].value,
        descricao: this.formDepartamento.controls['descricao'].value,
      };

      this.departamentosService
        .updateDepartamento(this.departamento)
        .subscribe(() => {
          this.goToDepartamentos();
        });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Preencha todos os campos',
      });
    }
  }

  goToDepartamentos() {
    this.location.back();
  }
}
