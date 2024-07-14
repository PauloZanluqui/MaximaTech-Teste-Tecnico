import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departamentos } from './departamentos.interface';
import { environment } from '../../../environments/environment';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartamentosService {
  private api: string = environment.APIEndpoint + '/departamentos';
  constructor(private http: HttpClient) {}

  // private handleError(error: HttpErrorResponse) {
  //   console.log(error.error)
  //   return throwError(() => error);
  // }

  getAllDepartamentos() {
    return this.http.get<Departamentos[]>(this.api);
  }

  getDepartamento(id: number) {
    return this.http.get<Departamentos>(this.api + '/' + id);
  }

  createDepartamento(departamento: Departamentos) {
    return this.http.post<Departamentos>(this.api, departamento);
  }

  updateDepartamento(departamento: Departamentos) {
    return this.http.put(this.api + '/' + departamento.id, departamento);
  }

  deleteDepartamento(id: number) {
    return this.http.delete(this.api + '/' + id);
  }
}
