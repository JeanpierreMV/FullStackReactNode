import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Endpoint para agregar un nuevo servicio
router.post('/agregarServicios', async (req, res) => {
  try {
    const { nombre, descripcion, costo, consideraciones } = req.body;

    // Crear el nuevo registro en la base de datos
    const newServicio = await prisma.servicio.create({
      data: {
        nombre,
        descripcion,
        costo,
        consideraciones,
      },
    });

    res.status(201).json(newServicio);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el servicio' });
  }
});


// Endpoint para obtener todos los servicios con costo modificado
router.get('/obtenerServicios', async (req, res) => {
  const { especie, tamano } = req.query;

  // Logs para verificar qué valores están siendo recibidos
  console.log('Especie:', especie, 'Tamaño:', tamano);

  if (!especie || !tamano) {
    console.log('Faltan parámetros requeridos');
    return res.status(400).json({ error: 'Especie y tamaño son requeridos' });
  }

  const multiplicadores = {
    perro: { pequeño: 1.1, mediano: 1.2, grande: 1.3 },
    gato: { pequeño: 1.05, mediano: 1.1, grande: 1.15 }
  };

  const multiplicadorEspecie = multiplicadores[especie];
  if (!multiplicadorEspecie) {
    console.log('Especie no válida:', especie);
    return res.status(400).json({ error: 'Especie no válida' });
  }

  const multiplicador = multiplicadorEspecie[tamano];
  if (!multiplicador) {
    console.log('Tamaño no válido:', tamano);
    return res.status(400).json({ error: 'Tamaño no válido' });
  }

  try {
    console.log('Obteniendo servicios de la base de datos...');
    const servicios = await prisma.servicio.findMany();

    if (!servicios.length) {
      console.log('No se encontraron servicios.');
      return res.status(404).json({ error: 'No se encontraron servicios.' });
    }

    const serviciosConCostoModificado = servicios.map(servicio => ({
      ...servicio,
      costo: servicio.costo * multiplicador
    }));

    console.log('Servicios obtenidos y modificados:', serviciosConCostoModificado);
    res.status(200).json(serviciosConCostoModificado);
  } catch (error) {
    console.error('Error al obtener los servicios:', error);
    res.status(500).json({ error: 'Error al obtener los servicios' });
  }
});


  export default router;