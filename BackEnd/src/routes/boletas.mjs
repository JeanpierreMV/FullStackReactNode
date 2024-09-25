import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Función para generar un código único
const generarCodigoBoleta = () => {
  return `BOL-${Math.floor(Math.random() * 1000000)}`; // Genera un código aleatorio
};

// Ruta para generar una nueva boleta
router.post('/generar', async (req, res) => {
  const { clienteId, servicios } = req.body;

  try {
    // Calcula el total de la boleta
    const detallesBoleta = await Promise.all(
      servicios.map(async (servicio) => {
        const detalle = {
          servicioId: servicio.id,
          cantidad: servicio.cantidad,
          costo: servicio.costo,
          descripcion: servicio.descripcion || '', // Agrega una descripción vacía si no se proporciona
        };
        return detalle;
      })
    );

    const total = detallesBoleta.reduce((sum, detalle) => sum + detalle.costo * detalle.cantidad, 0);

    // Genera un código para la boleta
    const codigo = generarCodigoBoleta();

    // Crea la nueva boleta
    const nuevaBoleta = await prisma.boleta.create({
      data: {
        clienteId: parseInt(clienteId, 10), // Asegúrate de convertir a número
        total,
        codigo, // Agrega el código generado
        detallesBoleta: {
          create: detallesBoleta,
        },
      },
    });

    res.status(201).json(nuevaBoleta);
  } catch (error) {
    console.error('Error al generar la boleta:', error);
    res.status(400).json({ error: 'Error al generar la boleta' });
  }
});

export default router;
