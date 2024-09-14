import express from 'express';
import clientesRoutes from './clientes.mjs';


const router = express.Router();


router.get('/', (req, res) => {
  res.send('Vista de inicio');
});


router.use('/clientes', clientesRoutes);


export default router;