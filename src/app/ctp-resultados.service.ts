import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

export interface resultadosctpI {

  omision: string;
  porceomision: string;
  comision: string;
  porcecomision: string;
  tiemporespuesta: string;
  perseveracion: string;
  porceperseveracion: string;
  idpaciente: string | number;
  token?: string;
}

export interface ResponseI {

  status: string;
  response: string;

}

@Injectable({
  providedIn: 'root'
})
export class CtpResultadosService {

  url :string = "https://api.prevencionvialintegral.com/"; 
  //url :string = "http://localhost/ververver/";

  constructor( private http:HttpClient) { }

  agreagarresultados(form:resultadosctpI):Observable<ResponseI>{
    let direccion = this.url + "ctpresultados";
    return this.http.post<ResponseI>(direccion,form);
  }

  verresultado(id:number):Observable<ResponseI>{
    let direccion = this.url + "ctpresultados?id=" + id;
    return this.http.get<ResponseI>(direccion);
  }

}
