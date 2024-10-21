import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// POST /mascotas - Registrar una nueva mascota
router.post('/registrar', async (req, res) => {
  try {
    const { codigo, nombre, genero, raza, tipoMascotaId, edad, peso } = req.body;

   
    if (!codigo || !nombre || !genero || !raza || !tipoMascotaId || !edad || !peso) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
    
    let cliente;
    try {
      cliente = await prisma.cliente.findUnique({
        where: { dni: codigo } 
      });

      // Verificar que el cliente tenga un ID
      if (!cliente || !cliente.id) {
        return res.status(404).json({ error: 'Cliente no encontrado o sin ID.' });
      }
      
      console.log('Datos recibidos:', req.body);
      console.log('Cliente:', cliente);
      
    } catch (error) {
      console.error('Error al buscar el cliente:', error);
      return res.status(500).json({ error: 'Error al validar el cliente.' });
    }

    
    const nuevaMascota = await prisma.mascota.create({
      data: {
        codigo, 
        nombre,
        genero,
        raza,
        edad: parseInt(edad),  
        peso: parseFloat(peso),  
        tipoMascotaId: parseInt(tipoMascotaId),
        clienteId: cliente.id, 
      },
    });

    return res.status(201).json(nuevaMascota);
  } catch (error) {
    console.error('Error registrando la mascota:', error);
    return res.status(500).json({ error: 'Error registrando la mascota.' });
  }
});


router.get('/', async (req, res) => {
  try {
      const mascotas = await prisma.mascota.findMany({
          include: {
              especie: true, // Incluir tipo de mascota si es necesario
              cliente: true, // Incluir cliente si es necesario
          },
      });
      res.json(mascotas);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener mascotas' });
  }
});

export default router;
