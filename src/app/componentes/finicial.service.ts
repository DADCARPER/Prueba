import { Injectable } from '@angular/core';

// Definición de la estructura de los objetos letras con tiempo
export interface Finicial {
  
  nombre: string;
  apellidos: string;
  identificacion: string;
  edad: number;
  escolaridad: string;
  lateralidad: string;
  accidentes: number;
  antecedentes: string;
  correoelectronico: string;
  
}

@Injectable({
  providedIn: 'root'
})
export class FinicialService {

   // Array de persona y correo
   registrousuarios: Finicial[] = [];

   constructor() { }

     // Método para agregar un nuevo usuario
    agregarRegistro(nuevaoRegistro: Finicial): void {
    this.registrousuarios.push(nuevaoRegistro);
    }
}
