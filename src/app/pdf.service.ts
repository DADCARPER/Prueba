import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import  autoTable  from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  imprimir(){
    
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'letter',
      hotfixes: ["px_scaling"]
    });
    
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
      ["Nombre y apellidos :", { content: "Juan david carvajal pernett", colSpan: 3 }],
      ["Identifiación :", "1098634517", "Edad :", "32 años"],
      ["Escolaridad :", "Ingeniero", "Lateralidad :", "Derecho"],
      ["Antecedentes médicos :", "Tabaquismo como patología adictiva crónica", "Accidentes reportados :", "1"]
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
      startY: 180, // Posicion en la hoja
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

    
    // Imprimir automáticamente y abrir en una nueva ventana
    //doc.autoPrint({variant: 'non-conform'});
    //doc.output('datauristring', { filename: 'comprobante.pdf' });
    //doc.output('dataurlnewwindow', { filename: '123.pdf' });
    doc.save('hola.pdf');

  }

}
