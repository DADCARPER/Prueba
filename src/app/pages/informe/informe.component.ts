import { Component, ElementRef, ViewChild, QueryList, AfterViewInit } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import html2canvas from 'html2canvas';
import { display } from 'html2canvas/dist/types/css/property-descriptors/display';
import { jsPDF } from 'jspdf';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements AfterViewInit {

    //@ViewChild('content', { static: false }) content!: ElementRef;
    //@ViewChildren('div') contentElements!: QueryList<ElementRef>;
    @ViewChild('modal3') miModalRef!: ElementRef;

    constructor(private modalService: NgbModal) {}

    vergrafica1:boolean = true;
    data: any;
    options: any;

    captureElement: any;

    ngOnInit() {
        
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        
        //window.print(); // Llama al modo de impresión al inicializar el componente

        this.data = {
            labels: ['Atención\n sostenida', 'Atención alternante', 'Tiempo de respuesta', 'Control Inhibitorio'],
            datasets: [
                
                {
                    label: 'Promedio',
                    backgroundColor: 'rgba(179,181,198,0.1)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: [72, 53, 63, 90]
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
                    data: [66, 50, 90, 81]
                }
            ]
        };
        
        this.options = {

            legend: {
                labels: {
                  fontColor: 'rgb(243, 181, 85)',
                  fontSize: 50
                }
            },
            borderWidth: 0, // Establece el ancho del borde a 0 para eliminarlo
            plugins: {
                legend: {
                    display: true, // Oculta la leyenda
                    fontColor: 'rgb(243, 181, 85)',
                  fontSize: 50
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
                        display: true,
                        
                        color: '#3b82f6',
                        font: {
                            size: 32
                        }
                        //fontColor: ''
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

    ngAfterViewInit() {
        // Aquí puedes acceder con seguridad a 'content' después de que se haya inicializado
        console.log(document.querySelector("#miElemento2"));
    }

    generatePDF() {
        //console.log(document.getElementById('content'));
        //if (this.miModalRef.nativeElement.querySelector('#miElemento')) {
          html2canvas(this.captureElement).then((canvas: HTMLCanvasElement) => {
            const imgData = canvas.toDataURL('image/png');
            const doc = new jsPDF();
            const imgProps= doc.getImageProperties(imgData);
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            doc.save('archivo.pdf');
          });
        //} else {
        //  console.error('El elemento "content" no está disponible.');
        //}
      }

      openModal(content:any) {
        this.modalService.open(content, { size: 'lg' }); // Abre el modal con el contenido de la gráfica
        console.log(document.querySelector("#miElemento2"));
        this.captureElement = document.querySelector("#miElemento2");
        
      }

}
