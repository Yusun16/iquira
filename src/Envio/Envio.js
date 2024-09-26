import React, { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

// Datos de ejemplo
const data = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Omaha',
    state: 'Nebraska',
  },
];

const Envio = () => {
  // Estado para almacenar las dependencias seleccionadas
  const [selectedDependencies, setSelectedDependencies] = useState({});

  // Definición de columnas
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name.firstName', // Acceso a datos anidados
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 150,
      },
      {
        accessorKey: 'state',
        header: 'State',
        size: 150,
      },
      {
        header: 'Acciones',
        cell: ({ row }) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <select
              value={selectedDependencies[row.original.name.firstName] || ''}
              onChange={(e) =>
                setSelectedDependencies((prev) => ({
                  ...prev,
                  [row.original.name.firstName]: e.target.value,
                }))
              }
              style={{ marginRight: '10px' }} // Espacio entre el select y el botón
            >
              <option value="">Selecciona...</option>
              <option value="dependencia1">Dependencia 1</option>
              <option value="dependencia2">Dependencia 2</option>
              <option value="dependencia3">Dependencia 3</option>
            </select>
            <button onClick={() => handleSubmit(row.original.name.firstName)}>
              Enviar
            </button>
          </div>
        ),
      },
    ],
    [selectedDependencies] // Dependencia de selectedDependencies para actualizar correctamente
  );

  const table = useMaterialReactTable({
    columns,
    data,
  });

  // Función para manejar el envío
  const handleSubmit = (firstName) => {
    const selectedDependency = selectedDependencies[firstName];
    console.log(`Enviando datos de ${firstName} con dependencia: ${selectedDependency}`);
  };

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default Envio;
