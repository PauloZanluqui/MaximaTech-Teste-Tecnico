import { Component } from '@angular/core';
import { Departamentos } from './departamentos.interface';
import { DepartamentosService } from './departamentos.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrl: './departamentos.component.css'
})
export class DepartamentosComponent {
  departamentos: Departamentos[] = [];
  loading: boolean = true;

  constructor(private departamentosService: DepartamentosService){}

  loadData() {
    this.loading = true;
    this.departamentosService.getAllDepartamentos().subscribe((data) => {
      this.loading = false
      this.departamentos = data
    })
  }

  deleteDepartamento(id:number) {
    this.departamentosService.deleteDepartamento(id).subscribe(() => {
      this.loadData();
    });
  }
}