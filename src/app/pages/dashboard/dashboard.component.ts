import { Component, ElementRef, ViewChild, Output } from '@angular/core';

import { ApiService, ListapacientesI } from '../../api.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, NgModel, Validators, FormControl } from '@angular/forms';

import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { CtpResultadosService } from '../../ctp-resultados.service';
import { ResultadosService, resultadostotalI } from '../../resultados.service';
import { Router } from '@angular/router';
import { PdfService } from '../../pdf.service';
import { UIChart } from 'primeng/chart';
import { jsPDF } from 'jspdf';
import  autoTable  from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { HttpClient, HttpHeaders } from '@angular/common/http';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  fechaActual: Date = new Date();

  btncreainforme:any;
  cerrarmoda3:any;
  cerrarmoda4:any;

  pacientes:any;
  unpaciente:any;
  modalContent:any;
  pacienteSeleccionado: any;
  id:any;
  codigofinal:any;
  resultados:any;

  //graficas radar
  data: any;
  options: any;
  captureElement: any;
  imgData:any;

  //graficas radar vista previa
  dataR2: any;
  optionsR2: any;
  captureElementR2: any;
  imgDataR2:any;

  //grafica dona 1
  data1: any;
  options1: any;
  capturedona1: any;
  imgData1:any;
  numcentro1:any = "";

  //grafica dona 2
  data2: any;
  options2: any;
  capturedona2: any;
  imgData2:any;
  numcentro2:any = "";

  //grafica dona 3
  data3: any;
  options3: any;
  capturedona3: any;
  imgData3:any;
  numcentro3:any = "";

  //grafica dona 4
  data4: any;
  options4: any;
  capturedona4: any;
  imgData4:any;
  numcentro4:any = "";

  //grafica dona 5
  data5: any;
  options5: any;
  capturedona5: any;
  imgData5:any;
  numcentro5:any = "";

  //grafica dona 6
  data6: any;
  options6: any;
  capturedona6: any;
  imgData6:any;
  numcentro6:any = "";

  //grafica dona 7
  data7: any;
  options7: any;
  capturedona7: any;
  imgData7:any;
  numcentro7:any = "";

  //grafica dona 8
  data8: any;
  options8: any;
  capturedona8: any;
  imgData8:any;
  numcentro8:any = "";

  //resultados del ultimo resultado cargado estado = 0
  ultimoElemento:any;
  totalResultadoBaremo:any;
  guardoresultadostotal:any;
  tomodatosdescarga:any;

  //loading
  isLoading = false;

  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;


  //////////////////////////////////////////////////

// Column Definitions: Defines the columns to be displayed.

