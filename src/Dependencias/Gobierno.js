import React, { useState } from 'react';
import Button from '@mui/material/Button';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Card, CardContent, Typography, Collapse, Divider } from '@mui/material';

export default function Gobierno() {
  const [state, setState] = useState({ right: false });
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotif, setAnchorElNotif] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [offcanvasContent, setOffcanvasContent] = useState("main"); // 'main', 'notifications', 'user'

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleUserMenuOpen = (event) => {
    setAnchorElUser(event.currentTarget);
    setOffcanvasContent("user");
  };

  const handleUserMenuClose = () => {
    setAnchorElUser(null);
    setOffcanvasContent("main");
  };

  const handleNotifMenuOpen = (event) => {
    setAnchorElNotif(event.currentTarget);
    setOffcanvasContent("notifications");
  };

  const handleNotifMenuClose = () => {
    setAnchorElNotif(null);
    setOffcanvasContent("main");
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const list = (anchor) => (
    <div
      role="presentation"
      onClick={(e) => e.stopPropagation()}
      style={{
        width: 250,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px 0' }}>
        <IconButton
          size="large"
          aria-label="show notifications"
          color="inherit"
          onClick={() => setOffcanvasContent("notifications")}
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          color="inherit"
          onClick={() => setOffcanvasContent("user")}
        >
          <AccountCircle />
        </IconButton>
      </div>

      <Divider style={{ marginBottom: '10px' }} />
      {renderOffcanvasContent()}
    </div>
  );

  const renderOffcanvasContent = () => {
    switch (offcanvasContent) {
      case 'notifications':
        return (
          <div>
            <Typography variant="h6" style={{ fontWeight: 'bold', paddingBottom: '10px' }}>Notificaciones</Typography>
            <Divider />
            <MenuItem onClick={() => setOffcanvasContent("main")}>Notificación 1</MenuItem>
            <MenuItem onClick={() => setOffcanvasContent("main")}>Notificación 2</MenuItem>
            <MenuItem onClick={() => setOffcanvasContent("main")}>Notificación 3</MenuItem>
          </div>
        );
      case 'user':
        return (
          <div>
            <Typography variant="h6" style={{ fontWeight: 'bold', paddingBottom: '10px' }}>Usuario</Typography>
            <Divider />
            <MenuItem onClick={() => setOffcanvasContent("main")}>Mi Perfil</MenuItem>
            <MenuItem onClick={() => {
              console.log("Cerrar sesión");
              setOffcanvasContent("main");
            }}>Cerrar sesión</MenuItem>
          </div>
        );
      default:
        return (
          <div>
            <Typography variant="h5" style={{ fontWeight: 'bold', paddingBottom: '10px' }}>Gobierno</Typography>
            <p>Contenido relacionado con el gobierno aquí.</p>
          </div>
        );
    }
  };

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            variant="contained"
            onClick={toggleDrawer(anchor, true)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '160px',
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
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}

      {/* Vista principal con la lista de documentos, centrada */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ width: '600px' }}>
          <Card
            style={{
              marginBottom: '10px',
              borderRadius: '15px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onClick={handleExpandClick}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <CardContent>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>Nombre del Documento</Typography>
              <Typography variant="body2" style={{ color: '#666' }}>Fecha Límite: 2023-12-31</Typography>
              <Typography variant="body2" style={{ color: '#666' }}>Estado: Pendiente</Typography>
            </CardContent>
          </Card>

          {/* Sección de detalles expandibles */}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Card
              style={{
                marginBottom: '10px',
                padding: '20px',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Número de Radicado: 123456</Typography>
              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Nombre del Usuario: Juan Pérez</Typography>
              <Button variant="contained" color="primary" style={{ marginTop: '10px', borderRadius: '50px' }}>
                Descargar Archivo
              </Button>
              <div style={{ marginTop: '10px' }}>
                <label htmlFor="uploadFile">Subir Archivo:</label>
                <input type="file" id="uploadFile" style={{ display: 'block', marginTop: '5px' }} />
              </div>
              <Button variant="contained" color="secondary" style={{ marginTop: '10px', borderRadius: '50px' }}>
                Guardar
              </Button>
            </Card>
          </Collapse>
        </div>
      </div>
    </div>
  );
}
