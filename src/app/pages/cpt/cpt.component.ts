import { Component, ViewChild, ElementRef } from '@angular/core';
import { LetrasTiempoService, LetrasTeiempo } from '../../letras-tiempo.service';
import { CtpResultadosService, resultadosctpI } from '../../ctp-resultados.service';
import { ApiService } from '../../api.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-cpt',
  templateUrl: './cpt.component.html',
  styleUrl: './cpt.component.css'
})
export class CptComponent {


  
  @ViewChild('audioPlayer') audioPlayerRef: ElementRef<HTMLAudioElement>;

  bloque1: string [];

  cuentatexto = 0;
  muestrab1: number = 1000; //1000
  muestrab2: number = 4000; //4000
  muestrab3: number = 800; //500
  muestrab4: number = 1000; //1000
  muestrab5: number = 4000; //4000
  muestrab6: number = 800; //500
  idprimera: number = 0;
  milisegAclic: number = 0;
  daclic: number = 0;
  mostrartitulo: boolean = true;
  mostrarBoton: boolean = false;
  mostrardivletras: boolean = false;
  mostrar: boolean = false; // Variable para controlar si se muestra el texto o no
  textoAMostrar: string = ''; // Variable para almacenar el texto que se mostrará
  textosamostrar = ["¡VAMOS A INICIAR!","3.","2.","1."];
  diferencialista: number = 0;
  muestraformulario = true;
  muestraprograma = true;
  tiempobloque1: number = 89000; //222500
  tiempobloque2: number = 356000;
  tiempobloque3: number = 71200;
  tiempobloque4: number = 89000;
  tiempobloque5: number = 356000;
  tiempobloque6: number = 71200;
  mfase1: boolean = true;
  mfase2: boolean = false;
  mfase3: boolean = false;
  mfase4: boolean = false;
  mfase5: boolean = false;
  mfase6: boolean = false;

  //variables para informe final

  letraXdioClic: number = 0;
  totalletrasdioClic: number = 0;
  veromision: string ='';

  verComision:any;
  verComisionporcen:any;

  verperseveracion:any;
  verperseveracionporcen:any;

  verOmision:any;
  verOmisionPorcen:any;

  verMLprome:any;


  muestrainforme: boolean = false;
  tiraletras={}; //objeto

  
  pasar: number = 1;
  tiempoinicio:any;

  tiempoInicioAnterior: number | null = null;
  caracterAnterior: string | null = null;

  idpaciente:any;
  cadena:any;

  constructor(public letrasTiempoService: LetrasTiempoService, private ctpResultadosService: CtpResultadosService, private apiservice: ApiService, private route: ActivatedRoute){
    
    this.bloque1 = ["A","X","Y","R","K","T","Y","D","Z","O","X","Y","Q","S","A","K","X","G","F","X","K","Y","U","O","I","Z","B","C","X","H","A","X","Y","R","K","T","Y","D","L","E","X","Y","W","M","W","M","X","G","F","X","K","Y","U","O","W","Z","B","C","X","H","A","X","Y","R","K","T","Y","D","W","M","X","Y","Q","S","A","K","X","G","F","X","K","Y","U","O","N","Z","B","C","X","H"];
    this.audioPlayerRef = {} as ElementRef<HTMLAudioElement>;
    this.tiempoinicio = this.gnNumAle(); // numero aleatorio
  }


