import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PetsIcon from '@mui/icons-material/Pets';
import '../styles/BuscarHistorialMascota.css';
import { obtenerHistorialMascota, obtenerMascotasPorDni, HistorialMascotaPDF } from '../services/api';
import mascotaImage from '../assets/mascota.jpg';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';


export default function BuscarHistorialMascota() {
  const [searchTerm, setSearchTerm] = useState('');
  const [historial, setHistorial] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [listaMascotas, setListaMascotas] = useState([]);
  const [selectedMascota, setSelectedMascota] = useState('');

  const [showDetalleModal, setShowDetalleModal] = useState(false);
  const [detallesMascota, setDetallesMascota] = useState(null);

  // Buscar mascotas por DNI
  const buscarMascotasPorDni = async () => {
    if (!searchTerm.trim()) return;

    try {
      const response = await obtenerMascotasPorDni(searchTerm);
      setListaMascotas(response);
      setShowModal(true);
    } catch (error) {
      console.error('Error al obtener mascotas por DNI:', error);
    }
  };

  // Obtener historial de la mascota seleccionada
  const cargarHistorialMascota = async () => {
    if (!selectedMascota) return;

    try {
      const response = await obtenerHistorialMascota(selectedMascota);
      setHistorial(response);
      setShowModal(false);
    } catch (error) {
      console.error('Error al obtener el historial de la mascota:', error);
    }
  };

  const descargarPDF = async ()=>{
    if (!selectedMascota) return;

    try {
      // Llamada a la API que devuelve el PDF en base64
      const response = await HistorialMascotaPDF(selectedMascota);
      
      // Verificar que la respuesta tenga la propiedad pdfBase64
      if (response.pdfBase64) {
        const base64Data = response.pdfBase64;
        
        // Convertir el base64 en un Blob de tipo PDF
        const byteArray = atob(base64Data); // Decodificar base64
        const uint8Array = new Uint8Array(byteArray.length);
  
        for (let i = 0; i < byteArray.length; i++) {
          uint8Array[i] = byteArray.charCodeAt(i);
        }
  
        const blob = new Blob([uint8Array], { type: 'application/pdf' });
        
        // Crear un enlace de descarga para el archivo PDF
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Historial_Mascota_${selectedMascota}.pdf`; // Nombre del archivo a descargar
        link.click();
        URL.revokeObjectURL(url); // Liberar memoria
      } else {
        console.error('No se recibió un PDF en base64 en la respuesta.');
      }
    } catch (error) {
      console.error('Error al descargar el historial en PDF:', error);
    }
  };

  const obtenerTipoMascota = (id) => {
    return id === 1 ? 'Perro' : id === 2 ? 'Gato' : 'Desconocido';
  };

  const handleOpenDetalle = (entry) => {
    setDetallesMascota({
      dueño: `${entry.cliente.nombre} ${entry.cliente.apellido}`,
      nombreMascota: entry.mascota.nombre,
      edad: entry.mascota.edad || 'No especificada',
      especie: obtenerTipoMascota(entry.mascota.tipoMascotaId),
      tamaño: entry.mascota.size.nombre || 'No especificado',
      servicio: entry.servicio.nombre || 'Consulta general',
      descripcion: entry.descripcion || 'Sin descripción',
      costo: entry.servicio.costo || 'No especificado',
      requiereAnalisis: entry.requiereAnalisis ? 'Sí' : 'No',
    });
    setShowDetalleModal(true);
  };

  const handleCloseDetalle = () => {
    setShowDetalleModal(false);
    setDetallesMascota(null);
  };

  return (
    <div className="buscar-historial-page">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Buscar Historial de Mascota</h1>
      </header>
     
      <h4 className="custom-h4" style={{ color: 'orange' }}>* Pendiente de Pago</h4>
      <h4 className="custom-h4" style={{ color: 'purple' }}>* Pendiente de Cita</h4>
      <h4 className="custom-h4" style={{ color: 'green' }}>* Atendiendo</h4>
      <h4 className="custom-h4" style={{ color: 'red' }}>* Terminado</h4>
      <div className="search-container">
        <label htmlFor="search">Buscar por DNI</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="text"
            id="search"
            placeholder="Ingrese el DNI del dueño..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "#343a40" }}
            startIcon={<SearchIcon />}
            onClick={buscarMascotasPorDni}
          >
            Buscar
          </Button>
        </div>
      </div>
      <div className="data-container">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={descargarPDF}
              disabled={!selectedMascota}
            >
              Descargar PDF
            </Button>
        </div>
        <table>
          <thead>
            <tr>
              <th>DNI</th>
              <th>Dueño</th>
              <th>Nombre - Mascota</th>
              <th>Veterinario</th>
              <th>Fecha-Cita</th>
              <th>Estado</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((entry, index) => (
              <tr key={index}>
                <td>{entry.cliente.dni}</td>
                <td>{`${entry.cliente.nombre} ${entry.cliente.apellido}`}</td>
                <td>{entry.mascota.nombre}</td>
                <td>{entry.veterinarioNombre}</td>
                <td>{new Date(entry.fechaCita).toLocaleDateString()}</td>
                <td>{entry.consideraciones}</td>
                <td>
                <button 
                    className="view-button" 
                    onClick={() => handleOpenDetalle(entry)}
                  >
                    👁️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para seleccionar mascota */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          <PetsIcon fontSize="large" style={{ marginRight: '10px', color: '#2196f3' }} />
          Seleccione la Mascota
        </DialogTitle>
        <br />
        <DialogContent>
          {listaMascotas.length > 0 ? (
            <FormControl fullWidth>
              <InputLabel id="select-mascota-label">Seleccione una Mascota</InputLabel>
              <Select
                labelId="select-mascota-label"
                id="select-mascota"
                value={selectedMascota}
                onChange={(e) => setSelectedMascota(e.target.value)}
                label="Seleccione una Mascota"
              >
                {listaMascotas.map((mascota) => (
                  <MenuItem key={mascota.id} value={mascota.id}>
                    {mascota.nombre} - {obtenerTipoMascota(mascota.tipoMascotaId)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <Typography>No se encontraron mascotas.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)} variant="outlined" color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={cargarHistorialMascota}
            variant="contained"
            color="primary"
            disabled={!selectedMascota}
          >
            Cargar Historial
          </Button>
        </DialogActions>
      </Dialog>

      {/* Nuevo Modal de Detalle de Mascota */}
     {/* Modal de Detalle de Mascota */}
     <Dialog
        open={showDetalleModal}
        onClose={handleCloseDetalle}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: '8px',
            maxHeight: '90vh'
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, borderBottom: '1px solid rgba(0, 0, 0, 0.12)', pb: 2 }}>
          <PetsIcon sx={{ color: '#2196f3' }} />
          <Typography variant="h6">Detalle del Historial</Typography>
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {/* Columna izquierda: Imagen */}
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 2, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img
                  src={mascotaImage}
                  alt="Mascota"
                  style={{
                    width: '100%',
                    maxWidth: '300px',
                    height: 'auto',
                    borderRadius: '8px'
                  }}
                />
              </Paper>
            </Grid>

            {/* Columna derecha: Información */}
            <Grid item xs={12} md={8}>
              <Paper elevation={0} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Información de la Mascota
                </Typography>

                <Grid container spacing={2}>
                  {detallesMascota && Object.entries(detallesMascota).map(([key, value], index) => {
                    if (key === 'requiereAnalisis') return null;
                    return (
                      <Grid item xs={12} sm={6} key={index}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </Typography>
                        <Typography variant="body1">
                          {value}
                        </Typography>
                      </Grid>
                    );
                  })}
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>
                  Información Adicional
                </Typography>
                <Typography variant="body1">
                  Requiere análisis adicional: {detallesMascota?.requiereAnalisis}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
          <Button onClick={handleCloseDetalle} variant="contained" sx={{ minWidth: '120px' }}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
