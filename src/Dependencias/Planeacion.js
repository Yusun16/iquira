import React, { useState, useEffect } from 'react';
import {
  Button,
  SwipeableDrawer,
  MenuItem,
  Collapse,
  Card,
  CardContent,
  Typography,
  TextField,
  CircularProgress,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import axios from 'axios';
import { AuthenticationContext, SessionContext } from '@toolpad/core/AppProvider';
import { Account } from '@toolpad/core/Account';
import { styled } from '@mui/system';

const demoSession = {
  user: {
    name: 'Bharat Kashyap',
    email: 'bharatkashyap@outlook.com',
    image: 'https://avatars.githubusercontent.com/u/19550456',
  },
};

const CustomFormControl = styled(FormControl)({
  marginBottom: '20px',
  width: '100%',
  '.MuiInputBase-root': {
    borderRadius: '25px',
    backgroundColor: '#f5f5f5',
    padding: '0 15px',
  },
  '.MuiInputLabel-root': {
    color: '#666',
  },
  '.MuiInputBase-input': {
    padding: '10px 15px',
  },
  '.Mui-focused .MuiInputLabel-root': {
    color: '#1976d2',
  },
  '.MuiSelect-icon': {
    color: '#1976d2',
  },
});

const CustomTextField = styled(TextField)({
  marginBottom: '20px',
  width: '100%',
  '.MuiInputBase-root': {
    borderRadius: '25px',
    backgroundColor: '#f5f5f5',
    padding: '0 15px',
  },
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: '#ccc',
  },
  '.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#1976d2',
  },
});

