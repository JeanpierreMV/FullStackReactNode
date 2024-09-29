import express from 'express';
import clientesRoutes from './clientes.mjs';
import tiposMascotaRoutes from './tiposMascota.mjs';
import mascotasRoutes from './mascota.mjs';
import authRoutes from './auth.mjs';
import atencionRoutes from './atencion.mjs';
import veterinariosRoutes from './veterinarios.mjs';; // Asegúrate de tener esto
import serviciosRoutes from './servicios.mjs';
import boletasRoutes from './boletas.mjs';
import validar from './buscarCliente.mjs'

const router = express.Router();


router.get('/', (req, res) => {
  res.send('Vista de inicio');
});

router.use('/clientes', clientesRoutes);
router.use('/tipos-mascota', tiposMascotaRoutes);
router.use('/mascotas', mascotasRoutes); 
router.use('/empleados', authRoutes);
router.use('/atenciones', atencionRoutes);
router.use('/veterinarios', veterinariosRoutes);
router.use('/servicios', serviciosRoutes);
router.use('/boletas', boletasRoutes);
router.use('/validar', validar);

export default router;
