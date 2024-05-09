import { Component, EventEmitter, Output } from '@angular/core';




@Component({
  selector: 'app-finicial',
  templateUrl: './finicial.component.html',
  styleUrl: './finicial.component.css'
})
export class FinicialComponent {

  @Output() sendFalseEvent = new EventEmitter<boolean>(); ////--- sendFalseEvent es una variable creada para enviar valor "emit" se encuentra dentro de la funcion sendFalseToParent

  


  ngOnInit(): void{

  }


  //exitoso(dato: boolean){
   // this.exitosos.emit(dato);
  //}

  //get errorvalidacion(){

  //return this.formuregistro.get('nombre')?.invalid && this.formuregistro.get('nombre')?.touched;
 
    //return this.formuregistro.get('nombre')?.errors;
    
    // return this.formuregistro.get('nombre')?.hasError('minlength');
      
  //return this.formuregistro.get('nombre').errors['maxlength'];


  //}



}
