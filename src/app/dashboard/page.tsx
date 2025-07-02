"use client"
import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';

import { config } from '@/config';
import { Budget } from '@/components/dashboard/overview/budget';
import { LatestProducts } from '@/components/dashboard/overview/latest-products';
import { Sales } from '@/components/dashboard/overview/sales';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { Traffic } from '@/components/dashboard/overview/traffic';

//export const metadata = { title: `Vista General | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
   const datasets = {
    thisYear: [
      { name: 'Este año', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
    ],
    lastYear: [
      { name: 'Año pasado', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
    ],
  };

  const [data, setData] = React.useState(datasets.thisYear);
  const handleDatasetChange = (key: string) => {
    setData(datasets[key as keyof typeof datasets]);}
  return (
    <Grid container spacing={3}>
      <Grid
        size={{
          lg: 3,
          sm: 6,
          xs: 12,
        }}
      >
        <Budget diff={12} trend="up" sx={{ height: '100%' }} value="2400" />
      </Grid>
      <Grid
        size={{
          lg: 3,
          sm: 6,
          xs: 12,
        }}
      >
        <TotalCustomers diff={16} trend="up" sx={{ height: '100%' }} value="1800" />
      </Grid>
      <Grid
        size={{
          lg: 3,
          sm: 6,
          xs: 12,
        }}
      >
        <TasksProgress diff={8} trend="down" sx={{ height: '100%' }} value="600" />
      </Grid>
      <Grid
        size={{
          lg: 3,
          sm: 6,
          xs: 12,
        }}
      >
        <TotalProfit sx={{ height: '100%' }} value="$15k" />
      </Grid>
      <Grid
        size={{
          lg: 8,
          xs: 12,
        }}
      >
        <Sales onDatasetChange={handleDatasetChange}
          chartSeries={data}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid
        size={{
          lg: 4,
          md: 6,
          xs: 12,
        }}
      >
        <Traffic chartSeries={[63, 15, 22]} labels={['Laptop', 'Celulares', 'Nitendo Swich 2']} sx={{ height: '100%' }} />
      </Grid>
      <Grid
        size={{
          lg: 4,
          md: 6,
          xs: 12,
        }}
      >
      </Grid>
      <Grid
        size={{
          lg: 8,
          md: 12,
          xs: 12,
        }}
      >
      </Grid>
    </Grid>
  );
}
