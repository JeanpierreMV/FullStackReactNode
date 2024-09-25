import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Obtener todos los servicios
router.get('/', async (req, res) => {
    try {
        const servicios = await prisma.servicio.findMany();
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener servicios' });
    }
});

export default router;
