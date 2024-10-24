import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();


router.post('/agregar', async (req, res) => {
    try {
      const { nombre, descripcion, costo, consideraciones } = req.body;
  
     
      if (!nombre || !descripcion || !consideraciones || typeof costo !== 'number') {
        return res.status(400).json({ error: 'Datos inválidos' });
      }
  
      const newServicio = await prisma.servicio.create({
        data: {
          nombre,
          descripcion,
          costo,
          consideraciones,
        },
      });
  
      res.status(201).json(newServicio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el servicio' });
    }
  });


  router.get('/servicios', async (req, res) => {
    try {
      const { tamaño, especie } = req.query;
  
    
  
      
      const servicios = await prisma.servicio.findMany();
  
      const serviciosFiltrados = servicios.map(servicio => {
        let costoModificado = servicio.costo;
  
        
        if (tamaño === 'grande') {
          costoModificado *= 1.2;
        } else if (tamaño === 'mediano') {
          costoModificado *= 1.1;
        } else if (tamaño === 'pequeño') {
          costoModificado *= 1.05;
        }
  
        if (especie === 'perro') {
          costoModificado *= 1.15;
        } else if (especie === 'gato') {
          costoModificado *= 1.1;
        }
  
        return { ...servicio, costo: costoModificado };
      });
  
      res.status(200).json(serviciosFiltrados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los servicios' });
    }
  });
  
  

  router.get('/servicios/buscar', async (req, res) => {
    try {
      const { nombre, tamaño, especie } = req.query;
  
      if (!nombre || !tamaño || !especie) {
        return res.status(400).json({ error: 'Debe proporcionar nombre, tamaño y especie' });
      }
  
     
      const servicios = await prisma.servicio.findMany({
        where: {
          nombre: {
            contains: nombre, 
            mode: 'insensitive' 
          }
        }
      });
  
      if (!servicios.length) {
        return res.status(404).json({ error: 'No se encontraron servicios con ese nombre' });
      }
  
      const serviciosFiltrados = servicios.map(servicio => {
        let costoModificado = servicio.costo;
  
       
        if (tamaño === 'grande') {
          costoModificado *= 1.2;
        } else if (tamaño === 'mediano') {
          costoModificado *= 1.1;
        } else if (tamaño === 'pequeño') {
          costoModificado *= 1.05;
        }
  
       
        if (especie === 'perro') {
          costoModificado *= 1.15;
        } else if (especie === 'gato') {
          costoModificado *= 1.1;
        }
  
        return { ...servicio, costo: costoModificado };
      });
  
      res.status(200).json(serviciosFiltrados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al buscar los servicios' });
    }
  });
  


  export default router;