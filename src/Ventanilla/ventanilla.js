import React, { useState, useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import '../index.css'; // Asegúrate de que este archivo existe

// Función para generar datos aleatorios
const generateRandomData = (numEntries) => {
  const randomData = [];
  for (let i = 0; i < numEntries; i++) {
    randomData.push({
      radicado: 1000 + i, // Número de radicado
      nombre: `Nombre${i + 1}`,
      apellido: `Apellido${i + 1}`,
      fecha: new Date().toISOString().split('T')[0], // Fecha actual
      telefono: `555-${Math.floor(1000 + Math.random() * 9000)}`, // Número de teléfono aleatorio
      notificacion: ['correo', 'whatsapp', 'llamada'][Math.floor(Math.random() * 3)], // Notificación aleatoria
      tipoDocumento: `Tipo ${i + 1}`,
      documento: `documento${i + 1}.pdf`, // Nombre de documento simulado
    });
  }
  return randomData;
};

export default function Ventanilla() {
  const [radicado, setRadicado] = useState(1011); // Ajusta el inicio para evitar conflictos
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fecha, setFecha] = useState('');
  const [telefono, setTelefono] = useState('');
  const [notificacion, setNotificacion] = useState('correo');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [documento, setDocumento] = useState(null);
  
  // Inicializa con 10 entradas aleatorias
  const [data, setData] = useState(generateRandomData(10));

  const handleSiguiente = (e) => {
    e.preventDefault();
    const newEntry = {
      radicado,
      nombre,
      apellido,
      fecha,
      telefono,
      notificacion,
      tipoDocumento,
      documento: documento ? documento.name : '', // Solo muestra el nombre del archivo
    };

    // Agrega la nueva entrada a los datos
    setData((prevData) => [...prevData, newEntry]);
    
    console.log(newEntry); // Muestra la nueva entrada en la consola
    setRadicado(radicado + 1); // Incrementa el número de radicado
    // Reinicia los campos del formulario
    setNombre('');
    setApellido('');
    setFecha('');
    setTelefono('');
    setNotificacion('correo');
    setTipoDocumento('');
    setDocumento(null);
  };

  const columns = useMemo(() => [
    { accessorKey: 'radicado', header: 'Número de Radicado', size: 150 },
    { accessorKey: 'nombre', header: 'Nombre', size: 150 },
    { accessorKey: 'apellido', header: 'Apellido', size: 150 },
    { accessorKey: 'fecha', header: 'Fecha', size: 150 },
    { accessorKey: 'telefono', header: 'Teléfono', size: 150 },
    { accessorKey: 'notificacion', header: 'Notificación', size: 150 },
    { accessorKey: 'tipoDocumento', header: 'Tipo de Documento o Petición', size: 200 },
    { accessorKey: 'documento', header: 'Documento Subido', size: 200 },
  ], []);

  const table = useMaterialReactTable({
    columns,
    data,
  });

  return (
    <div className="container">
      <form className="form" onSubmit={handleSiguiente}>
        <h2>Formulario de Ventanilla</h2>
        
        <div className="field">
          <label>Número de Radicado</label>
          <input type="text" value={radicado} readOnly className="input" />
        </div>
        
        <div className="field">
          <label>Nombre</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="input" />
        </div>

        <div className="field">
          <label>Apellido</label>
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required className="input" />
        </div>

        <div className="field">
          <label>Fecha</label>
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required className="input" />
        </div>

        <div className="field">
          <label>Teléfono</label>
          <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} required className="input" />
        </div>

        <div className="field">
          <label>¿Dónde desea ser notificado?</label>
          <select value={notificacion} onChange={(e) => setNotificacion(e.target.value)} required className="input">
            <option value="correo">Correo</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="llamada">Llamada</option>
          </select>
        </div>

        <div className="field">
          <label>Tipo de Documento o Petición</label>
          <input type="text" value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)} required className="input" />
        </div>

        <div className="field">
          <label>Documento a Subir</label>
          <input type="file" onChange={(e) => setDocumento(e.target.files[0])} required className="input" />
        </div>

        <button type="submit" className="button">Siguiente</button>
      </form>

      {/* Tabla añadida debajo del formulario */}
      <div className="tableContainer">
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
}
