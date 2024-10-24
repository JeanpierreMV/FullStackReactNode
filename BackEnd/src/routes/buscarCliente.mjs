import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /clientes/validar/:codigo - Validar que un cliente exista
router.get('/:codigo', async (req, res) => {
  const { codigo } = req.params;

  try {
    const cliente = await prisma.cliente.findUnique({
      where: { dni: codigo },
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente noo encontrado' });
    }

    return res.status(200).json(cliente); // Retorna el cliente si existe
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erroor al validar el cliente' });
  }
});

export default router;
