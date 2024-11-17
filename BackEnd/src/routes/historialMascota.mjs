import express from 'express';
import { PrismaClient } from '@prisma/client';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';


const router = express.Router();
const prisma = new PrismaClient();

router.get('/:mascotaId', async (req, res) => {
  const { mascotaId } = req.params;

  try {
    const atenciones = await prisma.atencion.findMany({
      where: { mascotaId: parseInt(mascotaId) },
      include: {
        servicio: true, // Incluye datos relacionados del servicio
        cliente: true,  
        mascota: {   // Relación con la tabla mascota
          include: {
            size: true,  // Relación con la tabla size a través de mascota
          },
        },
      },
    });

    // Enriquecer datos con el nombre del veterinario
    const atencionesConVeterinario = await Promise.all(
      atenciones.map(async (atencion) => {
        const veterinario = await prisma.cliente.findUnique({
          where: { id: atencion.veterinarioId }, // Busca el veterinario usando veterinarioId
          select: { nombre: true }, // Solo necesitamos el nombre
        });
        return {
          ...atencion,
          veterinarioNombre: veterinario ? veterinario.nombre : null,
        };
      })
    );

    res.json(atencionesConVeterinario);
  } catch (error) {
    console.error('Error al obtener el historial de la mascota:', error);
    res.status(500).json({ error: 'Error al obtener el historial' });
  }
});




