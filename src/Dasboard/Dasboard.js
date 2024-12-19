import React, { useEffect, useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [totals, setTotals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState([]);

  // URL de la API principal
  const apiEndpoint = 'http://localhost:8080/api/ventanilla/formularios';
  const API_URL = 'http://localhost:8080/iquira/admin/listar-usuarios';

  // Llamada a la API
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchTotals = async () => {

      try {
        const response = await fetch(apiEndpoint, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });
        const data = await response.json();

        // Agrupar por dependencia y contar documentos
        const groupedData = data.reduce((acc, item) => {
          const dependencia = item.dependencia;
          acc[dependencia] = (acc[dependencia] || 0) + 1;
          return acc;
        }, {});

        // Convertir el objeto agrupado en un arreglo
        const groupedArray = Object.keys(groupedData).map((dependencia) => ({
          dependencia,
          total: groupedData[dependencia],
        }));

        setTotals(groupedArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchTotals();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        const respuesta = await axios.get(`${API_URL}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setInfo(respuesta.data);

      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData();
  }, []);


  // Datos dinámicos del gráfico
  const chartData = totals.length > 0
    ? {
      labels: totals.map((item) => item.dependencia), // Dependencias como etiquetas
      datasets: [
        {
          label: 'Total de Documentos',
          data: totals.map((item) => item.total), // Totales por dependencia
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    }
    : null;

  const roleMapping = {
    'ROLE_ADMIN': 'Administrador Principal',
    'ROLE_ALMACEN': 'Almacen',
    'ROLE_COMISARIA': 'Comisaria',
    'ROLE_DESPACHO': 'Despacho',
    'ROLE_GOBIERNO': 'Gobierno',
    'ROLE_PLANEACION': 'Planeacion',
    'ROLE_SALUD': 'Salud',
    'ROLE_TESORERIA': 'Tesoreria',
    'ROLE_USER': 'Usuario',
    'ROLE_VENTANILLA': 'Ventanilla',
  };

  const columns = useMemo(() => [
    { accessorKey: 'nombre', header: 'Nombre', size: 150 },
    { accessorKey: 'apellido', header: 'Apellido', size: 150 },
    { accessorKey: 'fecha', header: 'Fecha', size: 150 },
    { accessorKey: 'username', header: 'Correo', size: 200 },
    {
      accessorKey: 'roles',
      header: 'Roles',
      size: 200,
      Cell: ({ row }) => {
        return row.original.roles
          .map(role => roleMapping[role.name] || role.name)
          .join(', ');
      }
    }
  ], []);

  return (
    <Container maxWidth="lg" style={{ paddingTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Panel de Control
      </Typography>

      <Grid container spacing={3}>
        {/* Tabla de Totales por Dependencia */}
        <Grid item xs={6}>
          <Card style={{ marginBottom: '10%' }}>
            <CardHeader title="Totales por Dependencia - Tabla" style={{ backgroundColor: '#f57c00', color: 'white' }} />
            <CardContent>
              {loading ? (
                <CircularProgress />
              ) : totals.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Dependencia</strong></TableCell>
                        <TableCell><strong>Total de Documentos</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {totals.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.dependencia}</TableCell>
                          <TableCell>{item.total}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body1" color="error">
                  No hay datos disponibles para mostrar.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Gráfico de Totales por Dependencia */}
        <Grid item xs={6}>
          <Card style={{ marginBottom: '10%' }}>
            <CardHeader title="Totales por Dependencia - Gráfico" style={{ backgroundColor: '#3f51b5', color: 'white' }} />
            <CardContent>
              {loading ? (
                <CircularProgress />
              ) : chartData ? (
                <Bar data={chartData} />
              ) : (
                <Typography variant="body1" color="error">
                  No hay datos disponibles para mostrar.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <MaterialReactTable
        columns={columns}
        data={info}
      />
    </Container>
  );
}

export default Dashboard;
