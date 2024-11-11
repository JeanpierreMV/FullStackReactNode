import express from 'express';
import clientesRoutes from './clientes.mjs';
import tiposMascotaRoutes from './tiposMascota.mjs';
import mascotasRoutes from './mascota.mjs';
import authRoutes from './auth.mjs';
import atencionesRoutes from './atencion.mjs';
import veterinariosRoutes from './veterinarios.mjs';
import serviciosRoutes from './servicios.mjs';
import boletaRoutes from './boleta.mjs';
//import validar from './buscarCliente.mjs'
import tamaño from './sizemascota.mjs';
import consultarS from './consultarS.mjs';
import busCliente from './buscarCliente.mjs';
import analisisRoutes from './analisis.mjs';
import historialMascotaRoutes from './historialMascota.mjs';
import analisisAtencionRoutes from './analisisA.mjs';
import buscarCita from './buscarCitas.mjs'

const router = express.Router();


router.get('/', (req, res) => {
  res.send('Vista de inicio');
});

router.use('/clientes', clientesRoutes);
router.use('/tipos-mascota', tiposMascotaRoutes);
router.use('/mascotas', mascotasRoutes); 
router.use('/auth', authRoutes);
router.use('/atenciones', atencionesRoutes);
router.use('/veterinarios', veterinariosRoutes);
router.use('/servicios', serviciosRoutes);
router.use('/boleta', boletaRoutes);
//router.use('/validar', validar);
router.use('/size-mascota', tamaño)
router.use('/consultar', consultarS)
router.use('/cliente', busCliente)
router.use('/analisis', analisisRoutes)
router.use('/historial-mascota', historialMascotaRoutes)
router.use('/analisis-atencion', analisisAtencionRoutes);
router.use('/buscar',buscarCita)

export default router;
