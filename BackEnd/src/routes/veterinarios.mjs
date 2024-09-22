import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Obtener todos los veterinarios
router.get('/', async (req, res) => {
    try {
        const veterinarios = await prisma.veterinario.findMany();
        res.json(veterinarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener veterinarios' });
    }
});

export default router;
