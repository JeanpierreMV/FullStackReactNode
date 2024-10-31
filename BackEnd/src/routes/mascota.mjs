import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// POST /mascotas - Registrar una nueva mascota
router.post('/registrar', async (req, res) => {
  try {
    const { codigo, nombre, genero, raza, tipoMascotaId, edad, peso, sizeId } = req.body;

   
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
        clienteId: cliente.id, 
        tipoMascotaId: parseInt(tipoMascotaId),
        sizeId: parseInt(sizeId),
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
              especie: true, 
              cliente: true, 
              size: true,
          },
      });
      res.json(mascotas);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener mascotas' });
  }
});


router.get('/:dni', async (req, res) => {
  const { dni } = req.params;

  try {
    
      const cliente = await prisma.cliente.findUnique({
          where: { dni: dni },
          include: { mascotas: true } 
      });

      if (!cliente) {
          return res.status(404).json({ error: 'Cliente no encontrado' });
      }

      res.json(cliente.mascotas);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener las mascotas del cliente' });
  }
});




router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { codigo, nombre, genero, raza, tipoMascotaId, edad, peso, sizeId } = req.body;

  try {
    // Crear el objeto de actualización solo con los campos definidos
    const data = {};
    if (codigo !== undefined) data.codigo = codigo;
    if (nombre !== undefined) data.nombre = nombre;
    if (genero !== undefined) data.genero = genero;
    if (raza !== undefined) data.raza = raza;
    if (tipoMascotaId !== undefined) data.tipoMascotaId = parseInt(tipoMascotaId);
    if (edad !== undefined) data.edad = parseInt(edad);
    if (peso !== undefined) data.peso = parseFloat(peso);
    if (sizeId !== undefined) data.sizeId = parseInt(sizeId);

    // Verificar si hay al menos un campo para actualizar
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar.' });
    }

    // Actualizar la mascota en la base de datos
    const mascotaActualizada = await prisma.mascota.update({
      where: { id: parseInt(id) },
      data,
    });

    return res.json(mascotaActualizada);
  } catch (error) {
    console.error('Error al actualizar la mascota:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Mascota no encontrada.' });
    }
    return res.status(500).json({ error: 'Error al actualizar la mascota.' });
  }
});



router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
   
    await prisma.mascota.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ message: 'Mascota eliminada exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar la mascota:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Mascota no encontrada.' });
    }
    return res.status(500).json({ error: 'Error al eliminar la mascota.' });
  }
});


export default router;
