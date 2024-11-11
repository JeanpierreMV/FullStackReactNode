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
        const clientes = await prisma.cliente.findMany({
            where: {
                rolId: 4,
            }
        });
        res.status(200).json(clientes);
    } catch (error) {
        res.status(400).json({ error: 'Error al obtener clientes' });
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, dni, celular, email, direccion, password, rol, distrito } = req.body;
  
    try {
      // Crear el objeto de actualización solo con los campos definidos
      const data = {};
      if (nombre !== undefined) data.nombre = nombre;
      if (apellido !== undefined) data.apellido = apellido;
      if (dni !== undefined) data.dni = dni;
      if (celular !== undefined) data.celular = celular;
      if (email !== undefined) data.email = email;
      if (direccion !== undefined) data.direccion = direccion;
      if (rol !== undefined) data.rol = { connect: { id: parseInt(rol, 10) } };
      if (distrito !== undefined) data.distrito = distrito;
  
      // Si se envía un password, cifrarlo antes de actualizar
      if (password !== undefined) {
        data.password = await bcrypt.hash(password, 10);
      }
  
      // Verificar si hay al menos un campo para actualizar
      if (Object.keys(data).length === 0) {
        return res.status(400).json({ error: 'Debe proporcionar al menos un campo para actualizar.' });
      }
  
      // Actualizar el cliente en la base de datos
      const clienteActualizado = await prisma.cliente.update({
        where: { id: parseInt(id) },
        data,
      });
  
      return res.json(clienteActualizado);
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Cliente no encontrado.' });
      }
      return res.status(500).json({ error: 'Error al actualizar el cliente.' });
    }
  });

  
export default router;