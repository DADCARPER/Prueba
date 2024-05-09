import { Component } from '@angular/core';
import { FinicialService } from '../../componentes/finicial.service';
import { FormBuilder, NgModel, Validators } from '@angular/forms';
import { ApiService, FormupacientesI } from '../../api.service';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent {

  muestraformulario = false;
  fechaActual: Date = new Date();

  constructor( public finicial : FinicialService, public formbuilder: FormBuilder, private apiservice:ApiService, private router:Router ){
 
  }

  formuregistro = this.formbuilder.group({

    nombre: ['',[Validators.required,Validators.maxLength(25),Validators.minLength(3)]],
    apellidos: ['',[Validators.required,Validators.maxLength(30),Validators.minLength(2)]],
    identificacion: ['',[Validators.required,Validators.maxLength(30),Validators.minLength(4)]],
    fnacimiento: ['',[Validators.required,Validators.maxLength(12),Validators.minLength(4)]],
    escolaridad: ['',[Validators.required,Validators.maxLength(1),Validators.minLength(1)]],
    lateralidad: ['',[Validators.required,Validators.maxLength(1),Validators.minLength(1)]],
    accidentes: ['0',[Validators.required,Validators.maxLength(2),Validators.minLength(1)]],
    antecedentes: ['',[Validators.maxLength(5000)]],
    gravedad: [0,[Validators.maxLength(1),Validators.minLength(1)]],
    correoelectronico: ['',[Validators.required,Validators.email,Validators.maxLength(35),Validators.minLength(8)]],
    token: ['',[Validators.required,Validators.maxLength(25),Validators.minLength(3)]]

  })

  ngOnInit():void{  

    this.revisartokenenbase();
    
    //console.log(this.formuregistro.value);
  }
  
  enviar(){
  
    const form: FormupacientesI = {

      dni: this.formuregistro.value.identificacion ?? "",
      nombre: this.formuregistro.value.nombre ?? "",
      apellidos: this.formuregistro.value.apellidos ?? "",
      direccion: "",
      fechanacimiento: this.formuregistro.value.fnacimiento ?? "", // Valor predeterminado para fnacimiento
      correo: this.formuregistro.value.correoelectronico ?? "", // Valor predeterminado para correoelectronico
      escolaridad: this.formuregistro.value.escolaridad ?? "", // Valor predeterminado para escolaridad
      lateralidad: this.formuregistro.value.lateralidad ?? "", // Valor predeterminado para lateralidad
      numaccidentes: this.formuregistro.value.accidentes ?? "", // Valor predeterminado para accidentes
      gravedad: this.formuregistro.value.gravedad ?? "", // Valor predeterminado para gravedad
      antecedentes: this.formuregistro.value.antecedentes ?? "", // Valor predeterminado para antecedentes
      idusuarioadminmodifica: "2",
      token: this.formuregistro.value.token ?? ""
    };

    console.log(this.formuregistro.valid);
    //if (this.formuregistro.valid) {
      
      //console.warn(this.formuregistro.value.nombre);
      //   const formData = this.formuregistro.value;
      //console.log(form);
  

      console.log(this.formuregistro.value);
      this.apiservice.agregarpacientes(form).subscribe(data =>{
        console.log(data);
        this.router.navigate(['dashboard']);
      })
  
      

    // } else {
    //   console.error("Debe completar los campos solicitados");
    //   this.muestraformulario = true;
    // }
        

  }

  
  //-------------------

  // se utilizo para verificar si se guarda informacion en el formulario
  // debo porner  <button (click)="actualizarCnombre()">muestrame lo guardado</button> ///
  // para utilizar esta funcion debo poner el boton en thml
  actualizarCnombre(){
    //console.log(this.nombre);
    //this.nombre.setValue("DAD");
    console.log(this.finicial.registrousuarios);
  }

  revisartokenenbase(){
    if(!localStorage.getItem("token")){
      this.router.navigate(['login']);
    }else{
      let token = localStorage.getItem('token');
      this.formuregistro.patchValue({ "token" : token })
    }
  }

}
