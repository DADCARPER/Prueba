import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

// Definición de la estructura de los objetos letras con tiempo
export interface FormupacientesI {
  
  //id: number;
  dni: any;
  nombre: any;
  apellidos: any;
  fechanacimiento: any;
  correo: any;
  escolaridad: any;
  lateralidad: any;
  direccion: any;
  numaccidentes: any;
  gravedad: any;
  antecedentes: any;
  idusuarioadminmodifica: any;
  token: any;
  
}

export interface ResponseI {

  status: string;
  response: string;

}

export interface ListapacientesI {
  
  pacienteid: string;
  dni: string;
  nombre: string;
  apellidos: string;
  direccion: string;
  ciudad: string;
  edad?: string;
  telefono: string;
  genero: string;
  fechanacimiento: string;
  correo: string;
  escolaridad: string;
  lateralidad: string;
  numaccidentes: string;
  gravedad: string | number;
  antecedentes: string;
  fechacreado?: string;
  fechamodificado: string;
  idusuarioadminmodifica: string;
  borrado?: string;
  token?: string;
  
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url :string = "https://api.prevencionvialintegral.com/"; 
  //url :string = "http://localhost/ververver/";

  constructor( private http:HttpClient) { }

  agregarpacientes(form:FormupacientesI):Observable<ResponseI>{
    let direccion = this.url + "pacientes";
    return this.http.post<ResponseI>(direccion,form);
  }

  llamopacientespagina(pagina:number):Observable<ListapacientesI>{

    let direccion =this.url + "pacientes?page=" + pagina;
    return this.http.get<ListapacientesI>(direccion);
  }

  llamopacientesid(id:number):Observable<ListapacientesI>{

    let direccion =this.url + "pacientes?id=" + id;
    return this.http.get<ListapacientesI>(direccion);
  }

  llamopacientesdni(dni:string | number):Observable<ListapacientesI>{

    let direccion =this.url + "pacientes?dni=" + dni;
    return this.http.get<ListapacientesI>(direccion);
  }

  editarpaciente(form:ListapacientesI):Observable<ListapacientesI>{
  
    let direccion = this.url + "pacientes";
    return this.http.put<ListapacientesI>(direccion,form);
  }
}
