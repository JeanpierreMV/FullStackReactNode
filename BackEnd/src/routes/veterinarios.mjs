import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Obtener todos los veterinarios
router.get('/', async (req, res) => {
    try {
        const veterinarios = await prisma.cliente.findMany({
            where: {
                rolId: 1
            },select: {
                id: true ,
                nombre: true
                 
            }
        });
        res.json(veterinarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los veterinarios' });
    }
});

export default router;
