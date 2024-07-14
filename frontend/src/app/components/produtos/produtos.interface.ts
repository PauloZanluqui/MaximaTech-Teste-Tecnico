import { Departamentos } from "../departamentos/departamentos.interface";

export interface Produtos {
  id?: string;
  codigo: string;
  descricao: string;
  departamento?: Departamentos;
  departamentoId: number;
  preco: number;
  status: boolean;
}