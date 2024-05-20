import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiLoginService, FormuloginI, ResponseI } from '../../api-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errorstatus:boolean = false;
  errormensaje:string = '';

  constructor(public formbuilder:FormBuilder, private apiloginservice:ApiLoginService, private router:Router){

  }

  formuloguin = this.formbuilder.group({

    
    correoelectronico: ['',[Validators.required,Validators.email,Validators.maxLength(55)]],
    contrasena: ['',[Validators.required,Validators.maxLength(25),Validators.minLength(3)]]

  })

  ngOnInit(){
    this.revisartokenenbase();
  }

  revisartokenenbase(){
    if(localStorage.getItem("token")){
      this.router.navigate(['dashboard']);
    }
  }

  enviar():void{
    this.errorstatus = false; // se usa para al dar clic el mensaje de error se muestre nuevamente
    //console.log(this.formuloguin);
    if (this.formuloguin.valid) {

      const datosFormulario:FormuloginI = {

        usuario: this.formuloguin.value.correoelectronico ?? '',
        password: this.formuloguin.value.contrasena ?? '',

      }

      //console.log(datosFormulario);
      this.apiloginservice.pacientes(datosFormulario).subscribe(data =>{
        let dataResponse:ResponseI = data;
        if(dataResponse.status == "ok"){
          localStorage.setItem("token",dataResponse.result.token);
          this.router.navigate(['dashboard']);
        }else{
          this.errorstatus = true;
          this.errormensaje = dataResponse.result.error_msg;
        }
        //console.log(data);
      })
      

    }
  }

}
