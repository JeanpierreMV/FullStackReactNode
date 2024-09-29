import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// POST /mascotas - Registrar una nueva mascota
router.post('/registrar', async (req, res) => {
  try {
    const { codigo, nombre, genero, raza, tipoMascotaId, edad, peso } = req.body;

    // Validar que todos los campos sean obligatorios
    if (!codigo || !nombre || !genero || !raza || !tipoMascotaId || !edad || !peso) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Validar tipo de datos
    if (isNaN(edad) || isNaN(peso) || isNaN(tipoMascotaId)) {
      return res.status(400).json({ error: 'Edad, peso y tipoMascotaId deben ser numéricos.' });
    }

    // Validar que el cliente exista en la base de datos
    let cliente;
    try {
      cliente = await prisma.cliente.findUnique({
        where: { dni: codigo } // Asegúrate de que "dni" es el campo correcto en tu base de datos
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

    // Crear una nueva mascota
    const nuevaMascota = await prisma.mascota.create({
      data: {
        codigo, // Asegúrate de que esto sea un string
        nombre,
        genero,
        raza,
        edad: parseInt(edad),  // Convertir a número entero
        peso: parseFloat(peso),  // Convertir a número decimal
        tipoMascotaId: parseInt(tipoMascotaId),
        clienteId: cliente.id,  // ID del cliente
      },
    });

    return res.status(201).json(nuevaMascota);
  } catch (error) {
    console.error('Error registrando la mascota:', error);
    return res.status(500).json({ error: 'Error registrando la mascota.' });
  }
});

export default router;
