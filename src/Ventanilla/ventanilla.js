import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../index.css';
import CerrarSesion from '../Inicio/CerrarSesion';

export default function Ventanilla() {
  const [radicado, setRadicado] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fecha] = useState(getFormattedDate());
  const [fechaLimite, setFechaLimite] = useState('');
  const [telefono, setTelefono] = useState('');
  const [notificacion, setNotificacion] = useState('correo');
  const [dependencia, setDependencia] = useState('Gobierno');
  const [tipoDocumento, setTipoDocumento] = useState('Peticiones');
  const [documento, setDocumento] = useState(null);
  const [data, setData] = useState([]);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const API_URL = 'http://localhost:8080/api/ventanilla';

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/formularios`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setData(response.data);

        const radicadoResponse = await axios.get(`${API_URL}/siguiente-radicado`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setRadicado(radicadoResponse.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData();
  }, []);

  const handleSiguiente = async (e) => {
    e.preventDefault();

    const formattedDateForBackend = formatDateForBackend(fecha);
    const formattedFechaLimite = fechaLimite || null;

    if (!formattedFechaLimite) {
      showModal('Error', 'Por favor selecciona una fecha límite válida.');
      return;
    }

    const newEntry = {
      numeroRadicado: parseInt(radicado),
      nombre,
      apellido,
      fecha: formattedDateForBackend,
      fechaLimite: formattedFechaLimite,
      telefono,
      notificacion,
      dependencia,
      tipoDocumento,
    };

    const token = localStorage.getItem('token');
    try {
      const formularioResponse = await axios.post(`${API_URL}/formularios`, newEntry, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const savedEntry = formularioResponse.data;

      if (documento) {
        const formData = new FormData();
        formData.append('archivo', documento);

        try {
          const archivoResponse = await axios.post(
            `${API_URL}/formularios/${savedEntry.id}/documento`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },

            }
          );
          savedEntry.documento = archivoResponse.data;
        } catch (error) {
          console.error('Error al subir el archivo:', error);
        }
      }

      setData((prevData) => [...prevData, savedEntry]);

      const radicadoResponse = await axios.get(`${API_URL}/siguiente-radicado`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setRadicado(radicadoResponse.data);
      resetForm();
      showModal('Éxito', 'Formulario guardado con éxito.');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      showModal('Error', 'Error al guardar el formulario. Por favor, inténtalo de nuevo.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedExtensions = /(\.pdf|\.docx|\.doc|\.xls|\.xlsx)$/i;

    if (file && allowedExtensions.test(file.name)) {
      setDocumento(file);
    } else {
      showModal('Error', 'Solo se permiten archivos PDF, Excel o Word.');
      e.target.value = null;
      setDocumento(null);
    }
  };

  const resetForm = () => {
    setNombre('');
    setApellido('');
    setTelefono('');
    setNotificacion('correo');
    setDependencia('Gobierno');
    setTipoDocumento('Peticiones');
    setFechaLimite('');
    setDocumento(null);
  };

  const showModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  function getFormattedDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }

  function formatDateForBackend(date) {
    if (date.includes('-')) return date; // Si ya está en formato yyyy-MM-dd
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }

  const columns = useMemo(() => [
    { accessorKey: 'numeroRadicado', header: 'Número de Radicado', size: 150 },
    { accessorKey: 'nombre', header: 'Nombre', size: 150 },
    { accessorKey: 'apellido', header: 'Apellido', size: 150 },
    { accessorKey: 'fecha', header: 'Fecha', size: 150 },
    { accessorKey: 'fechaLimite', header: 'Fecha Límite', size: 150 },
    { accessorKey: 'telefono', header: 'Teléfono', size: 150 },
    { accessorKey: 'notificacion', header: 'Notificación', size: 150 },
    { accessorKey: 'dependencia', header: 'Dependencia Asignada', size: 200 },
    { accessorKey: 'tipoDocumento', header: 'Tipo de Documento o Petición', size: 200 },
    {
      accessorKey: 'documento',
      header: 'Documento Subido',
      size: 200,
      Cell: ({ cell }) =>
        cell.getValue() ? (
          <a href={cell.getValue()} target="_blank" rel="noopener noreferrer">
            Descargar Documento
          </a>
        ) : (
          'No disponible'
        ),
    },
  ], []);

  const table = useMaterialReactTable({
    columns,
    data,
  });

  return (
    <div className="container">
      <CerrarSesion />
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
          <label>Fecha Límite</label>
          <input
            type="date"
            value={fechaLimite}
            onChange={(e) => setFechaLimite(e.target.value)}
            required
            className="input"
            min={new Date().toISOString().split('T')[0]} // Configura la fecha mínima como hoy
          />
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

        <button type="submit" className="button">Guardar</button>
      </form>

      <div className="tableContainer">
        <MaterialReactTable table={table} />
      </div>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6">
            {modalTitle}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {modalMessage}
          </Typography>
          <Button onClick={closeModal} variant="contained" sx={{ mt: 2 }}>
            Cerrar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
