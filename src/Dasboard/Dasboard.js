import React, { useEffect, useState } from 'react';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [totals, setTotals] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL de la API principal
  const apiEndpoint = 'http://localhost:8080/api/ventanilla/formularios';

  // Llamada a la API
  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const response = await fetch(apiEndpoint);
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
    </Container>
  );
}

export default Dashboard;
