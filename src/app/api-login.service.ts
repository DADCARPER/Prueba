import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

// Definición de la estructura de los objetos letras con tiempo
export interface FormuloginI {
  
  usuario: string;
  password: string;

}

export interface ResponseI {

  status: string;
  result: any;

}

@Injectable({
  providedIn: 'root'
})
export class ApiLoginService {

  //url :string = "https://api.prevencionvialintegral.com/"; 
  url :string = "http://localhost/ververver/";

  constructor( private http:HttpClient) { }

  pacientes(form:FormuloginI):Observable<ResponseI>{
    let direccion = this.url + "auth";
    return this.http.post<ResponseI>(direccion,form);
  }
}
