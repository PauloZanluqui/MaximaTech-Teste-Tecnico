import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartamentosRoutingModule } from './departamentos-routing.module';
import { DepartamentoDetailComponent } from './departamento-detail/departamento-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    DepartamentoDetailComponent
  ],
  imports: [
    CommonModule,
    DepartamentosRoutingModule,
    ReactiveFormsModule,
		FormsModule,
		InputNumberModule,
		InputTextModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [
    MessageService
  ]
})
export class DepartamentosModule { }
