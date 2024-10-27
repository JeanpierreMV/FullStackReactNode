import express from 'express';
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/registrar', async (req, res) => {
    const { nombre, apellido, dni, celular, email, direccion , password, rol, distrito } = req.body;

    try {

        
        const hashedPassword = await bcrypt.hash(password, 10);  
        const nuevoCliente = await prisma.cliente.create({
            data: {
                nombre, apellido, dni, celular, email, direccion, fechaRegistro: new Date(), password: hashedPassword, rolId: rol, distrito
            },
        });

        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(400).json({ error: 'error al registrar cliente' });
    }

});



router.get('/', async (req, res) => {
    try {
        const clientes = await prisma.cliente.findMany();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(400).json({ error: 'Error al obtener clientes' });
    }
});

export default router;