export default function Tesoreria() {
  const [state, setState] = useState({ right: false });
  const [expanded, setExpanded] = useState(false);
  const [formularios, setFormularios] = useState([]);
  const [archivo, setArchivo] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(demoSession);
  const [filtroDias, setFiltroDias] = useState('Todos');
  const [filtroNombre, setFiltroNombre] = useState('');

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(demoSession);
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  const FORMULARIOS_API = 'http://localhost:8080/api/planeacion/formularios';
  const DOCUMENTOS_API = 'http://localhost:8080/api/planeacion/documento';

  useEffect(() => {
    const fetchFormularios = async () => {
      try {
        setLoading(true);
        const response = await axios.get(FORMULARIOS_API);
        setFormularios(response.data.filter((item) => item.dependencia === 'Planeación'));
      } catch (error) {
        console.error('Error al obtener formularios:', error);
        setError('No se pudieron cargar los datos. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchFormularios();
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleExpandClick = (id) => {
    setSelectedId(id === selectedId ? null : id);
    setExpanded(!expanded);
  };

  const calcularDiasRestantes = (fechaLimite) => {
    const hoy = new Date();
    const fecha = new Date(fechaLimite);
    const diferencia = Math.ceil((fecha - hoy) / (1000 * 60 * 60 * 24));
    return diferencia > 0 ? diferencia : 0;
  };

  const handleFileUpload = async (id) => {
    if (!archivo) {
      alert('Por favor selecciona un archivo para subir.');
      return;
    }

    const formData = new FormData();
    formData.append('archivo', archivo);

    try {
      await axios.post(`${DOCUMENTOS_API}/${id}/subir`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Archivo subido exitosamente.');
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      alert('Hubo un problema al subir el archivo.');
    }
  };

  const filtrarFormularios = () => {
    let filtrados = formularios;

    if (filtroDias === 'Menor a 5 días') {
      filtrados = filtrados.filter((form) => calcularDiasRestantes(form.fechaLimite) < 5);
    } else if (filtroDias === 'Mayor o igual a 5 días') {
      filtrados = filtrados.filter((form) => calcularDiasRestantes(form.fechaLimite) >= 5);
    }

    if (filtroNombre.trim() !== '') {
      filtrados = filtrados.filter((form) =>
        `${form.nombre} ${form.apellido}`.toLowerCase().includes(filtroNombre.toLowerCase())
      );
    }

    return filtrados;
  };

  const formulariosFiltrados = filtrarFormularios();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'red' }}>
        <Typography variant="h6">{error}</Typography>
      </div>
    );
  }

  return (
    <AuthenticationContext.Provider value={authentication}>
      <SessionContext.Provider value={session}>
        <div>
          {['right'].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button
                variant="contained"
                onClick={toggleDrawer(anchor, true)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '162px',
                  zIndex: 1000,
                  borderRadius: '50px',
                  padding: '10px 20px',
                }}
              >
                <i className="fa-solid fa-bars" style={{ fontSize: '20px' }}></i>
              </Button>
              <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
              >
                <div style={{ width: '250px', padding: '20px' }}>
                  <Typography variant="h6" style={{ marginBottom: '10px' }}>
                    Menú de Planeacion
                  </Typography>
                  <CustomFormControl>
                    <Typography variant="body1" style={{ marginBottom: '10px', color: '#666' }}>
                      Filtrar por días restantes
                    </Typography>
                    <Select
                      value={filtroDias}
                      onChange={(e) => setFiltroDias(e.target.value)}
                    >
                      <MenuItem value="Todos">Todos</MenuItem>
                      <MenuItem value="Menor a 5 días">Menor a 5 días</MenuItem>
                      <MenuItem value="Mayor o igual a 5 días">Mayor o igual a 5 días</MenuItem>
                    </Select>
                  </CustomFormControl>
                  <Typography variant="body1" style={{ marginBottom: '10px', color: '#666' }}>
                    Filtrar por nombre del usuario
                  </Typography>
                  <CustomTextField
                    placeholder="Escribe el nombre"
                    value={filtroNombre}
                    onChange={(e) => setFiltroNombre(e.target.value)}
                  />
                  <Account />
                </div>
              </SwipeableDrawer>
            </React.Fragment>
          ))}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '800px' }}>
              {formulariosFiltrados.map((formulario) => (
                <React.Fragment key={formulario.numeroRadicado}>
                  <Card
                    style={{
                      marginBottom: '10px',
                      borderRadius: '15px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                    }}
                    onClick={() => handleExpandClick(formulario.numeroRadicado)}
                  >
                    <CardContent>
                      <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                        Documento: {formulario.documento ? formulario.documento.split('/').pop() : 'No disponible'}
                      </Typography>
                      <Typography variant="body2" style={{ color: '#666' }}>
                        Fecha Límite: {formulario.fechaLimite}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          color: calcularDiasRestantes(formulario.fechaLimite) > 4
                            ? 'green'
                            : calcularDiasRestantes(formulario.fechaLimite) >= 2
                              ? 'orange'
                              : 'red',
                        }}
                      >
                        Estado: {calcularDiasRestantes(formulario.fechaLimite) > 0
                          ? `Pendiente (${calcularDiasRestantes(formulario.fechaLimite)} días restantes)`
                          : 'Vencido'}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Collapse in={selectedId === formulario.numeroRadicado} timeout="auto" unmountOnExit>
                    <Card
                      style={{
                        marginBottom: '10px',
                        padding: '20px',
                        borderRadius: '15px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Número de Radicado: {formulario.numeroRadicado}
                      </Typography>
                      <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Usuario: {`${formulario.nombre} ${formulario.apellido}`}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '10px', borderRadius: '50px' }}
                        onClick={() => {
                          if (formulario.documento) {
                            window.open(formulario.documento, '_blank');
                          } else {
                            alert('No hay un archivo asociado.');
                          }
                        }}
                      >
                        Descargar
                      </Button>
                      <div style={{ marginTop: '10px' }}>
                        <label htmlFor={`uploadFile-${formulario.numeroRadicado}`}>
                          Subir Archivo:
                        </label>
                        <input
                          type="file"
                          id={`uploadFile-${formulario.numeroRadicado}`}
                          style={{ display: 'block', marginTop: '5px' }}
                          onChange={(e) => setArchivo(e.target.files[0])}
                        />
                      </div>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginTop: '10px', borderRadius: '50px' }}
                        onClick={() => handleFileUpload(formulario.numeroRadicado)}
                      >
                        Guardar
                      </Button>
                    </Card>
                  </Collapse>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </SessionContext.Provider>
    </AuthenticationContext.Provider>
  );
}
