import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import '../index.css';

export default function Ventanilla() {
  const [radicado, setRadicado] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fecha, setFecha] = useState(getFormattedDate());
  const [telefono, setTelefono] = useState('');
  const [notificacion, setNotificacion] = useState('correo');
  const [dependencia, setDependencia] = useState('Gobierno');
  const [tipoDocumento, setTipoDocumento] = useState('Peticiones');
  const [documento, setDocumento] = useState(null);
  const [data, setData] = useState([]); 

  const API_URL = 'http://localhost:8080/api/ventanilla';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/formularios`);
        setData(response.data);

        const radicadoResponse = await axios.get(`${API_URL}/siguiente-radicado`);
        setRadicado(radicadoResponse.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, []);

  const handleSiguiente = async (e) => {
    e.preventDefault();

    const formattedDateForBackend = formatDateForBackend(fecha);

    const newEntry = {
      numeroRadicado: parseInt(radicado),
      nombre,
      apellido,
      fecha: formattedDateForBackend,
      telefono,
      notificacion,
      dependencia,
      tipoDocumento,
      documento: documento ? documento.name : '',
    };

    try {
      await axios.post(`${API_URL}/formularios`, newEntry);
      setData((prevData) => [...prevData, newEntry]);

      const radicadoResponse = await axios.get(`${API_URL}/siguiente-radicado`);
      setRadicado(radicadoResponse.data);

      setNombre('');
      setApellido('');
      setTelefono('');
      setNotificacion('correo');
      setDependencia('Gobierno');
      setTipoDocumento('Peticiones');
      setDocumento(null);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedExtensions = /(\.pdf|\.docx|\.doc|\.xls|\.xlsx)$/i;

    if (file && allowedExtensions.test(file.name)) {
      setDocumento(file);
    } else {
      alert('Solo se permiten archivos PDF, Excel o Word.');
      e.target.value = null;
      setDocumento(null);
    }
  };

  function getFormattedDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function formatDateForBackend(date) {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`; // Formato yyyy-MM-dd
  }

  const columns = useMemo(() => [
    { accessorKey: 'numeroRadicado', header: 'Número de Radicado', size: 150 },
    { accessorKey: 'nombre', header: 'Nombre', size: 150 },
    { accessorKey: 'apellido', header: 'Apellido', size: 150 },
    { accessorKey: 'fecha', header: 'Fecha', size: 150 },
    { accessorKey: 'telefono', header: 'Teléfono', size: 150 },
    { accessorKey: 'notificacion', header: 'Notificación', size: 150 },
    { accessorKey: 'dependencia', header: 'Dependencia Asignada', size: 200 },
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
          <input type="text" value={fecha} readOnly className="input" />
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
          <label>Dependencia asignada</label>
          <select value={dependencia} onChange={(e) => setDependencia(e.target.value)} required className="input">
            <option value="Gobierno">Gobierno</option>
            <option value="Planeación">Planeación</option>
            <option value="Tesorería">Tesorería</option>
            <option value="Despacho">Despacho</option>
            <option value="Almacén">Almacén</option>
            <option value="Comisaría">Comisaría</option>
            <option value="direccion">Dirección Local de Salud</option>
          </select>
        </div>

        <div className="field">
          <label>Tipo de Documento o Petición</label>
          <select value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)} required className="input">
            <option value="Peticiones">Peticiones</option>
            <option value="Quejas">Quejas</option>
            <option value="Reclamos">Reclamos</option>
            <option value="Sugerencias">Sugerencias</option>
          </select>
        </div>

        <div className="field">
          <label>Documento a Subir</label>
          <input 
            type="file" 
            onChange={handleFileChange} 
            required 
            className="input" 
            accept=".pdf, .doc, .docx, .xls, .xlsx" 
          />
        </div>

        <button type="submit" className="button">Siguiente</button>
      </form>

      <div className="tableContainer">
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
}
