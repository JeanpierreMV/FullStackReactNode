import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const client = new PrismaClient();


router.get('/citas/:id',async(req,res)=>{
    const {id}= req.params;
    try{
        const citas = await client.atencion.findMany({
            where: {
                veterinarioId: parseInt(id),
            },
            include: {
                cliente: true,
                mascota: true,
                servicio: true,
            },
        });

        if (citas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron citas para este cliente.' });
        }

        res.json(citas);
    } catch (error) {
        console.error("Error al obtener las citas:", error);
        res.status(500).json({ error: 'Error al obtener las citas del cliente' });
    }
})

export default router;