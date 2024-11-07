import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import '../index.css';

export default function Ventanilla() {
  const [radicado, setRadicado] = useState(''); // Empieza vacío para cargar desde el backend
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fecha, setFecha] = useState('');
  const [telefono, setTelefono] = useState('');
  const [notificacion, setNotificacion] = useState('correo');
  const [dependencia, setDependencia] = useState('Gobierno'); // Nuevo estado para dependencia
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [documento, setDocumento] = useState(null);
  const [data, setData] = useState([]); 

  const API_URL = 'http://localhost:8080/api/ventanilla';

  // Obtener datos del backend y el siguiente número de radicado al cargar el componente
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

    const newEntry = {
      numeroRadicado: parseInt(radicado),
      nombre,
      apellido,
      fecha,
      telefono,
      notificacion,
      dependencia, // Añadido al objeto de entrada
      tipoDocumento,
      documento: documento ? documento.name : '',
    };

    try {
      await axios.post(`${API_URL}/formularios`, newEntry);
      setData((prevData) => [...prevData, newEntry]);

      // Obtener y establecer el siguiente radicado para el próximo formulario
      const radicadoResponse = await axios.get(`${API_URL}/siguiente-radicado`);
      setRadicado(radicadoResponse.data);

      // Limpiar los campos del formulario después de guardar
      setNombre('');
      setApellido('');
      setFecha('');
      setTelefono('');
      setNotificacion('correo');
      setDependencia('Gobierno'); // Reinicia dependencia
      setTipoDocumento('');
      setDocumento(null);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

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
          <input type="text" value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)} required className="input" />
        </div>

        <div className="field">
          <label>Documento a Subir</label>
          <input type="file" onChange={(e) => setDocumento(e.target.files[0])} required className="input" />
        </div>

        <button type="submit" className="button">Siguiente</button>
      </form>

      <div className="tableContainer">
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
}
