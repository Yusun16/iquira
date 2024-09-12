import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [pendingAssignments, setPendingAssignments] = useState({});
  const [readyAssignments, setReadyAssignments] = useState({});
  const [delayedAssignments, setDelayedAssignments] = useState({});
  const [period, setPeriod] = useState('semana'); // Estado para el selector de periodo

  // Datos del gráfico de metas
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

  // Datos del gráfico de documentos procesados según el periodo
  const documentsData = {
    labels: period === 'semana'
      ? ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5']
      : period === 'quincena'
      ? ['Quincena 1', 'Quincena 2', 'Quincena 3', 'Quincena 4']
      : ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Documentos Procesados',
        data: period === 'mes'
          ? [120, 150, 170, 140, 160, 180, 170, 160, 150, 140, 130, 120] // Ejemplo de datos mensuales
          : [120, 150, 170, 140, 160], // Ejemplo de datos para semanas o quincenas
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
    ],
  };

  // Datos de los cumplimientos por mes
  const monthlyComplianceData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Cumplimientos',
        data: [30, 45, 20, 50, 60, 55, 40, 65, 70, 60, 50, 40], // Datos de cumplimientos por mes
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Datos para el gráfico de cumplimiento por mes
  const complianceByMonthData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Cumplimientos',
        data: [30, 45, 20, 50, 60, 55, 40, 65, 70, 60, 50, 40], // Datos de cumplimientos por mes
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Función para obtener el mes con más cumplimientos
  const getMonthWithMostCompliance = () => {
    const max = Math.max(...monthlyComplianceData.datasets[0].data);
    const index = monthlyComplianceData.datasets[0].data.indexOf(max);
    return { month: monthlyComplianceData.labels[index], value: max };
  };

  // Función para obtener el mes con menos cumplimientos
  const getMonthWithLeastCompliance = () => {
    const min = Math.min(...monthlyComplianceData.datasets[0].data);
    const index = monthlyComplianceData.datasets[0].data.indexOf(min);
    return { month: monthlyComplianceData.labels[index], value: min };
  };

  // Maneja el cambio en los campos de entrada
  const handleInputChange = (e, index, setter, currentState) => {
    const updatedAssignments = { ...currentState, [index]: e.target.value };
    setter(updatedAssignments);
  };

  // Maneja el envío de los datos del formulario
  const handleSubmit = (assignments, type) => {
    // Aquí puedes implementar la lógica para enviar los datos, por ejemplo, a una API
    console.log(`Enviando ${type}:`, assignments);
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <header className="bg-dark text-white p-3">
        <h1>Panel de Control</h1>
      </header>
      <main className="flex-grow-1 d-flex p-3 flex-column">
        <section id="overview" className="mb-4">
          <h2>Visión General</h2>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card p-3">
                <h3>Resumen de Metas</h3>
                <Line data={salesData} />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card p-3">
                <h3>Actividades Recientes</h3>
                <ul className="list-unstyled">
                  <li>Actividad 1</li>
                  <li>Actividad 2</li>
                  <li>Actividad 3</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id="documents" className="mb-4">
          <h2>Documentos Procesados</h2>
          <div className="card p-3">
            <h3>Vista de Documentos Procesados</h3>
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
        </section>
        <section id="tables" className="mb-4">
          <h2>Estado de los Documentos</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card p-3 bg-warning text-dark">
                <h3>Documentos Pendientes</h3>
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
                    <tr>
                      <td>Documento 1</td>
                      <td>Pendiente</td>
                      <td>
                        <input
                          type="text"
                          value={pendingAssignments[0] || ''}
                          onChange={(e) => handleInputChange(e, 0, setPendingAssignments, pendingAssignments)}
                          placeholder="Dependencia/Usuario"
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleSubmit({ [0]: pendingAssignments[0] }, 'Documentos Pendientes')}
                        >
                          Enviar
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>Documento 2</td>
                      <td>Pendiente</td>
                      <td>
                        <input
                          type="text"
                          value={pendingAssignments[1] || ''}
                          onChange={(e) => handleInputChange(e, 1, setPendingAssignments, pendingAssignments)}
                          placeholder="Dependencia/Usuario"
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleSubmit({ [1]: pendingAssignments[1] }, 'Documentos Pendientes')}
                        >
                          Enviar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card p-3 bg-success text-white">
                <h3>Documentos Listos</h3>
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
                    <tr>
                      <td>Documento 1</td>
                      <td>Listo</td>
                      <td>
                        <input
                          type="text"
                          value={readyAssignments[0] || ''}
                          onChange={(e) => handleInputChange(e, 0, setReadyAssignments, readyAssignments)}
                          placeholder="Dependencia/Usuario"
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleSubmit({ [0]: readyAssignments[0] }, 'Documentos Listos')}
                        >
                          Enviar
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>Documento 2</td>
                      <td>Listo</td>
                      <td>
                        <input
                          type="text"
                          value={readyAssignments[1] || ''}
                          onChange={(e) => handleInputChange(e, 1, setReadyAssignments, readyAssignments)}
                          placeholder="Dependencia/Usuario"
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleSubmit({ [1]: readyAssignments[1] }, 'Documentos Listos')}
                        >
                          Enviar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card p-3 bg-danger text-white">
                <h3>Documentos Atrasados</h3>
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
                    <tr>
                      <td>Documento 1</td>
                      <td>Atrasado</td>
                      <td>
                        <input
                          type="text"
                          value={delayedAssignments[0] || ''}
                          onChange={(e) => handleInputChange(e, 0, setDelayedAssignments, delayedAssignments)}
                          placeholder="Dependencia/Usuario"
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleSubmit({ [0]: delayedAssignments[0] }, 'Documentos Atrasados')}
                        >
                          Enviar
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>Documento 2</td>
                      <td>Atrasado</td>
                      <td>
                        <input
                          type="text"
                          value={delayedAssignments[1] || ''}
                          onChange={(e) => handleInputChange(e, 1, setDelayedAssignments, delayedAssignments)}
                          placeholder="Dependencia/Usuario"
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleSubmit({ [1]: delayedAssignments[1] }, 'Documentos Atrasados')}
                        >
                          Enviar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        <section id="compliance" className="mb-4">
          <h2>Cumplimiento por Mes</h2>
          <div className="card p-3">
            <h3>Gráfico de Cumplimiento</h3>
            <Bar data={complianceByMonthData} />
            <div className="mt-3">
              <h4>Mes con Más Cumplimientos</h4>
              <p>{getMonthWithMostCompliance().month} - {getMonthWithMostCompliance().value}</p>
              <h4>Mes con Menos Cumplimientos</h4>
              <p>{getMonthWithLeastCompliance().month} - {getMonthWithLeastCompliance().value}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
