import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salir',
  templateUrl: './salir.component.html',
  styleUrl: './salir.component.css'
})
export class SalirComponent {

  constructor(public router: Router){}

  ngOnInit(){
    
    localStorage.removeItem("token");

    this.router.navigate(['login']);

  }



  

}
