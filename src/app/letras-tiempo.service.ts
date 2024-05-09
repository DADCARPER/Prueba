import { Injectable } from '@angular/core';

// Definición de la estructura de los objetos letras con tiempo
export interface LetrasTeiempo {
  
  id: number;
  caracter: string;
  tiempoEnPresionar: number;
  
}

@Injectable({
  providedIn: 'root'
})

export class LetrasTiempoService {

  // Array de letras y tiempo al dar clic
  registroclics: LetrasTeiempo[] = [];

  // Array de letras y tiempo sin dar clic
  registroletras: LetrasTeiempo[] = []; //array

  constructor() { }

  // Método para agregar una nueva letra con id caracter y tiempo al array
  agregarRegistro(nuevaoRegistro: LetrasTeiempo): void {
    this.registroclics.push(nuevaoRegistro);
  }

   // Método para agregar una nueva letra con id caracter y tiempo al array sin dar clic
   agregarsindarclic(nuevaoRegistro: LetrasTeiempo): void {
    this.registroletras.push(nuevaoRegistro);
  }

  actualizarTiempoEnPresionar(idBuscado: number, nuevoTiempo: number) {
    // Buscar el elemento con el ID buscado
    const elemento = this.registroletras.find(dato => dato.id === idBuscado);

    // Si se encontró el elemento, actualizar su tiempoEnPresionar
    if (elemento) {
        elemento.tiempoEnPresionar = nuevoTiempo;
        //console.log(`Se actualizó el tiempoEnPresionar para el elemento con ID ${idBuscado}.`);
    } else {
        //console.log(`No se encontró ningún elemento con el ID ${idBuscado}.`);
    }
}
  
}
