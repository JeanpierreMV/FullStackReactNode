import express from 'express';
import {PrismaClient} from '@prisma/client' 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;

router.post('/registrar', async (req, res) => {
    const { nombre, email, password, rol } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);  
  
      const nuevoEmpleado = await prisma.empleado.create({
        data: {
          nombre,
          email,
          password: hashedPassword,  
          rolId: rol,  
        },
      });
  
      res.status(201).json(nuevoEmpleado);
    } catch (error) {
      console.error('Error al registrar empleado:', error);
      res.status(500).json({ error: 'Error al registrar el empleado', details: error.message });
    }
  });
  

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await prisma.empleado.findUnique({ where: { email } });  // Cambié `usuario` por `empleado` si corresponde
      
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }
  
      const token = jwt.sign(
        { userId: user.id, email: user.email }, 
        SECRET_KEY, 
        { expiresIn: '1h' }
      );
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

export default router;