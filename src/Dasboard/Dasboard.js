import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [pendingAssignments, setPendingAssignments] = useState({});
  const [readyAssignments, setReadyAssignments] = useState({});
  const [delayedAssignments, setDelayedAssignments] = useState({});
  const [period, setPeriod] = useState('semana');

  // Datos de los gráficos
  const salesData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        label: 'Metas',
        data: [65, 59, 80, 81, 56],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const documentsData = {
    labels: period === 'semana' ? ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'] :
      period === 'quincena' ? ['Quincena 1', 'Quincena 2', 'Quincena 3', 'Quincena 4'] :
      ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Documentos Procesados',
        data: period === 'mes' ? [120, 150, 170, 140, 160, 180, 170, 160, 150, 140, 130, 120] : [120, 150, 170, 140, 160],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
    ],
  };

  const complianceData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Cumplimientos',
        data: [30, 45, 20, 50, 60, 55, 40, 65, 70, 60, 50, 40],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Funciones para obtener meses con más/menos cumplimientos
  const getMonthWithMostCompliance = () => {
    const max = Math.max(...complianceData.datasets[0].data);
    const index = complianceData.datasets[0].data.indexOf(max);
    return { month: complianceData.labels[index], value: max };
  };

  const getMonthWithLeastCompliance = () => {
    const min = Math.min(...complianceData.datasets[0].data);
    const index = complianceData.datasets[0].data.indexOf(min);
    return { month: complianceData.labels[index], value: min };
  };

  // Manejo de entradas y envío de datos
  const handleInputChange = (e, index, setter, currentState) => {
    const updatedAssignments = { ...currentState, [index]: e.target.value };
    setter(updatedAssignments);
  };

  const handleSubmit = (assignments, type) => {
    console.log(`Enviando ${type}:`, assignments);
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <header className="bg-dark text-white p-3">
        <h1 className="text-center">Panel de Control</h1>
      </header>
      <main className="flex-grow-1 d-flex p-3 flex-column">
        {/* Visión General */}
        <section id="overview" className="mb-4">
          <h2>Visión General</h2>
          <div className="row">
            <div className="col-md-12 mb-3">
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h5>Resumen de Metas</h5>
                </div>
                <div className="card-body">
                  <Line data={salesData} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Documentos Procesados */}
        <section id="documents" className="mb-4">
          <h2>Documentos Procesados</h2>
          <div className="card shadow-sm">
            <div className="card-header bg-info text-white">
              <h5>Vista de Documentos Procesados</h5>
            </div>
            <div className="card-body">
              <div className="form-group mb-3">
                <label htmlFor="period-selector">Seleccionar Periodo:</label>
                <select
                  id="period-selector"
                  className="form-control"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                >
                  <option value="semana">Semanal</option>
                  <option value="quincena">Quincenal</option>
                  <option value="mes">Mensual</option>
                </select>
              </div>
              <Line data={documentsData} />
            </div>
          </div>
        </section>

        {/* Estado de los Documentos */}
        <section id="tables" className="mb-4">
          <h2>Estado de los Documentos</h2>
          <div className="row">
            {/* Documentos Pendientes */}
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm bg-warning text-dark">
                <div className="card-header">
                  <h5>Documentos Pendientes</h5>
                </div>
                <Table
                  assignments={pendingAssignments}
                  setAssignments={setPendingAssignments}
                  status="Pendiente"
                  handleSubmit={handleSubmit}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>

            {/* Documentos Listos */}
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm bg-success text-white">
                <div className="card-header">
                  <h5>Documentos Listos</h5>
                </div>
                <Table
                  assignments={readyAssignments}
                  setAssignments={setReadyAssignments}
                  status="Listo"
                  handleSubmit={handleSubmit}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>

            {/* Documentos Atrasados */}
            <div className="col-md-4 mb-3">
              <div className="card shadow-sm bg-danger text-white">
                <div className="card-header">
                  <h5>Documentos Atrasados</h5>
                </div>
                <Table
                  assignments={delayedAssignments}
                  setAssignments={setDelayedAssignments}
                  status="Atrasado"
                  handleSubmit={handleSubmit}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Cumplimiento por Mes */}
        <section id="compliance" className="mb-4">
          <h2>Cumplimiento por Mes</h2>
          <div className="card shadow-sm">
            <div className="card-header bg-secondary text-white">
              <h5>Gráfico de Cumplimiento</h5>
            </div>
            <div className="card-body">
              <Bar data={complianceData} />
              <div className="mt-3">
                <h4>Mes con Más Cumplimientos</h4>
                <p>{getMonthWithMostCompliance().month} - {getMonthWithMostCompliance().value}</p>
                <h4>Mes con Menos Cumplimientos</h4>
                <p>{getMonthWithLeastCompliance().month} - {getMonthWithLeastCompliance().value}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const Table = ({ assignments, setAssignments, status, handleSubmit, handleInputChange }) => (
  <table className="table table-bordered table-striped">
    <thead>
      <tr>
        <th>Documento</th>
        <th>Estado</th>
        <th>Enviado a</th>
        <th>Acción</th>
      </tr>
    </thead>
    <tbody>
      {[0, 1].map((index) => (
        <tr key={index}>
          <td>Documento {index + 1}</td>
          <td>{status}</td>
          <td>
            <input
              type="text"
              value={assignments[index] || ''}
              onChange={(e) => handleInputChange(e, index, setAssignments, assignments)}
              placeholder="Dependencia/Usuario"
              className="form-control"
            />
          </td>
          <td>
            <button
              className="btn btn-primary"
              onClick={() => handleSubmit({ [index]: assignments[index] }, `Documentos ${status}`)}
            >
              Enviar
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Dashboard;
