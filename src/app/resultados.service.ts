import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface resultadostotalI {

  nombrecompleto: string;
  identificacion: string;
  edad: string;
  escolaridad: string;
  lateralidad: string;
  gravedad: string;
  accidentesreportados: string;
  atsostenida: string | number;
  atalternante: string;
  tiemporespuesta: string;
  controlinhibitorio: string;
  rango1: string;
  rango2: string;
  rango3: string;
  rango4: string;
  rangototal: string;
  calificacion1: string;
  calificacion2: string;
  calificacion3: string;
  calificacion4: string;
  calificaciontotal: string;
  valor1: string;
  valor2: string;
  valor3: string;
  valor4: string;
  valor5: string;
  valor6: string;
  valor7: string;
  valor8: string;
  conclusiones: string;
  nombreprofe: string;
  estudioprofe: string;
  urlfirma: string;
  fecha: string;
  id_ctp_resultados: string;
  estado: string;
  token?: string;
}

export interface ResponseI {

  status: string;
  response: string;

}

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  //url :string = "https://api.prevencionvialintegral.com/"; 
  url :string = "http://localhost/ververver/";

  constructor( private http:HttpClient) { }

  agreagarresultados(form:resultadostotalI):Observable<ResponseI>{
    let direccion = this.url + "resultadostotal";
    return this.http.post<ResponseI>(direccion,form);
  }

  verresultado():Observable<ResponseI>{
    let direccion = this.url + "resultadostotal?page=1";
    return this.http.get<ResponseI>(direccion);
  }
}