  ngOnInit():void{

    this.route.queryParams.subscribe(params => {
      // Verificar si el parámetro 'dni' está presente en la URL
      if ('dni' in params) {
        this.cadena = params['dni'];
        
        if (!/^\d{2,12}$/.test(this.cadena)) {
          console.error('La URL no es valida no tiene entre 2 y 12 caracteres.');
          // Puedes manejar la situación de que no sea un número válido o tenga una longitud incorrecta aquí, por ejemplo, establecer un valor predeterminado o mostrar un mensaje de error al usuario.
        } else {
          // Aquí puedes agregar la lógica adicional para manejar el parámetro "dni" si es válido.
          //console.log(this.cadena);
          // consulto en DB y tomo idpaciente
          this.apiservice.llamopacientesdni(this.cadena).subscribe(data=>{
            //console.log(data);
            this.idpaciente= data;
            if (this.idpaciente != ""){
              console.log(this.idpaciente[0].pacienteid);
              this.mostrarBoton =true;
            }else{
              console.error('No se encontro paciente registrado.');
            }
            
          })
        }
      } else {
        // Redirigir o mostrar un mensaje de error si el parámetro 'dni' no está presente
        console.error('Parámetro "dni" no encontrado en la URL');
        // Por ejemplo, podrías redirigir a una página de error o establecer un valor predeterminado para 'dni'
      }

      // Verificar si hay otros parámetros en la URL y manejarlos en consecuencia
      const otrosParametros = Object.keys(params).filter(param => param !== 'dni');
      if (otrosParametros.length > 0) {
        console.warn('Otros parámetros presentes en la URL:', otrosParametros);
        // Aquí puedes agregar la lógica para manejar otros parámetros si es necesario
      }
    });
    
    this.mostrarBoton =true;

  }

  

  

  gnNumAle(){
    
    let obtengonumero = Math.floor(Math.random() * 89); // numero aleatorio
    let generoCaracter = this.bloque1[obtengonumero];
    //console.log(typeof generoCaracter);
    console.log(generoCaracter+" <- entro PRIMER random -> "+this.caracterAnterior);

    if ( obtengonumero === this.tiempoInicioAnterior || this.caracterAnterior === generoCaracter ){
      obtengonumero = Math.floor(Math.random() * 89); // numero aleatorio
      generoCaracter = this.bloque1[obtengonumero];
      console.log(generoCaracter+" <- entro SEGUNDO random -> "+this.caracterAnterior);

        if(obtengonumero === this.tiempoInicioAnterior || this.caracterAnterior === generoCaracter){
          obtengonumero = Math.floor(Math.random() * 89); // numero aleatorio
          generoCaracter = this.bloque1[obtengonumero];
          console.log(generoCaracter+" <- entro TERCER random -> "+this.caracterAnterior);

            if(obtengonumero === this.tiempoInicioAnterior || this.caracterAnterior === generoCaracter){
              obtengonumero = Math.floor(Math.random() * 89); // numero aleatorio
              generoCaracter = this.bloque1[obtengonumero];
              console.log(generoCaracter+" <- entro CUARTO random -> "+this.caracterAnterior);

                if(obtengonumero === this.tiempoInicioAnterior || this.caracterAnterior === generoCaracter){
                  obtengonumero = Math.floor(Math.random() * 89); // numero aleatorio
                  generoCaracter = this.bloque1[obtengonumero];
                  console.log(generoCaracter+" <- entro QUINTO random -> "+this.caracterAnterior);

                    if(obtengonumero === this.tiempoInicioAnterior || this.caracterAnterior === generoCaracter){
                      obtengonumero = Math.floor(Math.random() * 89); // numero aleatorio
                      generoCaracter = this.bloque1[obtengonumero];
                      console.log(generoCaracter+" <- entro SEXTO random -> "+this.caracterAnterior);

                        if(obtengonumero === this.tiempoInicioAnterior || this.caracterAnterior === generoCaracter){
                          obtengonumero = Math.floor(Math.random() * 89); // numero aleatorio
                          generoCaracter = this.bloque1[obtengonumero];
                          console.log(generoCaracter+" <- entro SECTIMO random -> "+this.caracterAnterior);
                        }
                    }
                }
            }
        }
      
      this.tiempoInicioAnterior = obtengonumero;
      this.caracterAnterior = generoCaracter;

    }else{
      this.tiempoInicioAnterior = obtengonumero;
      this.caracterAnterior = generoCaracter;
    }

    return obtengonumero;
  }


