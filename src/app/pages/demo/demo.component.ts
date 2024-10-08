import { Component } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent {

muestraprograma = true;
mostrartitulo: boolean = true;
mostrarBoton: boolean = true;
mostrar: boolean = false; // Variable para controlar si se muestra el texto o no
textoAMostrar: string = ''; // Variable para almacenar el texto que se mostrará
textosamostrar = ["Recuerda presionar el mando o la barra espaciadora","¡VAMOS A INICIAR!","3.","2.","1."];
cuentatexto = 0;
mfase1: boolean = true;


  /// DAR CLIC PARA INICIAR LETRAS
  mostrarTexto(): void {

    this.mfase1 = false
    this.mostrartitulo = false;
    

    let x = 1;
    this.mostrar = true; // Muestra el texto
    this.mostrarBoton = false;
    //this.cuentatexto++;
    let timerId = setInterval(() => { // Al terminar el bucle me llama la funcion clear
      

      this.cuentatexto = x;
      x++;

      console.log(this.cuentatexto);

    }, 2000 );
    
    setTimeout(() => { 
      
      clearInterval(timerId); 
      this.iniciartest();
    }, 10000); // pausa el proceso repetitivo de la variable timerId*/

  }

  /// DAR CLIC CORREN LAS LETRAS
  iniciartest(): void{

    //this.mfase1 = true;
    document.body.style.backgroundColor = '#17141e'; // cambio el color del BODY
    //this.calulartiempo(this.muestrab1,this.tiempobloque1);// de aqui inicia a correr las letras
    
  }

  nombreBoton: string = "Guía"
  mostrarBotonDemo: number = 0;
  texts: string[] = ["","Recuerda presionar el mando o la barra espaciadora","Cuando en palla veas la letra X, NO debes presionar","Si ves otra letra diferente debes presionar lo más pronto","Si aun no es claro puedes presionar el botón Demo."];
  currentText: string = this.texts[0];
  animationClass: string = 'fade-in';
  private currentIndex: number = 0;
  private isAnimating: boolean = false;
  mostrarvideo = 0;

  showNextText(): void {
    if (this.isAnimating) return; // Previene múltiples clics durante la animación

   

    this.isAnimating = true;
    // Primero, inicia la animación de salida
    this.animationClass = 'fade-out';

    // Después de la duración de la animación de salida, cambia el texto y aplica la animación de entrada
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.texts.length;
      this.currentText = this.texts[this.currentIndex];
      this.animationClass = 'fade-in';
      this.mostrartitulo = false;
      this.mostrarvideo++;
      this.mostrarBotonDemo++;
      this.nombreBoton = "Siguiente"

      // Espera a que termine la animación de entrada antes de permitir otro clic
      setTimeout(() => {
        
        this.isAnimating = false;
      }, 900); // Duración de la animación de entrada
    }, 900); // Duración de la animación de salida
  }

}
