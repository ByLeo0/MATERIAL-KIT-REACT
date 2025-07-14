// components/dashboard/overview/stock-alert.tsx

import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

type Props = {
  estado: string;
  mensaje: string;
  fechaQuiebre: string;
  diasEstimados: number;
};

export function StockAlert({ estado, mensaje, fechaQuiebre, diasEstimados }: Props) {
  const severity =
    estado === 'riesgo' ? 'error' :
    estado === 'advertencia' ? 'warning' :
    'success';

  return (
    <Alert severity={severity} variant="filled" sx={{ mb: 3 }}>
      <AlertTitle>{mensaje}</AlertTitle>
      Fecha de quiebre estimada: <strong>{fechaQuiebre}</strong><br />
      Días restantes: <strong>{diasEstimados}</strong>
    </Alert>
  );
}