  calulartiempo(tiempo:number,tiempobloque:number):void{

    
    this.mostrardivletras = true;
    this.idprimera++;
    this.tiempoinicio = this.gnNumAle();
    //console.log(this.idprimera);
    this.milisegAclic = Date.now();
    // Mostrar la primera letra
    //console.log(this.tiempoinicio = Math.floor(Math.random() * 89));

    ///registro id y letra que salio////
    const pidodatos = {
      id: this.idprimera,
      caracter: this.bloque1[this.tiempoinicio],
      tiempoEnPresionar: this.daclic
    };

    this.letrasTiempoService.agregarsindarclic(pidodatos);
    //--------------------------------------
   
    let timerId = setInterval(() => { // Al terminar el bucle me llama la funcion clear
      this.milisegAclic = Date.now();
      this.idprimera++;
      //console.log(this.idprimera);
      //console.log(` --- el tiempo en milisegundo ${this.milisegAclic}`);
      this.tiempoinicio = this.gnNumAle();

      ///registro id y letra que salio////
      const pidodatos = {
        id: this.idprimera,
        caracter: this.bloque1[this.tiempoinicio],
        tiempoEnPresionar: this.daclic
      };

      this.letrasTiempoService.agregarsindarclic(pidodatos);
      //--------------------------------------
      
    }, tiempo); //se muestan las demas cada 2.5 segun
    

    setTimeout(() => { 
      
      clearInterval(timerId); 
      this.pasar++;
      //console.log(this.pasar);
      //this.muestratodos();
      //this.mostrardivletras=false;// esta linea se borra
      setTimeout(() => {
        this.todaslasfases(this.pasar) // esta liene da paso a los otros bloques
        //this.todaslasfases(7); // esata linea se habilita solo para que se muestre 1 solo bloque y pase al final
      }, tiempo); // 4000 milisegundos = 4 segundos
    }, tiempobloque); // pausa el proceso repetitivo de la variable timerId*/
      
    

  }