colDefs: ColDef[] =  [
  { headerName: "#", valueGetter: "node.rowIndex + 1", minWidth: 40, maxWidth: 50  },
  { headerName: "Documento", field: "dni", filter: true, floatingFilter: true, suppressHeaderMenuButton: true, suppressFloatingFilterButton:  true,width: 120, minWidth: 80, maxWidth: 140 },
  { field: "nombre", filter: true, floatingFilter: true, suppressHeaderMenuButton: true, suppressFloatingFilterButton:  true,width: 140, minWidth: 100, maxWidth: 250  },
  { field: "apellidos", filter: true, floatingFilter: true, suppressHeaderMenuButton: true, suppressFloatingFilterButton:  true,width: 140, minWidth: 100, maxWidth: 250},
  { field: "direccion",width: 200, minWidth: 100, maxWidth: 350  },
  { field: "ciudad",width: 120, minWidth: 120, maxWidth: 160 },
  { field: "edad",width: 90, minWidth: 80, maxWidth: 140 },
  { field: "telefono", filter: true, floatingFilter: true, suppressHeaderMenuButton: true, suppressFloatingFilterButton:  true,width: 125, minWidth: 125, maxWidth: 160 },
  { field: "correo", filter: true, floatingFilter: true, suppressHeaderMenuButton: true, suppressFloatingFilterButton:  true ,width: 200, minWidth: 100, maxWidth: 350 },
  { field: "escolaridad",valueFormatter: this.formatoEscolaridad, width: 120, minWidth: 120, maxWidth: 160 }
];

  ///////////////////////////////////////////////

  constructor(
    private apiservice:ApiService,
    private modalService: NgbModal,
    public formbuilder: FormBuilder,
    public ctpresultados: CtpResultadosService,
    public resultadostotal: ResultadosService,
    public router: Router, 
    private pdf: PdfService,
    private el: ElementRef,
    private http: HttpClient,
  ){

  }

  formueditar = this.formbuilder.group({

    nombre: ['',[Validators.required,Validators.maxLength(25),Validators.minLength(3)]],
    apellidos: ['',[Validators.required,Validators.maxLength(30),Validators.minLength(2)]],
    identificacion: ['',[Validators.required,Validators.maxLength(30),Validators.minLength(4)]],
    fnacimiento: ['',[Validators.required,Validators.maxLength(12),Validators.minLength(4)]],
    escolaridad: ['',[Validators.required,Validators.maxLength(1),Validators.minLength(1)]],
    lateralidad: ['',[Validators.required,Validators.maxLength(1),Validators.minLength(1)]],
    accidentes: ['0',[Validators.required,Validators.maxLength(2),Validators.minLength(1)]],
    antecedentes: ['',[Validators.maxLength(5000)]],
    gravedad: ['',[Validators.maxLength(1),Validators.minLength(1)]],
    correoelectronico: ['',[Validators.required,Validators.email,Validators.maxLength(35),Validators.minLength(8)]],
    token: ['',[Validators.required,Validators.maxLength(25),Validators.minLength(3)]],
    direccion: ['',[Validators.required,Validators.maxLength(80),Validators.minLength(2)]],
    ciudad: ['',[Validators.required,Validators.maxLength(30),Validators.minLength(3)]],
    telefono: ['',[Validators.required,Validators.maxLength(15),Validators.minLength(5)]],
    genero: ['',[Validators.required,Validators.maxLength(2),Validators.minLength(1)]],
    edad: ['',[Validators.required,Validators.maxLength(2),Validators.minLength(1)]]

  })

  forgafica1:any = this.formbuilder.group({
    atsostenida: ['0',[Validators.required,Validators.maxLength(2),Validators.minLength(1)]],
    atalternante: ['0',[Validators.required,Validators.maxLength(2),Validators.minLength(1)]],
    trespuesta: ['0',[Validators.required,Validators.maxLength(2),Validators.minLength(1)]],
    ctrinhibitorio: ['0',[Validators.required,Validators.maxLength(2),Validators.minLength(1)]],
    atsostenida2: ['0',[Validators.required,Validators.maxLength(2),Validators.minLength(1)]],
    atalternante2: ['0',[Validators.required,Validators.maxLength(2),Validators.minLength(1)]],
    trespuesta2: ['0',[Validators.required,Validators.maxLength(2),Validators.minLength(1)]],
    ctrinhibitorio2: ['0',[Validators.required,Validators.maxLength(2),Validators.minLength(1)]] 
  })

  forgafica2:any = this.formbuilder.group({

    Valor1: ['0',[Validators.required,Validators.maxLength(2),Validators.minLength(1)]],
    Valor2: ['0',[Validators.required,Validators.maxLength(2),Validators.minLength(1)]],
    Valor3: ['0',[Validators.required,Validators.maxLength(2),Validators.minLength(1)]],
    Valor4: ['0',[Validators.required,Validators.maxLength(2),Validators.minLength(1)]],
    Valor5: ['0',[Validators.required,Validators.maxLength(2),Validators.minLength(1)]],
    Valor6: ['0',[Validators.required,Validators.maxLength(2),Validators.minLength(1)]],
    Valor7: ['0',[Validators.required,Validators.maxLength(2),Validators.minLength(1)]],
    Valor8: ['0',[Validators.required,Validators.maxLength(2),Validators.minLength(1)]] 

  })

  forgafica3:any = this.formbuilder.group({

    conclusiones: ['',[Validators.maxLength(5000)]],

  })

  ngOnInit():void{

    this.revisartokenenbase();
    
    this.cargarpaicentes();
    let token = localStorage.getItem('token');
    this.formueditar.patchValue({ "token" : token });
    //this.graficaRadar1();
    //this.consultoresultadostotal();
    //this.cptTotal(5,22,545.2,5);
  
  }

  

  cargarpaicentes(){
    this.apiservice.llamopacientespagina(1).subscribe(data=>{
      //console.log(data);
      this.pacientes= data;
    
  })
  }

  activomodal(content:any,event:any){

    this.id = event.data.pacienteid;
    //console.log(id);
    this.apiservice.llamopacientesid(this.id).subscribe((data:any)=>{
      //console.log(data);
      this.unpaciente= data[0];
      this.formueditar.patchValue({
        'nombre': this.unpaciente.nombre,
        'apellidos': this.unpaciente.apellidos,
        'identificacion': this.unpaciente.dni,
        'escolaridad': this.unpaciente.escolaridad,
        'fnacimiento': this.unpaciente.fechanacimiento,
        'lateralidad': this.unpaciente.lateralidad,
        'accidentes': this.unpaciente.numaccidentes,
        'antecedentes': this.unpaciente.antecedentes,
        'gravedad': this.unpaciente.gravedad,
        'correoelectronico': this.unpaciente.correo,
        'direccion': this.unpaciente.direccion,
        'ciudad': this.unpaciente.ciudad,
        'telefono': this.unpaciente.telefono,
        'genero': this.unpaciente.genero,
        'edad': this.unpaciente.edad
      })



      //function to open modal
      this.modalService.open(content,{ size: 'xl' });
    
    })
    

  }

  activomodal2(content:any){
  
    let urlbase = "https://test-ctp.prevencionvialintegral.com/ctp?dni=";
    this.modalService.open(content,{ size: 'xl', centered: true });
    this.codigofinal = urlbase + this.unpaciente.dni;

  }

  activomodal3(content:any){
    const modalRef: NgbModalRef = this.modalService.open(content,{ size: 'xl', centered: true });
    this.cerrarmoda3 = modalRef;
    this.btncreainforme = true;
    this.ctpresultados.verresultado(this.id).subscribe(data1=>{
      //console.log(this.id);
      this.resultados= data1;
      //console.log(typeof this.resultados);
      ///////////////////// FRACMETO TOMA EL ULTIMO REGISTRO DE TODOS LOS RESULTADOS QUE TENGAN ESTADO 0 Y BAJO ESTE ULTIMO REGISTRO SE PASAN LOS DATOS A LA GRAFIA 
      //////////////////// QUE ESTA EN CREAR INFORME. 
        interface Resultado {
          ctpid: string;
          fecha: string;
          omision: string;
          porceomision: string;
          comision: string;
          porcecomision: string;
          tiemporespuesta: string;
          perseveracion: string;
          porceperseveracion: string;
          estado: string;
        }
        const resultadosFiltrados:Resultado[] = this.resultados.filter((resultado: Resultado) => resultado.estado === '0');
        // Verificar si hay resultados después de filtrar
        if (resultadosFiltrados.length > 0) {
          // Tomar el último elemento del array filtrado
          this.ultimoElemento = resultadosFiltrados[resultadosFiltrados.length - 1];
          //console.log(this.baremoMINER(this.ultimoElemento.omision,this.ultimoElemento.comision,this.ultimoElemento.tiemporespuesta,this.ultimoElemento.perseveracion));
          //console.log(this.btncreainforme ); // Muestra el último elemento en la consola
          this.btncreainforme = false;
        }
        //console.log(this.btncreainforme ); // Muestra el último elemento en la consola
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    })


  }

  activomodal4(content:any){

    const modalRef: NgbModalRef = this.modalService.open(content,{ size: 'xl', centered: true, scrollable: true });
    this.totalResultadoBaremo = this.cptTotal(this.ultimoElemento.omision,this.ultimoElemento.comision,this.ultimoElemento.tiemporespuesta,this.ultimoElemento.perseveracion)
    //console.log(this.totalResultadoBaremo[0]);
    this.cerrarmoda4 = modalRef;

    this.graficaRadar1(); // Llamo grafica Radar
    this.grafica1(); // LLamo grafica dona 1
    this.grafica2(); // LLamo grafica dona 2
    this.grafica3(); // LLamo grafica dona 3
    this.grafica4(); // LLamo grafica dona 4
    this.forgafica1.patchValue({
      'atsostenida': this.totalResultadoBaremo[0],
      'atalternante': this.totalResultadoBaremo[3],
      'trespuesta': this.totalResultadoBaremo[2],
      'ctrinhibitorio': this.totalResultadoBaremo[1],
      'atsostenida2': 50,
      'atalternante2': 40,
      'trespuesta2': 66,
      'ctrinhibitorio2': 33,
    });
    this.forgafica2.patchValue({
      'Valor1': this.totalResultadoBaremo[0],
      'Valor2': 100 - this.totalResultadoBaremo[0],
      'Valor3': this.totalResultadoBaremo[3],
      'Valor4': 100 - this.totalResultadoBaremo[3],
      'Valor5': this.totalResultadoBaremo[2],
      'Valor6': 100 - this.totalResultadoBaremo[2],
      'Valor7': this.totalResultadoBaremo[1],
      'Valor8': 100 - this.totalResultadoBaremo[1],
    });
    this.actualizarGraficoOnChange();
    this.actualizarGrafico1();
    this.actualizarGrafico2();
    this.actualizarGrafico3();
    this.actualizarGrafico4();
    
    //console.log(this.forgafica3.get('conclusiones').value); // tomo el valor de caja textarea

    
  }

  activomodal5(content:any,id:number){

    const modalRef: NgbModalRef = this.modalService.open(content,{ size: 'xl', centered: true, scrollable: true });

    this.consultoresultadostotal(id);
 
  
  }

  guardar(){

    const form1: ListapacientesI = {

      pacienteid: this.id.toString(),
      dni: this.formueditar.value.identificacion ?? "",
      nombre: this.formueditar.value.nombre ?? "",
      apellidos: this.formueditar.value.apellidos ?? "",
      direccion: this.formueditar.value.direccion ?? "",
      ciudad: this.formueditar.value.ciudad ?? "",
      telefono: this.formueditar.value.telefono ?? "",
      genero: this.formueditar.value.genero ?? "",
      fechanacimiento: this.formueditar.value.fnacimiento ?? "", // Valor predeterminado para fnacimiento
      correo: this.formueditar.value.correoelectronico ?? "", // Valor predeterminado para correoelectronico
      escolaridad: this.formueditar.value.escolaridad ?? "", // Valor predeterminado para escolaridad
      lateralidad: this.formueditar.value.lateralidad ?? "", // Valor predeterminado para lateralidad
      numaccidentes: this.formueditar.value.accidentes ?? "", // Valor predeterminado para accidentes
      gravedad: this.formueditar.value.gravedad ?? "", // Valor predeterminado para gravedad
      antecedentes: this.formueditar.value.antecedentes ?? "", // Valor predetermin
      fechamodificado: this.fechaActual.toISOString().slice(0, 10), // Formato "aaaa-mm-ddThh:mm" -> "aaaa-mm-dd hh:mm"
      idusuarioadminmodifica: "2",
      token: this.formueditar.value.token ?? "",
    };
    //console.log(form1);

    //console.log('guardar');

    this.apiservice.editarpaciente(form1).subscribe(data =>{
      //console.log(data);
      this.cargarpaicentes();
    })

    

  }

  formatoEscolaridad(params: any): string {
    const escolaridad = params.value;
    switch (escolaridad) {
      case "1":
        return "Primaria";
      case "2":
        return "Bachillerato";
      case "3":
        return "Técnico";
      case "4":
        return "Tecnólogo";
      case "5":
        return "Profesional";
      case "6":
        return "Especialización";
      default:
        return " - - - ";
    }
  }

  revisartokenenbase(){
    if(!localStorage.getItem("token")){
      this.router.navigate(['login']);
    }
  }

  consultoresultadostotal(event:any){

    //console.log('El valor de ctpid es:', event);

    this.resultadostotal.verresultado().subscribe(data3=>{
      //console.log(data3);
      this.guardoresultadostotal= data3;

      const resultadosFiltrados2:any[] = this.guardoresultadostotal.filter((resultado2:any) => resultado2.id_ctp_resultados === event);
        // Verificar si hay resultados después de filtrar
        if (resultadosFiltrados2.length > 0) {
          //console.log(resultadosFiltrados2);
          this.tomodatosdescarga = resultadosFiltrados2[0];
          //console.log(this.tomodatosdescarga.nombrecompleto);

          //// se llama generar informe el cual se pasan parametros this.tomadatosdescarga el que contiene los parametros de base datos tabla -> resultadostotal 
          this.graficaR2(this.tomodatosdescarga.atsostenida,this.tomodatosdescarga.atalternante,this.tomodatosdescarga.tiemporespuesta,this.tomodatosdescarga.controlinhibitorio,this.tomodatosdescarga.atsostenida2,this.tomodatosdescarga.atalternante2,this.tomodatosdescarga.tiemporespuesta2,this.tomodatosdescarga.controlinhibitorio2); // LLamo grafica dona R2
          this.grafica5(this.tomodatosdescarga.valor1,this.tomodatosdescarga.valor2); // LLamo grafica dona 5
          this.grafica6(this.tomodatosdescarga.valor3,this.tomodatosdescarga.valor4); // LLamo grafica dona 6
          this.grafica7(this.tomodatosdescarga.valor5,this.tomodatosdescarga.valor6); // LLamo grafica dona 7
          this.grafica8(this.tomodatosdescarga.valor7,this.tomodatosdescarga.valor8); // LLamo grafica dona 8

        }else{
          //console.log("no se encontro nada");
          this.tomodatosdescarga = {};
        }
    })
  }

  imprimir2(){
    
    this.pdf.imprimir();

  }

  ////////////////////////////////GRAFICAS ////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////
  
  
  
  //////////////////////////////// RADAR //////////////////////////////////////////////

  graficaRadar1(){
    const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        
        //window.print(); // Llama al modo de impresión al inicializar el componente

        this.data = {
            labels: ['Atención sostenida', 'Agudeza visual', 'Tiempo de respuesta', 'Control Inhibitorio'],
            datasets: [
                
                {
                    label: 'Promedio',
                    backgroundColor: 'rgba(179,181,198,0.1)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: [this.forgafica1 ? this.forgafica1.get('atsostenida2').value : 0, this.forgafica1 ? this.forgafica1.get('atalternante2').value : 0, this.forgafica1 ? this.forgafica1.get('trespuesta2').value : 0, this.forgafica1 ? this.forgafica1.get('ctrinhibitorio2').value : 0]
                },
                {
                    label: 'David Carvajal Pernett',
                    backgroundColor: 'rgba(0,0,0,0)', // Fondo transparente
                    borderColor: 'rgba(253,187,55,1)', // Color del borde
                    borderWidth: 3, // Grosor del borde
                    pointBackgroundColor: 'rgba(253,187,55,1)', // Color de los puntos transparente
                    pointBorderColor: 'rgba(253,187,55,1)', // Color del borde de los puntos
                    pointBorderWidth: 2, // Grosor del borde de los puntos
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: [this.forgafica1 ? this.forgafica1.get('atsostenida').value : 0, this.forgafica1 ? this.forgafica1.get('atalternante').value : 0, this.forgafica1 ? this.forgafica1.get('trespuesta').value : 0, this.forgafica1 ? this.forgafica1.get('ctrinhibitorio').value : 0]
                }
            ]
        };
        
        this.options = {

            borderWidth: 1, // Establece el ancho del borde a 0 para eliminarlo
            plugins: {
                legend: {
                    display: false, // Oculta la leyenda
                }
            },
            layout: {
              padding: {
                  top: 0, // Establece un margen superior de 10 píxeles
                  // Otros márgenes si necesitas ajustarlos
              }
            },
            scales: {
                r: {
                    max: 100, // Valor máximo del eje
                    min: 0,   // Valor mínimo del eje
                    grid: {  /// ajusto la cuadrigula
                        display: true,
                        lineWidth: 1,
                        tickDistance: 50
                    },
                    pointLabels: {
                      
                      color: textColorSecondary,
                      font: {
                        size: 12
                      }
                    },
                    
                    angleLines: {  // ajusto eje x y 
                        display: false, // Mostrar líneas angulares
                        color: 'rgba(0, 0, 0, 0.1)', // Color de las líneas angulares
                        lineWidth: 2 // Ancho de las líneas angulares
                    },

                    ticks: {
                        display: false, // Oculta las marcas del eje
                        beginAtZero: true, // Inicia el eje en cero
                        // Otras configuraciones...
                    },


                title: {
                    display: false, // Oculta el título del eje radial
                    }
                    
                }
            }
        };
        
  }

  actualizarGraficoOnChange(){
    this.graficaRadar1();
  }

  //////////////////////////////// FIN RADAR //////////////////////////////////////////////


  //////////////////////////////// DONAS 1 - 4 //////////////////////////////////////////////
  grafica1(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

      this.data1 = {
          labels: ['A', 'B'],
          datasets: [
              {
                data: [this.forgafica2 ? this.forgafica2.get('Valor1').value : 0, this.forgafica2 ? this.forgafica2.get('Valor2').value : 0],
                backgroundColor: ['rgb(255, 192, 0)','rgb(135, 135, 121)'],
                hoverBackgroundColor: ['rgb(255, 207, 55)', 'rgb(168, 168, 158)']
              }
          ]
      };


      this.options1 = {
        cutout: '60%', // Ajusta este valor según tus necesidades
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          }
        },
      };
  }

  actualizarGrafico1(){
    this.numcentro1 = this.forgafica2.get('Valor1').value;
    this.grafica1();
  }

  grafica2(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

      this.data2 = {
          labels: ['A', 'B'],
          datasets: [
              {
                data: [this.forgafica2 ? this.forgafica2.get('Valor3').value : 0, this.forgafica2 ? this.forgafica2.get('Valor4').value : 0],
                backgroundColor: ['rgb(255, 216, 91)','rgb(153, 120, 1)'],
                hoverBackgroundColor: ['rgb(255, 230, 153)', 'rgb(175, 138, 1)']
              }
          ]
      };


      this.options2 = {
          cutout: '60%',
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          }
      };
  }

  actualizarGrafico2(){
    this.numcentro2 = this.forgafica2.get('Valor3').value;
    this.grafica2();
  }

  grafica3(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

      this.data3 = {
          labels: ['A', 'B'],
          datasets: [
              {
                data: [this.forgafica2 ? this.forgafica2.get('Valor5').value : 0, this.forgafica2 ? this.forgafica2.get('Valor6').value : 0],
                backgroundColor: ['rgb(255, 216, 91)','rgb(153, 120, 1)'],
                hoverBackgroundColor: ['rgb(255, 230, 153)', 'rgb(175, 138, 1)']
              }
          ]
      };


      this.options3 = {
          cutout: '60%',
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          }
      };
  }

  actualizarGrafico3(){
    this.numcentro3 = this.forgafica2.get('Valor5').value;
    this.grafica3();
  }

  grafica4(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

      this.data4 = {
          labels: ['A', 'B'],
          datasets: [
              {
                data: [this.forgafica2 ? this.forgafica2.get('Valor7').value : 0, this.forgafica2 ? this.forgafica2.get('Valor8').value : 0],
                backgroundColor: ['rgb(255, 216, 91)','rgb(153, 120, 1)'],
                hoverBackgroundColor: ['rgb(255, 230, 153)', 'rgb(175, 138, 1)']
              }
          ]
      };


      this.options4 = {
          cutout: '60%',
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          }
      };
  }

  actualizarGrafico4(){
    this.numcentro4 = this.forgafica2.get('Valor7').value;
    this.grafica4();
  }

  grafica5(valor1:any,valor2:any){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

      this.data5 = {
          labels: ['A', 'B'],
          datasets: [
              {
                data: [valor1 != "" ? valor1 : 0, valor2 != "" ? valor2 : 0],
                backgroundColor: ['rgb(255, 216, 91)','rgb(153, 120, 1)'],
                hoverBackgroundColor: ['rgb(255, 230, 153)', 'rgb(175, 138, 1)']
              }
          ]
      };


      this.options5 = {
          cutout: '60%',
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          }
      };
  }
  grafica6(valor3:any,valor4:any){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

      this.data6 = {
          labels: ['A', 'B'],
          datasets: [
              {
                data: [valor3 != "" ? valor3 : 0, valor4 != "" ? valor4 : 0],
                backgroundColor: ['rgb(255, 216, 91)','rgb(153, 120, 1)'],
                hoverBackgroundColor: ['rgb(255, 230, 153)', 'rgb(175, 138, 1)']
              }
          ]
      };


      this.options6 = {
          cutout: '60%',
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          }
      };
  }
  grafica7(valor5:any,valor6:any){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

      this.data7 = {
          labels: ['A', 'B'],
          datasets: [
              {
                data: [valor5 != "" ? valor5 : 0, valor6 != "" ? valor6 : 0],
                backgroundColor: ['rgb(255, 216, 91)','rgb(153, 120, 1)'],
                hoverBackgroundColor: ['rgb(255, 230, 153)', 'rgb(175, 138, 1)']
              }
          ]
      };


      this.options7 = {
          cutout: '60%',
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          }
      };
  }
  grafica8(valor7:any,valor8:any){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

      this.data8 = {
          labels: ['A', 'B'],
          datasets: [
              {
                data: [valor7 != "" ? valor7 : 0, valor8 != "" ? valor8 : 0],
                backgroundColor: ['rgb(255, 216, 91)','rgb(153, 120, 1)'],
                hoverBackgroundColor: ['rgb(255, 230, 153)', 'rgb(175, 138, 1)']
              }
          ]
      };


      this.options8 = {
          cutout: '60%',
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          }
      };
  }
  //////////////////////////////// FIN DONAS 1- 4 //////////////////////////////////////////////

  graficaR2(valor1:any,valor2:any,valor3:any,valor4:any,valor5:any,valor6:any,valor7:any,valor8:any){
    const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        
        //window.print(); // Llama al modo de impresión al inicializar el componente

        this.dataR2 = {
            labels: ['Atención sostenida', 'Agudeza visual', 'Tiempo de respuesta', 'Control Inhibitorio'],
            datasets: [
                
                {
                    label: 'Promedio',
                    backgroundColor: 'rgba(179,181,198,0.1)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: [valor5 != "" ? valor5 : 0, valor6 != "" ? valor6 : 0, valor7 != "" ? valor7 : 0, valor8 != "" ? valor8 : 0]
                },
                {
                    label: 'David Carvajal Pernett',
                    backgroundColor: 'rgba(0,0,0,0)', // Fondo transparente
                    borderColor: 'rgba(253,187,55,1)', // Color del borde
                    borderWidth: 3, // Grosor del borde
                    pointBackgroundColor: 'rgba(253,187,55,1)', // Color de los puntos transparente
                    pointBorderColor: 'rgba(253,187,55,1)', // Color del borde de los puntos
                    pointBorderWidth: 2, // Grosor del borde de los puntos
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: [valor1 != "" ? valor1 : 0, valor2 != "" ? valor2 : 0, valor3 != "" ? valor3 : 0, valor4 != "" ? valor4 : 0]
                }
            ]
        };
        
        this.optionsR2 = {

            borderWidth: 1, // Establece el ancho del borde a 0 para eliminarlo
            plugins: {
                legend: {
                    display: false, // Oculta la leyenda
                }
            },
            layout: {
              padding: {
                  top: 0, // Establece un margen superior de 10 píxeles
                  // Otros márgenes si necesitas ajustarlos
              }
            },
            scales: {
                r: {
                    max: 100, // Valor máximo del eje
                    min: 0,   // Valor mínimo del eje
                    grid: {  /// ajusto la cuadrigula
                        display: true,
                        lineWidth: 1,
                        tickDistance: 50
                    },
                    pointLabels: {
                      
                      color: textColorSecondary,
                      font: {
                        size: 12
                      }
                    },
                    
                    angleLines: {  // ajusto eje x y 
                        display: false, // Mostrar líneas angulares
                        color: 'rgba(0, 0, 0, 0.1)', // Color de las líneas angulares
                        lineWidth: 2 // Ancho de las líneas angulares
                    },

                    ticks: {
                        display: false, // Oculta las marcas del eje
                        beginAtZero: true, // Inicia el eje en cero
                        // Otras configuraciones...
                    },


                title: {
                    display: false, // Oculta el título del eje radial
                    }
                    
                }
            }
        };
        
  }
 
  async imprimir(){
    
    this.isLoading=true;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'letter',
      hotfixes: ["px_scaling"]
    });

    let nombreCompletoMayuscula = this.unpaciente.nombre.toUpperCase()+" "+this.unpaciente.apellidos.toUpperCase();

    this.captureElement = document.querySelector("#grafiRadar");
    this.capturedona1 = document.querySelector("#grafiDona1");
    this.capturedona2 = document.querySelector("#grafiDona2");
    this.capturedona3 = document.querySelector("#grafiDona3");
    this.capturedona4 = document.querySelector("#grafiDona4");

    const canvas = await html2canvas(this.captureElement, { backgroundColor: null, scale: 1 });
    this.imgData = canvas.toDataURL('image/png');
    
    const canvas1 = await html2canvas(this.capturedona1, { backgroundColor: null, scale: 1 });
    this.imgData1 = canvas1.toDataURL('image/png');

    const canvas2 = await html2canvas(this.capturedona2, { backgroundColor: null, scale: 1 });
    this.imgData2 = canvas2.toDataURL('image/png');

    const canvas3 = await html2canvas(this.capturedona3, { backgroundColor: null, scale: 1 });
    this.imgData3 = canvas3.toDataURL('image/png');

    const canvas4 = await html2canvas(this.capturedona4, { backgroundColor: null, scale: 1 });
    this.imgData4 = canvas4.toDataURL('image/png');

    // html2canvas(this.captureElement, { backgroundColor: null, scale: 1 } ).then((canvas: HTMLCanvasElement) => {
    //   this.imgData = canvas.toDataURL('image/png');
    // });
    // html2canvas(this.capturedona1, { backgroundColor: null, scale: 1 }).then((canvas: HTMLCanvasElement) => {
    //   this.imgData1 = canvas.toDataURL('image/png');
    // });
    // html2canvas(this.capturedona2, { backgroundColor: null, scale: 1 }).then((canvas: HTMLCanvasElement) => {
    //   this.imgData2 = canvas.toDataURL('image/png');
    // });
    // html2canvas(this.capturedona3, { backgroundColor: null, scale: 1 }).then((canvas: HTMLCanvasElement) => {
    //   this.imgData3 = canvas.toDataURL('image/png');
    // });
    // html2canvas(this.capturedona4, { backgroundColor: null, scale: 1 }).then((canvas: HTMLCanvasElement) => {
    //   this.imgData4 = canvas.toDataURL('image/png');
    // });

    //console.log(this.captureElement);
    
    // Coordenadas para centrar la imagen en la página
    //const x = (doc.internal.pageSize.width - imgWidth) / 2;
    //const y = (doc.internal.pageSize.height - imgHeight) / 2;
    
    // Obtener el ancho completo de la hoja en píxeles
    const pageWidth = doc.internal.pageSize.width; // Ancho de la hoja en píxeles
    const pageHeight = doc.internal.pageSize.height; // Alto de la hoja en píxeles
    
    // // Agregar imagen en la parte superior de la página
    doc.addImage('../../assets/top.png', 'png', 0, 0, pageWidth, 100,"top");
 
    // Datos de ejemplo para la tabla
    var data = [
      // Las tres últimas celdas están combinadas en la primera fila
      ["Nombre y apellidos :", { content: this.unpaciente.nombre+" "+this.unpaciente.apellidos, colSpan: 3 }],
      ["Identifiación :", this.unpaciente.dni, "Edad :", this.unpaciente.edad+" años"],
      ["Escolaridad :", this.escolaridad(this.unpaciente.escolaridad), "Lateralidad :",this.lateralidad(this.unpaciente.lateralidad)],
      ["Gravedad :", this.gravedad(this.unpaciente.gravedad), "Accidentes reportados :", this.unpaciente.numaccidentes],
      ["Antecedentes :", { content: this.unpaciente.antecedentes, colSpan: 3 }]
    ];

    // Opciones para la tabla
    var options = {
      margin: { top: 20 }, // Margen superior
      startY: 200, // Posición inicial de la tabla
      headStyles: {
          fillColor: [253, 187, 55], // Color de fondo del encabezado
          textColor: [0, 0, 0], // Color del texto del encabezado
          fontStyle: 'bold', // Estilo de fuente del encabezado
          lineWidth: 1 // Ancho de borde
      },
      bodyStyles: {
        lineWidth: 1, // Ancho de borde para el cuerpo de la tabla
      },
      columnStyles: {
        
        // Primera y segunda columna con ancho automático
        0: { cellWidth: 'auto'},
        1: { cellWidth: 'auto'},
        2: { cellWidth: 'auto'},
        3: { cellWidth: 'auto'},
        // Especifica la combinación de celdas para la primera fila
        // row: {
        //   0: { 1: { colspan: 3 } } // Combinar las tres últimas celdas en la primera fila
        // }
      }
    };

    // Agregar la tabla al documento
    //autoTable(doc, { html: '#my-table' })
    autoTable(doc,{
      head: [
        [{content: 'EVALUACIÓN COGNITIVA ATENCIONAL', styles: {fontSize: 14, halign: 'center', fillColor: [255, 217, 102], textColor: [0, 0, 0], lineWidth: 1 },colSpan: 4}],
        [{content: 'CONDUCTORES VEHÍCULOS LINEA BLANCA', styles: {fontSize: 13, halign: 'center', fillColor: [217, 217, 217], textColor: [0, 0, 0], lineWidth: 1 },colSpan: 4}],
        // ["Nombre", "Apellido", "Información Personal", "ver"]
      ], // Títulos a la derecha
      body: data.slice(0), // Cuerpo de la tabla
      // Opciones de la tabla
      margin: { top: 20, left: 114, right: 114, bottom: 20 }, // Margen superior
      startY: 160, // Posicion en la hoja
      bodyStyles: {
        lineWidth: 1, // Ancho de borde para el cuerpo de la tabla
      },


    });

    // Agregar imagen de fondo como marca de agua

    let x = (pageWidth - 600) / 2;
    let y = (pageHeight - 500) / 2;

    doc.addImage('../../assets/fondo3.png', 'png', x, y, 600, 500,"mid");

    doc.addImage('../../assets/bot.png', 'png', 0, pageHeight-100, 816, 100,"bot");

    // // Agregar imagen en la parte inferior de la página
     //doc.addImage('../../assets/bot3.png', 'png', 40, 594-20 , 377,7,"bot");
     //doc.addImage('../../assets/top.png', 'png', 10, 10 , 50,50,"bot");
     //doc.addImage('../../assets/bot3.png', 'png', 70, 10 , 50,50,"bot");
    
    // // Agregar contenido al documento
    // Especificar la fuente, tamaño y estilo del título
    doc.setFontSize(12);
    const textoLargo = `A continuación, se describe el perfil general del rendimiento en la evaluación cognitiva, el cual contempla procesos atencionales y funciones ejecutivas, el ítem de atención sostenida evidencia una ponderación de los aciertos logrados en la ejecución de la prueba “CPT”. El ítem de Velocidad de procesamiento, el cual se establece a partir del tiempo de respuesta que se otorga posterior a la aparición del estímulo, y el ítem Control inhibitorio, el cual contempla la capacidad de inhibir o bloquear conductas inapropiadas o distractores.`;
    doc.text(textoLargo,80,420,{ align: 'justify', maxWidth: 645 } );

    doc.setFontSize(16);
    doc.text("Perfil Neurocognitivo",doc.internal.pageSize.getWidth() / 2,580,{ align: 'center' } );


    setTimeout(() => {
      doc.addImage(this.imgData, 'PNG', (doc.internal.pageSize.width - 420) / 2, 580, 420, 420, "graficaradio");

      doc.addPage(); ///PAGINA 2

      // // Agregar imagen en la parte superior de la página
      doc.addImage('../../assets/top.png', 'png', 0, 0, pageWidth, 100,"top");

      doc.addImage('../../assets/fondo3.png', 'png', x, y, 600, 500,"mid");

      doc.addImage('../../assets/bot.png', 'png', 0, pageHeight-100, 816, 100,"bot");

      doc.setFontSize(24);
      doc.text("Perfil Cognitivo",80,200);

      doc.setFontSize(12);
      const textoLargo2 = `En este apartado se discrimina por cada habilidad cognitiva evaluada junto con el puntaje correspondiente alcanzado, en una escala de 0-100. Que le permite compararlo frente a un grupo de referencia. Los valores calculados se obtienen a partir de una puntuación global de la prueba y se reajustan a la escala 0-100. A mayor puntuación obtenida, mayor rendimiento.`;
      doc.text(textoLargo2,80,260,{ align: 'justify', maxWidth: 645 } );

      doc.setFontSize(12);
      const textoLargo3 = `La conducción representa un compromiso cognitivo significativo, por el alto nivel de información que se procesa y su flujo constante. A continuación, se describen los procesos cognitivos críticos y claves en el ejercicio de la conducción.`;
      doc.text(textoLargo3,80,360,{ align: 'justify', maxWidth: 645 } );

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("PROCESO ATENCIONAL Y PERCEPTUAL",80,460);
      doc.setFont("helvetica", "normal");

      doc.setFontSize(12);
      const textoLargo4 = `Los procesos atencionales juegan un papel fundamental en la conducción, debido al alto flujo de información que se requiere procesar. La atención es el primer proceso cognitivo, que le permite al conductor, estar en comunicación con su entorno. Este proceso se subdivide en los diferentes tipos de atención.`;
      doc.text(textoLargo4,80,490,{ align: 'justify', maxWidth: 645 } );

      doc.addImage(this.imgData1, 'PNG', 80, 585, 150, 150, "graficadona1");

      doc.setFont("helvetica","bold");
      doc.setFontSize(16);
      doc.text("Atención sostenida",260,610);
      doc.setFont("helvetica", "normal");

      doc.setFontSize(12);
      const textoLargo5 = `Hace referencia a la capacidad de atender a un mismo estimulo durante un largo periodo de tiempo. El conductor `+nombreCompletoMayuscula+` obtuvo una puntuación `+this.rangoTotal(this.totalResultadoBaremo[0])+` en esta habilidad, lo que se relaciona con una `+this.califiacionTotal(this.totalResultadoBaremo[0])+` capacidad para enfocarse   en la información relevante mientras se omiten los   elementos distractores.`;
      doc.text(textoLargo5,260,650,{ align: 'justify', maxWidth: 465 } );

      doc.addImage('../../assets/informe3.png', 'png', (doc.internal.pageSize.width - 200) / 2, 750, 200, 200,"celular");

      doc.addPage();////PAGINA 3

      // // Agregar imagen en la parte superior de la página
      doc.addImage('../../assets/top.png', 'png', 0, 0, pageWidth, 100,"top");
      doc.addImage('../../assets/fondo3.png', 'png', x, y, 600, 500,"mid");
      doc.addImage('../../assets/bot.png', 'png', 0, pageHeight-100, 816, 100,"bot");


      doc.addImage(this.imgData2, 'PNG', 80, 200, 150, 150, "graficadona2");

      doc.setFont("helvetica","bold");
      doc.setFontSize(16);
      doc.text("Agudeza visual",260,210);
      doc.setFont("helvetica","normal");

      doc.setFontSize(12);
      const textoLargo6 = `Hace referencia a la capacidad para percibir estímulos visuales de manera oportuna y detectar aquellos que se consideran relevantes de los irrelevantes. El conductor `+nombreCompletoMayuscula+` obtuvo una puntuación `+this.rangoTotal(this.totalResultadoBaremo[3])+` en esta habilidad. Lo que se relaciona con una `+this.califiacionTotal(this.totalResultadoBaremo[3])+` capacidad de identificar de manera oportuna obstáculos o elementos de riesgo en la vía.`;
      doc.text(textoLargo6,260,250,{ align: 'justify', maxWidth: 465 } );

      doc.setFont("helvetica","bold");
      doc.setFontSize(16);
      doc.text("FUNCIONES EJECUTIVAS",80,400);
      doc.setFont("helvetica","normal");

      doc.setFontSize(12);
      const textoLargo7 = `Las funciones ejecutivas obedecen a aquellas funciones psicológicas superiores, son las encargadas de monitorear y regular los demás procesos cognitivos. Gracias a estos procesos un conductor puede ajustar su conducta de acuerdo con las exigencias del entorno, es decir, regular su velocidad, abstenerse de realizar maniobras peligrosas y establecer estrategias efectivas para la solución de problemas en la vía.`;
      doc.text(textoLargo7,80,440,{ align: 'justify', maxWidth: 645 } );

      doc.addImage(this.imgData3, 'PNG', 80, 550, 150, 150, "graficadona3");

      doc.setFont("helvetica","bold");
      doc.setFontSize(16);
      doc.text("Velocidad de procesamiento",260,555);
      doc.setFont("helvetica","normal");

      doc.setFontSize(12);
      const textoLargo8 = `Hace referencia a la capacidad para percibir estímulos visuales de manera oportuna y detectar aquellos que se consideran relevantes de los irrelevantes. El conductor `+nombreCompletoMayuscula+` obtuvo una puntuación `+this.rangoTotal(this.totalResultadoBaremo[2])+` en esta habilidad. Lo que se relaciona con una `+this.califiacionTotal(this.totalResultadoBaremo[2])+` capacidad de identificar de manera oportuna obstáculos o elementos de riesgo en la vía.`;
      doc.text(textoLargo8,260,595,{ align: 'justify', maxWidth: 465 } );

      doc.addImage(this.imgData4, 'PNG', 80, 750, 150, 150, "graficadona4");

      doc.setFont("helvetica","bold");
      doc.setFontSize(16);
      doc.text("Control inhibitorio",260,750);
      doc.setFont("helvetica","normal");

      doc.setFontSize(12);
      const textoLargo9 = `Se refiere a la capacidad para responder de manera oportuna frente a las situaciones, utilizando una conducta apropiada, de acuerdo con el contexto y eliminando aquella respuesta automática que no se ajusta a los requerimientos del entorno. El conductor `+nombreCompletoMayuscula+`, obtuvo una puntuación `+this.rangoTotal(this.totalResultadoBaremo[1])+` en esta habilidad. Lo que se relaciona con una `+this.califiacionTotal(this.totalResultadoBaremo[1])+` capacidad para orientar su respuesta frente a cualquier estimulo en la vía`;
      doc.text(textoLargo9,260,790,{ align: 'justify', maxWidth: 465 } );

      doc.addPage();////PAGINA 4

      // // Agregar imagen en la parte superior de la página
      doc.addImage('../../assets/top.png', 'png', 0, 0, pageWidth, 100,"top");
      doc.addImage('../../assets/fondo3.png', 'png', x, y, 600, 500,"mid");
      doc.addImage('../../assets/bot.png', 'png', 0, pageHeight-100, 816, 100,"bot");

      doc.setFontSize(24);
      doc.text("Conclusiones",80,200);

      doc.setFontSize(12);
      const textoLargo10 = `Según los datos recogidos, el conductor `+nombreCompletoMayuscula+` obtuvo una puntuación general de `+this.totalResultadoBaremo[4]+`, lo que lo ubica en el rango `+this.rangoTotal(this.totalResultadoBaremo[4])+`, esto indica que se ajusta a los requerimientos del cargo, teniendo en cuenta su desempeño en los perfiles neurocognitivos y neuropsicológicos.`;
      doc.text(textoLargo10,80,260,{ align: 'justify', maxWidth: 645 } );

      doc.setFontSize(12);
      let textoLargo11:any;
      if (this.forgafica3.get('conclusiones').value == ""){
        textoLargo11 = `Se recomienda realizar seguimientos en aquellas áreas donde el rendimiento no alcanzó la mayor puntuación, de modo que sea posible entrenar cognitivamente estas áreas tales como la atención y la velocidad de procesamiento y sea posible potencializar aquellas que ya se encuentran en rangos altos.`;
      }else{
        textoLargo11 = this.forgafica3.get('conclusiones').value;
      }
      doc.text(textoLargo11,80,360,{ align: 'justify', maxWidth: 645 } );

      let estado = this.califiacionTotal(this.totalResultadoBaremo[4]);
      let urlstado:string;
      if (estado === "BUENA"){
        doc.addImage('../../assets/apto.png', 'png', (doc.internal.pageSize.width - 200) / 2, 460, 200, 80,"estado");
        urlstado = "apto.png";
      }else if(estado === "ADECUADA"){
        doc.addImage('../../assets/aptobajorecomendacion.png', 'png', (doc.internal.pageSize.width - 266) / 2, 460, 266, 80,"estado");
        urlstado = "aptobajorecomendacion.png";
      }else{
        doc.addImage('../../assets/noapto.png', 'png', (doc.internal.pageSize.width - 200) / 2, 460, 200, 70,"estado");
        urlstado = "noapto.png";
      }

      

      doc.addImage('../../assets/firma_quevedo_barrios.png', 'png', 120, 820, 200, 80,"firma");


      doc.setFontSize(12);
      doc.text("_________________________________________",80,880);
      doc.setFont("helvetica", "normal", "bold");
      doc.text("PSI. Daniela Fernanda Quevedo Barrios",80,900);
      doc.setFont("helvetica", "normal");
      doc.text("Magister en Neuropsicología",80,920);
      doc.text("ES&VA SOLUCIONES INTEGRALES S.A.S.",80,940);

      doc.save(this.fechaActual.toISOString().slice(0, 10)+' '+nombreCompletoMayuscula+'.pdf'); // CREA EL ARCHIVIO PDF

      /// GUARDO EN BD LA INFORMACION GENERADA

      const form: resultadostotalI = {

        nombrecompleto: this.unpaciente.nombre+" "+this.unpaciente.apellidos,
        identificacion: this.unpaciente.dni,
        edad: this.unpaciente.edad,
        escolaridad: this.unpaciente.escolaridad,
        lateralidad: this.unpaciente.lateralidad,
        gravedad: this.unpaciente.gravedad,
        accidentesreportados: this.unpaciente.numaccidentes,
        antecedentes: this.unpaciente.antecedentes,
        atsostenida: this.forgafica1.get('atsostenida').value,
        atalternante: this.forgafica1.get('atalternante').value,
        tiemporespuesta: this.forgafica1.get('trespuesta').value,
        controlinhibitorio: this.forgafica1.get('ctrinhibitorio').value,
        atsostenida2: this.forgafica1.get('atsostenida2').value,
        atalternante2: this.forgafica1.get('atalternante2').value,
        tiemporespuesta2: this.forgafica1.get('trespuesta2').value,
        controlinhibitorio2: this.forgafica1.get('ctrinhibitorio2').value,
        rango1: this.rangoTotal(this.totalResultadoBaremo[0]),
        rango2: this.rangoTotal(this.totalResultadoBaremo[3]),
        rango3: this.rangoTotal(this.totalResultadoBaremo[2]),
        rango4: this.rangoTotal(this.totalResultadoBaremo[1]),
        rangototal: this.rangoTotal(this.totalResultadoBaremo[4]),
        calificacion1: this.califiacionTotal(this.totalResultadoBaremo[0]),
        calificacion2: this.califiacionTotal(this.totalResultadoBaremo[3]),
        calificacion3: this.califiacionTotal(this.totalResultadoBaremo[2]),
        calificacion4: this.califiacionTotal(this.totalResultadoBaremo[1]),
        calificaciontotal: this.totalResultadoBaremo[4],
        valor1: this.forgafica2.get('Valor1').value,
        valor2: this.forgafica2.get('Valor2').value,
        valor3: this.forgafica2.get('Valor3').value,
        valor4: this.forgafica2.get('Valor4').value,
        valor5: this.forgafica2.get('Valor5').value,
        valor6: this.forgafica2.get('Valor6').value,
        valor7: this.forgafica2.get('Valor7').value,
        valor8: this.forgafica2.get('Valor8').value,
        conclusiones: textoLargo11,
        nombreprofe: "PSI. Daniela Fernanda Quevedo Barrios",
        estudioprofe: "Magister en Neuropsicología",
        urlestado: urlstado,
        urlfirma: "firma_quevedo_barrios.png",
        //fecha: this.unpaciente.edad, el servidor pone la fecha
        id_ctp_resultados: this.ultimoElemento.ctpid,
        estado: "1",
        token: "c890eaf03d0b47cc7b64df1647630c16"
  
      }

      this.resultadostotal.agreagarresultados(form).subscribe(data =>{
        //console.log(data);
      })

      this.isLoading=false;
      this.btncreainforme = false; // boton de crear informe se deshabilita 
      this.cerrarmoda3.dismiss();
      this.cerrarmoda4.dismiss();

    }, 3000);
  
    
    // Imprimir automáticamente y abrir en una nueva ventana
    //doc.autoPrint({variant: 'non-conform'});
    //doc.output('datauristring', { filename: 'comprobante.pdf' });
    //doc.output('dataurlnewwindow', { filename: '123.pdf' });
   

  }


  escolaridad(escolaridad: any): string {
    switch (escolaridad) {
      case "1":
        return "Primaria";
      case "2":
        return "Bachillerato";
      case "3":
        return "Técnico";
      case "4":
        return "Tecnólogo";
      case "5":
        return "Profesional";
      case "6":
        return "Especialización";
      default:
        return " - - - ";
    }
  }

  lateralidad(latera: any): string {
    switch (latera) {
      case "1":
        return "Izquierda";
      case "2":
        return "Derecha";
      default:
        return " - - - ";
    }
  }

  gravedad(grave: any): string {
    switch (grave) {
      case "0":
        return "N/A";
      case "1":
        return "Solo daños";
      case "2":
        return "Con lesionados";
      case "3":
        return "Con Fallecidos";
      default:
        return " - - - ";
    }
  }

  calcularOmision(dato: any): string{
    if (dato < 25) {
      return "Baja";
    } else if (dato >= 25 && dato < 75) {
        return "Media";
    } else if (dato >= 75 && dato < 101) {
        return "Alta";
    } else {
        return " - N/A - ";
    }
  }

  baremoMINER(omi:any,comi:any,tr:any,perse:any){


    let v1: number;
    let v2: number;
    let v3: number;
    let v4: number;

    if (omi == 0) {
      v1 = 25;
    } else if (omi == 1) {
      v1 = 24;
    } else if (omi == 2) {
        let valor1 = [23, 22];
        let indiceAleatorio = Math.floor(Math.random() * valor1.length);
        v1 = valor1[indiceAleatorio];
    } else if (omi >= 3 && omi <= 4) {
      let valor2 = [21, 20, 19, 18, 17];
        let indiceAleatorio = Math.floor(Math.random() * valor2.length);
        v1 = valor2[indiceAleatorio];
    } else if (omi == 5) {
        v1 = 16;
    } else if (omi == 6) {
        v1 = 15;
    } else if (omi == 7) {
      let valor3 = [14, 13];
      let indiceAleatorio = Math.floor(Math.random() * valor3.length);
      v1 = valor3[indiceAleatorio];
    } else if (omi == 8) {
      let valor4 = [12, 11];
      let indiceAleatorio = Math.floor(Math.random() * valor4.length);
      v1 = valor4[indiceAleatorio];
    } else if (omi == 9) {
      let valor5 = [10, 9];
      let indiceAleatorio = Math.floor(Math.random() * valor5.length);
      v1 = valor5[indiceAleatorio];
    } else if (omi == 10) {
      let valor6 = [8, 7, 6];
      let indiceAleatorio = Math.floor(Math.random() * valor6.length);
      v1 = valor6[indiceAleatorio];
    } else if (omi >= 11 && omi <= 12) {
      v1 = 5;
    } else if (omi >= 13 && omi <= 14) {
      v1 = 4;
    } else if (omi >= 15 && omi <= 16) {
      v1 = 3;
    } else if (omi == 17 ) {
      v1 = 2;
    } else if (omi >= 18 && omi <= 19) {
      v1 = 1;
    } else if (omi == 20 ) {
      v1 = 0;
    } else {
      v1 = 0;
    }

    if (comi >= 0 && comi <= 3) {
      v2 = 25;
    } else if (comi >= 4 && comi <= 6) {
      let valor10 = [24, 23];
        let indiceAleatorio = Math.floor(Math.random() * valor10.length);
        v2 = valor10[indiceAleatorio];
    } else if (comi >= 7 && comi <= 10) {
      v2 = 22;
    } else if (comi >= 11 && comi <= 13) {
      v2 = 21;
    } else if (comi == 14) {
      v2 = 20;
    } else if (comi == 15) {
      v2 = 19;
    } else if (comi == 16) {
      v2 = 18;
    } else if (comi >= 17 && comi <= 21) {
      v2 = 17;
    } else if (comi >= 22 && comi <= 27) {
      v2 = 16;
    } else if (comi >= 28 && comi <= 32) {
      v2 = 15;
    } else if (comi == 33) {
      v2 = 14;
    } else if (comi == 34) {
      v2 = 13;
    } else if (comi == 35) {
      v2 = 12;
    } else if (comi >= 36 && comi <= 40) {
      v2 = 11;
    } else if (comi >= 41 && comi <= 45) {
      v2 = 10;
    } else if (comi >= 46 && comi <= 49) {
      v2 = 9;
    } else if (comi == 50) {
      v2 = 8;
    } else if (comi == 51) {
      v2 = 7;
    } else if (comi == 52) {
      let valor11 = [6, 5];
        let indiceAleatorio = Math.floor(Math.random() * valor11.length);
        v2 = valor11[indiceAleatorio];
    } else if (comi >= 53 && comi <= 55) {
      v2 = 4;
    } else if (comi >= 56 && comi <= 59) {
      let valor12 = [3, 2];
        let indiceAleatorio = Math.floor(Math.random() * valor12.length);
        v2 = valor12[indiceAleatorio];
    } else if (comi == 60) {
      v2 = 1;
    } else{
      v2 = 0;
    }

    if (tr <= 350) {
      v3 = 25;
    } else if (tr <= 370){
        v3 = 24;
    } else if (tr <= 389) {
        v3 = 23;
    } else if (tr <= 409){
        v3 = 22;
    } else if (tr <= 429) {
        v3 = 21;
    } else if (tr <= 449){
        v3 = 20;
    } else if (tr <= 450) {
        v3 = 19;
    } else if (tr <= 463){
        v3 = 18;
    } else if (tr <= 476) {
        v3 = 17;
    } else if (tr <= 489){
        v3 = 16;
    } else if (tr <= 502) {
        v3 = 15;
    } else if (tr <= 515){
        v3 = 14;
    } else if (tr <= 528) {
        v3 = 13;
    } else if (tr <= 529){
        v3 = 12;
    } else if (tr <= 545) {
        v3 = 11;
    } else if (tr <= 561){
        v3 = 10;
    } else if (tr <= 577) {
        v3 = 9;
    } else if (tr <= 593){
        v3 = 8;
    } else if (tr <= 609) {
        v3 = 7;
    } else if (tr <= 622){
        v3 = 6;
    } else if (tr <= 635) {
        v3 = 5;
    } else if (tr <= 648){
        v3 = 4;
    } else if (tr <= 661) {
        v3 = 3;
    } else if (tr <= 674){
        v3 = 2;
    } else if (tr <= 687) {
        v3 = 1;
    } else {
        v3 = 0;
    }

  if (perse == 0) {
    let valor7 = [25,24,23,22,21,20];
    let indiceAleatorio = Math.floor(Math.random() * valor7.length);
    v4 = valor7[indiceAleatorio];
  } else if (perse == 1) {
    v4 = 19;
  } else if (perse == 2) {
    let valor8 = [18,17,16];
    let indiceAleatorio = Math.floor(Math.random() * valor8.length);
    v4 = valor8[indiceAleatorio];
  } else if (perse == 3) {
    let valor9 = [15,14,13];
    let indiceAleatorio = Math.floor(Math.random() * valor9.length);
    v4 = valor9[indiceAleatorio];
  } else if (perse == 4) {
    v4 = 12;
  } else if (perse == 5) {
    v4 = 11;
  } else if (perse == 6) {
    v4 = 10;
  } else if (perse == 7) {
    v4 = 9;
  } else if (perse == 8) {
    v4 = 8;
  } else if (perse == 9) {
    v4 = 7;
  } else if (perse == 10) {
    v4 = 6;
  } else if (perse == 11) {
    v4 = 5;
  } else if (perse == 12) {
    v4 = 4;
  } else if (perse == 13) {
    v4 = 3;
  } else if (perse == 14) {
    v4 = 2;
  } else if (perse == 15) {
    v4 = 1;
  } else {
    v4 = 0;
  }


    return [v1,v2,v3,tr,v4];

  }

  cptTotal(omisiones:number,comision:number,tr:number,perseveraciones:number){
    let total:number [];
    let rango: [];
    let clasifica: [];
    let omE:number = (omisiones * 100) / 32;
    let omEAproximado =parseFloat( omE.toFixed(0) );
    let omision = 100 - omEAproximado;

    let coM:number = (comision * 100) / 38;
    let coMproximado =parseFloat( coM.toFixed(0) );
    let contInh = 100 - coMproximado;

    let trE:number = (tr * 100) / 1216;
    let trEAproximado =parseFloat( trE.toFixed(0) );
    let trTotal = 100 - trEAproximado;

    let agV:number = (perseveraciones * 100) / 18;
    let agVAproximado =parseFloat( agV.toFixed(0) );
    let agudeza = 100 - agVAproximado;


    let cTpTotal = (omision+agudeza+trTotal+contInh)/4
    let cTpTotal2 = parseFloat( cTpTotal.toFixed(0) );
    //console.log(omision);
    //console.log(contInh);
    //console.log(trTotal);
    //console.log(agudeza);

    //console.log(cTpTotal2);
    //this.rangoTotal(cTpTotal);

    return total = [omision,contInh,trTotal,agudeza,cTpTotal2];

  }

  rangoTotal(valor:number){
    let estado:string;
    if(valor < 26){
      estado = "MUY BAJA";
    } else if (valor < 51){
      estado = "BAJA";
    }else if (valor < 76){
      estado = "MEDIA";
    }else{
      estado = "ALTA";
    }
    //console.log(estado);
    return estado;
  }

  califiacionTotal(valor:number){
    let estado:string;
    if(valor < 25){
      estado = "ESCASA";
    } else if (valor < 75){
      estado = "ADECUADA";
    }else{
      estado = "BUENA";
    }
    //console.log(estado);
    return estado;
  }

  async generaInforme(){

    this.isLoading = true;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'letter',
      hotfixes: ["px_scaling"]
    });

    let nombreCompletoMayuscula = this.tomodatosdescarga.nombrecompleto;

    this.captureElement = document.querySelector("#grafiRadar");
    this.capturedona1 = document.querySelector("#grafiDona5");
    this.capturedona2 = document.querySelector("#grafiDona6");
    this.capturedona3 = document.querySelector("#grafiDona7");
    this.capturedona4 = document.querySelector("#grafiDona8");

    const canvas = await html2canvas(this.captureElement, { backgroundColor: null, scale: 1 });
    this.imgData = canvas.toDataURL('image/png');
    
    const canvas1 = await html2canvas(this.capturedona1, { backgroundColor: null, scale: 1 });
    this.imgData1 = canvas1.toDataURL('image/png');

    const canvas2 = await html2canvas(this.capturedona2, { backgroundColor: null, scale: 1 });
    this.imgData2 = canvas2.toDataURL('image/png');

    const canvas3 = await html2canvas(this.capturedona3, { backgroundColor: null, scale: 1 });
    this.imgData3 = canvas3.toDataURL('image/png');

    const canvas4 = await html2canvas(this.capturedona4, { backgroundColor: null, scale: 1 });
    this.imgData4 = canvas4.toDataURL('image/png');
    

    //console.log(this.captureElement);
    
    // Coordenadas para centrar la imagen en la página
    //const x = (doc.internal.pageSize.width - imgWidth) / 2;
    //const y = (doc.internal.pageSize.height - imgHeight) / 2;
    
    // Obtener el ancho completo de la hoja en píxeles
    const pageWidth = doc.internal.pageSize.width; // Ancho de la hoja en píxeles
    const pageHeight = doc.internal.pageSize.height; // Alto de la hoja en píxeles
    
    // // Agregar imagen en la parte superior de la página
    doc.addImage('../../assets/top.png', 'png', 0, 0, pageWidth, 100,"top");
 
    // Datos de ejemplo para la tabla
    var data = [
      // Las tres últimas celdas están combinadas en la primera fila
      ["Nombre y apellidos :", { content: nombreCompletoMayuscula, colSpan: 3 }],
      ["Identifiación :", this.tomodatosdescarga.identificacion, "Edad :", this.tomodatosdescarga.edad+" años"],
      ["Escolaridad :", this.escolaridad(this.tomodatosdescarga.escolaridad), "Lateralidad :",this.lateralidad(this.tomodatosdescarga.lateralidad)],
      ["Gravedad :", this.gravedad(this.tomodatosdescarga.gravedad), "Accidentes reportados :", this.tomodatosdescarga.accidentesreportados],
      ["Antecedentes :", { content: this.tomodatosdescarga.antecedentes, colSpan: 3 }]
    ];

    // Opciones para la tabla
    var options = {
      margin: { top: 20 }, // Margen superior
      startY: 200, // Posición inicial de la tabla
      headStyles: {
          fillColor: [253, 187, 55], // Color de fondo del encabezado
          textColor: [0, 0, 0], // Color del texto del encabezado
          fontStyle: 'bold', // Estilo de fuente del encabezado
          lineWidth: 1 // Ancho de borde
      },
      bodyStyles: {
        lineWidth: 1, // Ancho de borde para el cuerpo de la tabla
      },
      columnStyles: {
        
        // Primera y segunda columna con ancho automático
        0: { cellWidth: 'auto'},
        1: { cellWidth: 'auto'},
        2: { cellWidth: 'auto'},
        3: { cellWidth: 'auto'},
        // Especifica la combinación de celdas para la primera fila
        // row: {
        //   0: { 1: { colspan: 3 } } // Combinar las tres últimas celdas en la primera fila
        // }
      }
    };

    // Agregar la tabla al documento
    //autoTable(doc, { html: '#my-table' })
    autoTable(doc,{
      head: [
        [{content: 'EVALUACIÓN COGNITIVA ATENCIONAL', styles: {fontSize: 14, halign: 'center', fillColor: [255, 217, 102], textColor: [0, 0, 0], lineWidth: 1 },colSpan: 4}],
        [{content: 'CONDUCTORES VEHÍCULOS LINEA BLANCA', styles: {fontSize: 13, halign: 'center', fillColor: [217, 217, 217], textColor: [0, 0, 0], lineWidth: 1 },colSpan: 4}],
        // ["Nombre", "Apellido", "Información Personal", "ver"]
      ], // Títulos a la derecha
      body: data.slice(0), // Cuerpo de la tabla
      // Opciones de la tabla
      margin: { top: 20, left: 114, right: 114, bottom: 20 }, // Margen superior
      startY: 160, // Posicion en la hoja
      bodyStyles: {
        lineWidth: 1, // Ancho de borde para el cuerpo de la tabla
      },


    });

    // Agregar imagen de fondo como marca de agua

    let x = (pageWidth - 600) / 2;
    let y = (pageHeight - 500) / 2;

    doc.addImage('../../assets/fondo3.png', 'png', x, y, 600, 500,"mid");

    doc.addImage('../../assets/bot.png', 'png', 0, pageHeight-100, 816, 100,"bot");

    // // Agregar imagen en la parte inferior de la página
     //doc.addImage('../../assets/bot3.png', 'png', 40, 594-20 , 377,7,"bot");
     //doc.addImage('../../assets/top.png', 'png', 10, 10 , 50,50,"bot");
     //doc.addImage('../../assets/bot3.png', 'png', 70, 10 , 50,50,"bot");
    
    // // Agregar contenido al documento
    // Especificar la fuente, tamaño y estilo del título
    doc.setFontSize(12);
    const textoLargo = `A continuación, se describe el perfil general del rendimiento en la evaluación cognitiva, el cual contempla procesos atencionales y funciones ejecutivas, el ítem de atención sostenida evidencia una ponderación de los aciertos logrados en la ejecución de la prueba “CPT”. El ítem de Velocidad de procesamiento, el cual se establece a partir del tiempo de respuesta que se otorga posterior a la aparición del estímulo, y el ítem Control inhibitorio, el cual contempla la capacidad de inhibir o bloquear conductas inapropiadas o distractores.`;
    doc.text(textoLargo,80,420,{ align: 'justify', maxWidth: 645 } );

    doc.setFontSize(16);
    doc.text("Perfil Neurocognitivo",doc.internal.pageSize.getWidth() / 2,580,{ align: 'center' } );


    setTimeout(() => {
      doc.addImage(this.imgData, 'PNG', (doc.internal.pageSize.width - 420) / 2, 580, 420, 420, "graficaradio");

      doc.addPage(); ///PAGINA 2

      // // Agregar imagen en la parte superior de la página
      doc.addImage('../../assets/top.png', 'png', 0, 0, pageWidth, 100,"top");

      doc.addImage('../../assets/fondo3.png', 'png', x, y, 600, 500,"mid");

      doc.addImage('../../assets/bot.png', 'png', 0, pageHeight-100, 816, 100,"bot");

      doc.setFontSize(24);
      doc.text("Perfil Cognitivo",80,200);

      doc.setFontSize(12);
      const textoLargo2 = `En este apartado se discrimina por cada habilidad cognitiva evaluada junto con el puntaje correspondiente alcanzado, en una escala de 0-100. Que le permite compararlo frente a un grupo de referencia. Los valores calculados se obtienen a partir de una puntuación global de la prueba y se reajustan a la escala 0-100. A mayor puntuación obtenida, mayor rendimiento.`;
      doc.text(textoLargo2,80,260,{ align: 'justify', maxWidth: 645 } );

      doc.setFontSize(12);
      const textoLargo3 = `La conducción representa un compromiso cognitivo significativo, por el alto nivel de información que se procesa y su flujo constante. A continuación, se describen los procesos cognitivos críticos y claves en el ejercicio de la conducción.`;
      doc.text(textoLargo3,80,360,{ align: 'justify', maxWidth: 645 } );

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("PROCESO ATENCIONAL Y PERCEPTUAL",80,460);
      doc.setFont("helvetica", "normal");

      doc.setFontSize(12);
      const textoLargo4 = `Los procesos atencionales juegan un papel fundamental en la conducción, debido al alto flujo de información que se requiere procesar. La atención es el primer proceso cognitivo, que le permite al conductor, estar en comunicación con su entorno. Este proceso se subdivide en los diferentes tipos de atención.`;
      doc.text(textoLargo4,80,490,{ align: 'justify', maxWidth: 645 } );

      doc.addImage(this.imgData1, 'PNG', 80, 585, 150, 150, "graficadona1");

      doc.setFont("helvetica","bold");
      doc.setFontSize(16);
      doc.text("Atención sostenida",260,610);
      doc.setFont("helvetica", "normal");

      doc.setFontSize(12);
      const textoLargo5 = `Hace referencia a la capacidad de atender a un mismo estimulo durante un largo periodo de tiempo. El conductor `+nombreCompletoMayuscula.toUpperCase()+` obtuvo una puntuación `+this.tomodatosdescarga.rango1+` en esta habilidad, lo que se relaciona con una `+this.tomodatosdescarga.calificacion1+` capacidad para enfocarse   en la información relevante mientras se omiten los   elementos distractores.`;
      doc.text(textoLargo5,260,650,{ align: 'justify', maxWidth: 465 } );

      doc.addImage('../../assets/informe3.png', 'png', (doc.internal.pageSize.width - 200) / 2, 750, 200, 200,"celular");

      doc.addPage();////PAGINA 3

      // // Agregar imagen en la parte superior de la página
      doc.addImage('../../assets/top.png', 'png', 0, 0, pageWidth, 100,"top");
      doc.addImage('../../assets/fondo3.png', 'png', x, y, 600, 500,"mid");
      doc.addImage('../../assets/bot.png', 'png', 0, pageHeight-100, 816, 100,"bot");


      doc.addImage(this.imgData2, 'PNG', 80, 200, 150, 150, "graficadona2");

      doc.setFont("helvetica","bold");
      doc.setFontSize(16);
      doc.text("Agudeza visual",260,210);
      doc.setFont("helvetica","normal");

      doc.setFontSize(12);
      const textoLargo6 = `Hace referencia a la capacidad para percibir estímulos visuales de manera oportuna y detectar aquellos que se consideran relevantes de los irrelevantes. El conductor `+nombreCompletoMayuscula.toUpperCase()+` obtuvo una puntuación `+this.tomodatosdescarga.rango2+` en esta habilidad. Lo que se relaciona con una `+this.tomodatosdescarga.calificacion2+` capacidad de identificar de manera oportuna obstáculos o elementos de riesgo en la vía.`;
      doc.text(textoLargo6,260,250,{ align: 'justify', maxWidth: 465 } );

      doc.setFont("helvetica","bold");
      doc.setFontSize(16);
      doc.text("FUNCIONES EJECUTIVAS",80,400);
      doc.setFont("helvetica","normal");

      doc.setFontSize(12);
      const textoLargo7 = `Las funciones ejecutivas obedecen a aquellas funciones psicológicas superiores, son las encargadas de monitorear y regular los demás procesos cognitivos. Gracias a estos procesos un conductor puede ajustar su conducta de acuerdo con las exigencias del entorno, es decir, regular su velocidad, abstenerse de realizar maniobras peligrosas y establecer estrategias efectivas para la solución de problemas en la vía.`;
      doc.text(textoLargo7,80,440,{ align: 'justify', maxWidth: 645 } );

      doc.addImage(this.imgData3, 'PNG', 80, 550, 150, 150, "graficadona3");

      doc.setFont("helvetica","bold");
      doc.setFontSize(16);
      doc.text("Velocidad de procesamiento",260,555);
      doc.setFont("helvetica","normal");

      doc.setFontSize(12);
      const textoLargo8 = `Hace referencia a la capacidad para percibir estímulos visuales de manera oportuna y detectar aquellos que se consideran relevantes de los irrelevantes. El conductor `+nombreCompletoMayuscula.toUpperCase()+` obtuvo una puntuación `+this.tomodatosdescarga.rango3+` en esta habilidad. Lo que se relaciona con una `+this.tomodatosdescarga.calificacion3+` capacidad de identificar de manera oportuna obstáculos o elementos de riesgo en la vía.`;
      doc.text(textoLargo8,260,595,{ align: 'justify', maxWidth: 465 } );

      doc.addImage(this.imgData4, 'PNG', 80, 750, 150, 150, "graficadona4");

      doc.setFont("helvetica","bold");
      doc.setFontSize(16);
      doc.text("Control inhibitorio",260,750);
      doc.setFont("helvetica","normal");

      doc.setFontSize(12);
      const textoLargo9 = `Se refiere a la capacidad para responder de manera oportuna frente a las situaciones, utilizando una conducta apropiada, de acuerdo con el contexto y eliminando aquella respuesta automática que no se ajusta a los requerimientos del entorno. El conductor `+nombreCompletoMayuscula.toUpperCase()+`, obtuvo una puntuación `+this.tomodatosdescarga.rango4+` en esta habilidad. Lo que se relaciona con una `+this.tomodatosdescarga.calificacion4+` capacidad para orientar su respuesta frente a cualquier estimulo en la vía`;
      doc.text(textoLargo9,260,790,{ align: 'justify', maxWidth: 465 } );

      doc.addPage();////PAGINA 4

      // // Agregar imagen en la parte superior de la página
      doc.addImage('../../assets/top.png', 'png', 0, 0, pageWidth, 100,"top");
      doc.addImage('../../assets/fondo3.png', 'png', x, y, 600, 500,"mid");
      doc.addImage('../../assets/bot.png', 'png', 0, pageHeight-100, 816, 100,"bot");

      doc.setFontSize(24);
      doc.text("Conclusiones",80,200);

      doc.setFontSize(12);
      const textoLargo10 = `Según los datos recogidos, el conductor `+nombreCompletoMayuscula.toUpperCase()+` obtuvo una puntuación general de `+this.tomodatosdescarga.calificaciontotal+`, lo que lo ubica en el rango `+this.tomodatosdescarga.rangototal+`, esto indica que se ajusta a los requerimientos del cargo, teniendo en cuenta su desempeño en los perfiles neurocognitivos y neuropsicológicos.`;
      doc.text(textoLargo10,80,260,{ align: 'justify', maxWidth: 645 } );

      doc.setFontSize(12);
      let textoLargo11:any;
      if (this.forgafica3.get('conclusiones').value == ""){
        textoLargo11 = `Se recomienda realizar seguimientos en aquellas áreas donde el rendimiento no alcanzó la mayor puntuación, de modo que sea posible entrenar cognitivamente estas áreas tales como la atención y la velocidad de procesamiento y sea posible potencializar aquellas que ya se encuentran en rangos altos.`;
      }else{
        textoLargo11 = this.forgafica3.get('conclusiones').value;
      }
      doc.text(textoLargo11,80,360,{ align: 'justify', maxWidth: 645 } );

      let estado = this.califiacionTotal(this.tomodatosdescarga.calificaciontotal);
 
      if (estado === "BUENA"){
        doc.addImage('../../assets/apto.png', 'png', (doc.internal.pageSize.width - 200) / 2, 460, 200, 80,"estado");
     
      }else if(estado === "ADECUADA"){
        doc.addImage('../../assets/aptobajorecomendacion.png', 'png', (doc.internal.pageSize.width - 266) / 2, 460, 266, 80,"estado");
   
      }else{
        doc.addImage('../../assets/noapto.png', 'png', (doc.internal.pageSize.width - 200) / 2, 460, 200, 70,"estado");

      }

      

      doc.addImage('../../assets/firma_quevedo_barrios.png', 'png', 120, 820, 200, 80,"firma");


      doc.setFontSize(12);
      doc.text("_________________________________________",80,880);
      doc.setFont("helvetica", "normal", "bold");
      doc.text("PSI. Daniela Fernanda Quevedo Barrios",80,900);
      doc.setFont("helvetica", "normal");
      doc.text("Magister en Neuropsicología",80,920);
      doc.text("ES&VA SOLUCIONES INTEGRALES S.A.S.",80,940);

      doc.save(this.tomodatosdescarga.fecha+' '+nombreCompletoMayuscula+'.pdf'); // CREA EL ARCHIVIO PDF

      this.isLoading = false;
      
    
    }, 4000);

    
  }
  

  


}
