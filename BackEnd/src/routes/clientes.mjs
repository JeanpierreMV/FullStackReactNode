import express from 'express';
import {PrismaClient} from '@prisma/client'

const router = express.Router();
const prisma = new PrismaClient();

router.post('/registrar',async(req,res)=>{
    const {nombre, apellido, dni, celular, email,direccion}= req.body;


    try{
        const nuevoCliente = await prisma.cliente.create({
            data:{
                nombre,apellido,dni,celular,email,direccion,fechaRegistro: new Date(),
            },
        });

        res.status(201).json(nuevoCliente);
    }catch(error){
        res.status(400).json({error: 'error al registrar cliente'});
    }

});

export default router;