  tomosegundoymilisegundo(){

    //Da clic = 1;
    this.daclic = 1;
     
    //Dio clic tomo el tiempo
    let tiempoActual = Date.now();
    
    let caracter = this.bloque1[this.tiempoinicio];

    if (caracter == "X"){ 
      
      this.letraXdioClic++;
    
    }else{
      this.totalletrasdioClic++;
    }
    
    //let minutos = ahora.getMinutes();
    //let milisegundos = ahora.getMilliseconds();
    //let segundos = ahora.getSeconds();
    //console.log ( this.milisegundosAhoy +" - >"+ milisegAclic);
    //console.log( JSON.stringify ( segundos ) +"---"+ JSON.stringify ( milisegundos )+ "--"+caracter );

    let diferenciaEnMilisegundos: number = tiempoActual - this.milisegAclic;

    this.diferencialista = diferenciaEnMilisegundos;

    // Calcula las unidades de tiempo
    const milisegundos: number = diferenciaEnMilisegundos % 1000;
    const segundos: number = Math.floor(diferenciaEnMilisegundos / 1000) % 60;
    const minutos: number = Math.floor(diferenciaEnMilisegundos / (1000 * 60)) % 60;
    const horas: number = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60)) % 24;
    const dias: number = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

    // Formatea la diferencia como una cadena de texto
    //const diferenciaEnTexto: string = `${dias} días, ${horas} horas, ${minutos} minutos, ${segundos} segundos, ${milisegundos} milisegundos`;

    //console.log( diferenciaEnTexto );
    //console.log( "LetraID "+this.idprimera+ " caracter "+ caracter +" - > " +diferenciaEnMilisegundos );

    //pidodatosss = this.pidodatos(this.idprimera,caracter,diferenciaEnMilisegundos);

    const pidodatos = {
      id: this.idprimera,
      caracter: this.bloque1[this.tiempoinicio],
      tiempoEnPresionar: this.diferencialista
    };

    this.letrasTiempoService.agregarRegistro(pidodatos);
    //console.log(typeof pidodatos);

    this.letrasTiempoService.actualizarTiempoEnPresionar(this.idprimera,this.daclic)

    //Da clic reseteo;
    this.daclic = 0;

    //hago el sonido
    const audioPlayer: HTMLAudioElement = this.audioPlayerRef.nativeElement;
    audioPlayer.play();
  }

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

      //console.log(this.cuentatexto);

    }, 1500 );
    
    setTimeout(() => { 
      
      clearInterval(timerId); 
      this.iniciartest();
    }, 6000); // pausa el proceso repetitivo de la variable timerId*/

  }

  /// DAR CLIC CORREN LAS LETRAS
  iniciartest(): void{

    //this.mfase1 = true;
    document.body.style.backgroundColor = '#17141e'; // cambio el color del BODY
    this.calulartiempo(this.muestrab1,this.tiempobloque1);// de aqui inicia a correr las letras
    
  }

  todaslasfases(otra:number){
    //console.warn(otra);
    if (otra == 2){
      this.mfase1 = false;
      this.mfase2 = true;
      this.calulartiempo(this.muestrab2,this.tiempobloque2);// de aqui inicia a correr FASE 2
    }
    if (otra == 3 ){
      this.mfase2 = false;
      this.mfase3 = true;
      this.calulartiempo(this.muestrab3,this.tiempobloque3);// de aqui inicia a correr FASE 3
    }
    if (otra == 4 ){
      this.mfase3 = false;
      this.mfase4 = true;
      this.calulartiempo(this.muestrab4,this.tiempobloque4);// de aqui inicia a correr FASE 4
    }
    if (otra == 5 ){
      this.mfase4 = false;
      this.mfase5 = true;
      this.calulartiempo(this.muestrab5,this.tiempobloque5);// de aqui inicia a correr FASE 5
    }
    if (otra == 6 ){
      this.mfase5 = false;
      this.mfase6 = true;
      this.calulartiempo(this.muestrab6,this.tiempobloque6);// de aqui inicia a correr FASE 4
      //console.log(this.pasar);
    }
    if (otra == 7 ){
      this.mostrardivletras=false;
      this.mfase6 = false;
      this.muestrainforme = true;
      this.muestratodos();
    }

  }

