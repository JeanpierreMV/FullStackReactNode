// // frontend/src/components/CitaList.js
// import React, { useState, useEffect } from 'react';
// import CitaDetailModal from './CitaDetailModal';
// import '../styles/CitaList.css';

// const CitaList = () => {
//   const [citas, setCitas] = useState([]);
//   const [selectedCita, setSelectedCita] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     // Aquí llamarás a la API para obtener la lista de citas.
//     const fetchCitas = async () => {
//       const response = await fetch('URL_DE_LA_API');
//       const data = await response.json();
//       setCitas(data);
//     };

//     fetchCitas();
//   }, []);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredCitas = citas.filter((cita) =>
//     cita.nombreMascota.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="cita-list-container">
//       {/* Leyenda informativa */}
//       <div className="leyenda-atenciones">
//         <h3>Atenciones</h3>
//         <ul>
//           <li><span style={{ color: 'orange' }}>Pendiente de Pago:</span> La cita está programada pero aún no se ha realizado el pago.</li>
//           <li><span style={{ color: 'purple' }}>Pendiente de Cita:</span> La cita ha sido pagada pero aún no ha ocurrido.</li>
//           <li><span style={{ color: 'green' }}>Atendiendo:</span> La cita está actualmente en curso.</li>
//           <li><span style={{ color: 'red' }}>Terminado:</span> La cita ha concluido y el paciente ha sido atendido.</li>
//         </ul>
//       </div>

//       {/* Campo de búsqueda */}
//       <input
//         type="text"
//         placeholder="Buscar Mascota"
//         value={searchTerm}
//         onChange={handleSearchChange}
//         className="search-bar"
//       />

//       {/* Lista de citas */}
//       <table className="cita-table">
//         <thead>
//           <tr>
//             <th>Dueño</th>
//             <th>Mascota</th>
//             <th>Edad</th>
//             <th>Servicio</th>
//             <th>Estado</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredCitas.map((cita) => (
//             <tr key={cita.id}>
//               <td>{cita.dueno}</td>
//               <td>{cita.nombreMascota}</td>
//               <td>{cita.edad}</td>
//               <td>{cita.servicio}</td>
//               <td>{cita.estado}</td>
//               <td>
//                 <button onClick={() => setSelectedCita(cita)}>Ver Detalle</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Modal para el detalle de la cita */}
//       {selectedCita && (
//         <CitaDetailModal cita={selectedCita} onClose={() => setSelectedCita(null)} />
//       )}
//     </div>
//   );
// };

// export default CitaList;
