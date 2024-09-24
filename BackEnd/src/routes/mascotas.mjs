import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Ruta para registrar una nueva mascota
router.post('/registrar', async (req, res) => {
  const { nombre, genero, raza, tipoMascotaId, edad, peso, clienteId } = req.body;

  // Imprime los datos recibidos para verificar si todo llega correctamente
  console.log(req.body);

  try {
    const nuevaMascota = await prisma.mascota.create({
      data: {
        nombre,
        genero,
        raza,
        tipoMascotaId,
        edad,
        peso,
        clienteId,
        codigo: 'M-' + new Date().getTime(), 
        fechaRegistro: new Date(),
      },
    });

    res.status(201).json(nuevaMascota);
  } catch (error) {
    console.error('Error al registrar la mascota:', error);
    res.status(400).json({ error: 'Error al registrar la mascota' });
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