//-----------------------------------------------------------------------------------------------
  
  muestratodos(){
     
    this.tiraletras = this.letrasTiempoService.registroletras;
    //console.log(this.tiraletras);
    //console.log(this.letrasTiempoService.registroclics);
    let totalX = this.contarLetraX(this.letrasTiempoService.registroletras);
    //console.log(totalX);
    //Calculo la omision que es el total de letras mostradas menos el total de veces que dio clic en X
    //console.log("cuantas X oprimio" +this.letraXdioClic);
    //this.veromision= "De un total de "+totalX+" letras X -> se oprimio: "+this.letraXdioClic;

    
    let totalletrasmostradas = this.letrasTiempoService.registroletras.length;
    //console.log('total letras salieron'+totalletrasmostradas);
    let totalletrasrestadaX = totalletrasmostradas - totalX;
    //console.log('total letras restando las X'+ totalletrasrestadaX);
    let [sidioclic, nodioclic, noclicenX, siclicenX] = this.contarlopresionado(this.letrasTiempoService.registroletras);
    //this.verComision = "De un total de = "+totalletrasrestadaX+" Letras correctas. Se oprimio ="+(sidioclic-this.letraXdioClic);
    //console.log('si dio clic?'+sidioclic);
    //console.log('NO dio clic?'+nodioclic);

    // genero la Omisión
    if(nodioclic > totalletrasrestadaX){
    this.verOmision = nodioclic;
    this.verOmisionPorcen = 0;
    }else{
    this.verOmision = nodioclic;
    this.verOmisionPorcen = ( this.verOmision / totalletrasmostradas) * 100;
    }

    // genero la Comisión
    //this.verComision = sidioclic-this.letraXdioClic;
    this.verComision = siclicenX;
    this.verComisionporcen = ( this.verComision / totalletrasrestadaX) * 100;
   

    // genero el promedio en ml
    //console.log(this.letrasTiempoService.registroclics);
    let totalmiliseg = this.sumarMilipresionado(this.letrasTiempoService.registroclics);
    this.verMLprome = totalmiliseg.toFixed(2);

    // cuento los clic repetidos
    let totalclicrepetido = this.contarlosclicrepetidos(this.letrasTiempoService.registroclics);
    this.verperseveracion = totalclicrepetido;
    this.verperseveracionporcen = ( this.verperseveracion / totalletrasrestadaX) * 100;

    /// AQUI LLAMO GUARDAR TABLA
    const form: resultadosctpI = {

      omision: this.verOmision,
      porceomision: this.verOmisionPorcen,
      comision: this.verComision,
      porcecomision: this.verComisionporcen,
      tiemporespuesta: this.verMLprome,
      perseveracion: this.verperseveracion,
      porceperseveracion: this.verperseveracionporcen,
      idpaciente: this.idpaciente[0].pacienteid,
      token: "c890eaf03d0b47cc7b64df1647630c16"

    }
    
    this.ctpResultadosService.agreagarresultados(form).subscribe(data =>{
      console.log(data);
    })
  }

  // Función para contar las ocurrencias de la letra 'A'
  contarLetraX(datos: { caracter: string }[]) {
    let contador = 0;
    for (const dato of datos) {
      if (dato.caracter === 'X') {
        contador++;
      }
    }
    return contador;
  }

  contarlopresionado(datos: { caracter: string, tiempoEnPresionar: number }[]){
    let sidioclic = 0; // si dio clic
    let noclicenX = 0; // SE CUENTA SI SALIO X Y NO SE DIO CLIC .
    let siclicenX = 0; // SE CUENTA SI SALIO X Y NO SE DIO CLIC .
    let nodioclic = 0; // no dio clic
    for (const dato of datos) {

      if (dato.tiempoEnPresionar === 1 && dato.caracter === "X") {
        siclicenX++;
      }else if (dato.tiempoEnPresionar === 1){
        sidioclic++;
      }else if(dato.tiempoEnPresionar === 0 && dato.caracter === "X" ){
        noclicenX++;
      }else{
        nodioclic++;
      }

    }
    return [sidioclic, nodioclic, noclicenX, siclicenX];
  }

  sumarMilipresionado(datos: { tiempoEnPresionar: number }[]){
    let milisegundo = 0; 
    let cuentoregistro = 0;
    let promedio = 0;

    for (const dato of datos) {
      if (dato.tiempoEnPresionar > 0) {
        milisegundo = milisegundo + dato.tiempoEnPresionar;
        cuentoregistro++;
      }
    }

    return promedio = milisegundo / cuentoregistro;
  }

  contarlosclicrepetidos(datos: { id: number }[]){
    let dconteoIds: { [id: number]: number } = {}; // Objeto para almacenar el conteo de cada id
    let totalclicdobles: number = 0;
    for (const dato of datos) {
        // Verificar si el id ya existe en el objeto dconteoIds
        if (dato.id in dconteoIds) {
            // Si existe, incrementar el conteo para ese id
            dconteoIds[dato.id]++;
        } else {
            // Si no existe, inicializar el conteo para ese id en 1
            dconteoIds[dato.id] = 1;
        }
    }

    // Mostrar los resultados
    for (const id in dconteoIds) {
        //console.log(`El id ${id} se repite ${dconteoIds[id]} veces.`);
        if(dconteoIds[id]>1){
          totalclicdobles++;
        }
    }

    return totalclicdobles;
  }
  

    
  muestraFormulariocuandoRegistro(value: boolean){
    this.muestraformulario = value;
    this.muestraprograma = true;
    //console.log("cambio a false y paso por js componente principal"+this.muestraformulario);
  }
  //function clearMessage() {
  //   clearTimeout(this.mirame);
  //}//


}