router.get('/historial-pdf/:mascotaId', async (req, res) => {
  const { mascotaId } = req.params;

  try {
    // Obtener datos de la mascota y su historial
    const atencionesNT = await prisma.atencion.findMany({
      where: { mascotaId: parseInt(mascotaId) },
      include: {
        servicio: true,
        cliente: true,
        mascota: {
          include: {
            size: true,
            especie: true,
          },
        },        
      },
    });

    const atenciones = await Promise.all(
      atencionesNT.map(async (atencion) => {
        const veterinario = await prisma.cliente.findUnique({
          where: { id: atencion.veterinarioId },
          select: { nombre: true },
        });
        return {
          ...atencion,
          veterinarioNombre: veterinario ? veterinario.nombre : null,
        };
      })
    );

    if (atenciones.length === 0) {
      return res.status(404).json({ error: 'No se encontró historial para esta mascota.' });
    }

    // Crear el PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Agregar logo
    const logoPath = './src/utils/koala.png';
    const imageBytes = fs.readFileSync(logoPath);
    const logoImage = await pdfDoc.embedPng(imageBytes);
    page.drawImage(logoImage, { x: 50, y: 700, width: 80, height: 80 });

    // Título
    page.drawText("Historial Médico Veterinario", {
      x: 150,
      y: 730,
      size: 24,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    // Función helper para dibujar líneas horizontales
    const drawHorizontalLine = (y) => {
      page.drawLine({
        start: { x: 50, y },
        end: { x: 550, y },
        thickness: 1,
        color: rgb(0.7, 0.7, 0.7),
      });
    };

    // Función helper para dibujar líneas verticales
    const drawVerticalLine = (x, startY, endY) => {
      page.drawLine({
        start: { x, y: startY },
        end: { x, y: endY },
        thickness: 1,
        color: rgb(0.7, 0.7, 0.7),
      });
    };

    // Tabla de información de la mascota
    let yPos = 650;
    
    // Encabezado de la tabla de mascota
    page.drawRectangle({
      x: 50,
      y: yPos,
      width: 500,
      height: 25,
      color: rgb(0.9, 0.9, 0.9),
    });
    
    page.drawText("INFORMACIÓN DE LA MASCOTA", {
      x: 60,
      y: yPos + 8,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    const mascota = atenciones[0].mascota;
    const mascotaData = [
      ['Nombre', mascota.nombre],
      ['Especie', mascota.especie.nombre],
      ['Raza', mascota.raza],
      ['Edad', mascota.edad],
      ['Peso', `${mascota.peso} kg`],
      ['Género', mascota.genero],
      ['Fecha de Registro', new Date(mascota.fechaRegistro).toLocaleDateString()],
    ];

    yPos -= 25;
    const rowHeight = 25;

    // Dibujar tabla de mascota
    mascotaData.forEach((row, index) => {
      const currentY = yPos - (index * rowHeight);
      
      // Líneas horizontales
      drawHorizontalLine(currentY);
      
      // Líneas verticales
      drawVerticalLine(50, currentY, currentY + rowHeight);
      drawVerticalLine(200, currentY, currentY + rowHeight);
      drawVerticalLine(550, currentY, currentY + rowHeight);
      
      // Texto
      page.drawText(row[0], {
        x: 60,
        y: currentY + 8,
        size: 12,
        font: boldFont,
      });
      
      page.drawText(row[1].toString(), {
        x: 210,
        y: currentY + 8,
        size: 12,
        font: font,
      });
    });
    
    // Línea final de la tabla
    drawHorizontalLine(yPos - (mascotaData.length * rowHeight));

    // Tabla de información del dueño
    yPos = yPos - (mascotaData.length * rowHeight) - 40;
    
    // Encabezado de la tabla del dueño
    page.drawRectangle({
      x: 50,
      y: yPos,
      width: 500,
      height: 25,
      color: rgb(0.9, 0.9, 0.9),
    });

    page.drawText("INFORMACIÓN DEL DUEÑO", {
      x: 60,
      y: yPos + 8,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    const dueño = atenciones[0].cliente;
    const dueñoData = [
      ['Nombre', `${dueño.nombre} ${dueño.apellido}`],
      ['Dirección', dueño.direccion],
      ['Distrito', dueño.distrito],
      ['Teléfono', dueño.celular],
      ['Email', dueño.email],
    ];

    yPos -= 25;

    // Dibujar tabla del dueño
    dueñoData.forEach((row, index) => {
      const currentY = yPos - (index * rowHeight);
      
      // Líneas horizontales
      drawHorizontalLine(currentY);
      
      // Líneas verticales
      drawVerticalLine(50, currentY, currentY + rowHeight);
      drawVerticalLine(200, currentY, currentY + rowHeight);
      drawVerticalLine(550, currentY, currentY + rowHeight);
      
      // Texto
      page.drawText(row[0], {
        x: 60,
        y: currentY + 8,
        size: 12,
        font: boldFont,
      });
      
      page.drawText(row[1], {
        x: 210,
        y: currentY + 8,
        size: 12,
        font: font,
      });
    });

    // Línea final de la tabla
    drawHorizontalLine(yPos - (dueñoData.length * rowHeight));

    // Tabla de historial de atenciones
    yPos = yPos - (dueñoData.length * rowHeight) - 40;
    
    // Encabezado de la tabla de historial
    page.drawRectangle({
      x: 50,
      y: yPos,
      width: 500,
      height: 25,
      color: rgb(0.9, 0.9, 0.9),
    });

    page.drawText("HISTORIAL DE ATENCIONES", {
      x: 60,
      y: yPos + 8,
      size: 14,
      font: boldFont,
      color: rgb(0, 0, 0),
    });

    yPos -= 25;

    // Encabezados de columnas
    const headers = ['Fecha', 'Servicio', 'Veterinario', 'Costo'];
    const columnWidths = [100, 200, 150, 50];
    let xPos = 50;

    headers.forEach((header, index) => {
      page.drawText(header, {
        x: xPos + 10,
        y: yPos + 8,
        size: 12,
        font: boldFont,
      });
      xPos += columnWidths[index];
    });

    yPos -= rowHeight;

    // Dibujar tabla de historial
    for (const atencion of atenciones) {
      // Verificar si necesitamos una nueva página
      if (yPos < 50) {
        const newPage = pdfDoc.addPage([600, 800]);
        page = newPage;
        yPos = 750;
      }

      const fecha = new Date(atencion.fechaCita).toLocaleDateString();
      const servicio = atencion.servicio.nombre;
      const veterinario = atencion.veterinarioNombre || "No asignado";
      const costo = `$${atencion.servicio.costo}`;

      // Líneas horizontales
      drawHorizontalLine(yPos);
      drawHorizontalLine(yPos + rowHeight);

      // Líneas verticales y contenido
      xPos = 50;
      [fecha, servicio, veterinario, costo].forEach((texto, index) => {
        drawVerticalLine(xPos, yPos, yPos + rowHeight);
        page.drawText(texto, {
          x: xPos + 10,
          y: yPos + 8,
          size: 11,
          font: font,
        });
        xPos += columnWidths[index];
      });
      drawVerticalLine(xPos, yPos, yPos + rowHeight);

      yPos -= rowHeight;
    }

    // Línea final de la tabla
    drawHorizontalLine(yPos);

    // Serializar el PDF
    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

    res.json({ pdfBase64 });
  } catch (error) {
    console.error('Error al generar el PDF:', error);
    res.status(500).json({ error: 'Error al generar el PDF' });
  }
});


  
  export default router;