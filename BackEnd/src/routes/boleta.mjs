import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Ruta para obtener las mascotas de un cliente por DNI
router.get('/mascotas/:dni', async (req, res) => {
    const { dni } = req.params;
    try {
        const cliente = await prisma.cliente.findUnique({
            where: { dni },
            include: { mascotas: true },
        });
        if (cliente) {
            res.json(cliente.mascotas);
        } else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar mascotas' });
    }
});

// Ruta para obtener atenciones pendientes por mascotaId
router.get('/atenciones-pendientes/:mascotaId', async (req, res) => {
    const { mascotaId } = req.params;

    try {
        const atencionesPendientes = await prisma.atencion.findMany({
            where: {
                mascotaId: parseInt(mascotaId),
                consideraciones: "Pendiente" // Filtro por atenciones pendientes
            },
            include: {
                servicio: true, // Incluir detalles del servicio
                cliente: true,  // Incluir detalles del cliente
                mascota: true,  // Incluir detalles de la mascota
            }
        });

        if (atencionesPendientes.length > 0) {
            res.status(200).json(atencionesPendientes);
        } else {
            res.status(404).json({ message: 'No se encontraron atenciones pendientes para esta mascota' });
        }
    } catch (error) {
        console.error('Error al obtener atenciones pendientes:', error);
        res.status(500).json({ error: 'Error al obtener atenciones pendientes' });
    }
});

router.post('/generar-boleta', async (req, res) => {
    const { clienteId, mascotaId } = req.body;


    try {
        // 1. Obtener las atenciones pendientes de la mascota
        const atencionesPendientes = await prisma.atencion.findMany({
            where: {
                clienteId: parseInt(clienteId),
                mascotaId: parseInt(mascotaId),
                consideraciones: "Pendiente",
            },
            include: {
                servicio: true,
            },
        });

        console.log('Atenciones Pendientes:', atencionesPendientes);

        if (atencionesPendientes.length === 0) {
            return res.status(404).json({ message: 'No hay atenciones pendientes para esta mascota.' });
        }

        // 2. Calcular el total de la boleta
        const total = atencionesPendientes.reduce((sum, atencion) => sum + atencion.servicio.costo, 0);
        console.log('Total:', total);

        // 3. Crear la boleta
        const boleta = await prisma.boleta.create({
            data: {
                clienteId: parseInt(clienteId),
                total,
                codigo: `BOLETA-${Date.now()}`,  // Genera un código único
                detallesBoleta: {
                    create: atencionesPendientes.map((atencion) => ({
                        servicioId: atencion.servicioId,
                        descripcion: atencion.servicio.descripcion,
                        cantidad: 1,
                        costo: atencion.servicio.costo,
                    })),
                },
            },
        });

        console.log('Boleta Creada:', boleta);

        // 4. Actualizar las atenciones a "Pagado"
        await prisma.atencion.updateMany({
            where: {
                clienteId: parseInt(clienteId),
                mascotaId: parseInt(mascotaId),
                consideraciones: "Pendiente",
            },
            data: {
                consideraciones: "Pagado",
            },
        });

        res.status(201).json({ message: 'Boleta generada exitosamente', boleta });
    } catch (error) {
        console.error('Error al generar la boleta:', error.message); // Muestra el mensaje del error
        console.error('Stack:', error.stack); // Muestra la traza del error
        res.status(500).json({ error: error.message || 'Error al generar la boleta' });
    }
});

// Ruta para obtener facturación del día
router.get('/facturacion-dia', async (req, res) => {
    try {
        // Obtener la fecha actual con hora cero (00:00:00) y el final del día (23:59:59)
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
    
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
    
        // Consultar las boletas generadas en el día actual
        const facturacionDia = await prisma.boleta.findMany({
          where: {
            fecha: {
              gte: startOfDay, // Inicio del día
              lt: endOfDay,    // Fin del día
            },
          },
          include: {
            detallesBoleta: true, // Incluye detalles de las boletas
            cliente: true,        // Incluye datos del cliente
          },
        });
    
        if (facturacionDia.length > 0) {
          res.status(200).json(facturacionDia);
        } else {
          res.status(404).json({ message: 'No hay facturación generada hoy' });
        }
      } catch (error) {
        console.error('Error al obtener facturación del día:', error);
        res.status(500).json({ error: 'Error al obtener facturación del día' });
    }
});


export default router;
