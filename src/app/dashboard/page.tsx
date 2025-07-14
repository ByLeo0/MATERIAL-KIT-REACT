
"use client"


import Grid from '@mui/material/Grid';
import React from 'react';
import { Budget } from '@/components/dashboard/overview/budget';
import { LatestProducts } from '@/components/dashboard/overview/latest-products';
import { Sales } from '@/components/dashboard/overview/sales';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { Traffic } from '@/components/dashboard/overview/traffic';
// Make sure the file exists at src/components/dashboard/overview/stock-alert.tsx
// If it does not, create it or update the import path to the correct location.
// Example fallback if the file does not exist:
import { StockAlert } from '@/components/dashboard/overview/StockAlert';
// Or create the file at the expected path if missing.

export default function Page(): React.JSX.Element {
  const datasets = {
    thisYear: [{ name: 'Este año', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] }],
    lastYear: [{ name: 'Año pasado', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] }],
  };

  const [data, setData] = React.useState(datasets.thisYear);
  const [alerta, setAlerta] = React.useState<null | {
    estado: string;
    mensaje: string;
    fechaQuiebre: string;
    diasEstimados: number;
  }>(null);

  const handleDatasetChange = (key: string) => {
    setData(datasets[key as keyof typeof datasets]);
  };

  React.useEffect(() => {
    fetch('http://localhost:8080/api/alerta') // URL de tu backend Java
      .then(res => res.json())
      .then(setAlerta)
      .catch(console.error);
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {alerta && <StockAlert {...alerta} />}
      </Grid>

      <Grid item lg={3} sm={6} xs={12}>
        <Budget diff={12} trend="up" sx={{ height: '100%' }} value="1200" />
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <TotalCustomers diff={16} trend="up" sx={{ height: '100%' }} value="1020" />
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <TasksProgress diff={8} trend="down" sx={{ height: '100%' }} value="180" />
      </Grid>
      <Grid item lg={3} sm={6} xs={12}>
        <TotalProfit sx={{ height: '100%' }} value="$15k" />
      </Grid>
      <Grid item lg={8} xs={12}>
        <Sales onDatasetChange={handleDatasetChange} chartSeries={data} sx={{ height: '100%' }} />
      </Grid>
      <Grid item lg={4} md={6} xs={12}>
        <Traffic chartSeries={[63, 15, 22]} labels={['Laptop', 'Celulares', 'Nitendo Swich 2']} sx={{ height: '100%' }} />
      </Grid>
    </Grid>
  );
}
