'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function Notifications(): React.JSX.Element {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="Manejar las notificaciones" title="Notificaciones" />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid
              size={{
                md: 4,
                sm: 6,
                xs: 12,
              }}
            >
              <Stack spacing={1}>
                <Typography variant="h6">Email</Typography>
                <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Aprobaciones" />
                  <FormControlLabel control={<Checkbox />} label="Actualizaciones de seguridad" />
                </FormGroup>
              </Stack>
            </Grid>
            <Grid
              size={{
                md: 4,
                sm: 6,
                xs: 12,
              }}
            >
              <Stack spacing={1}>
                <Typography variant="h6">Celular</Typography>
                <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Correo" />
                  <FormControlLabel control={<Checkbox />} label="Actualizaciones de seguridad" />
                </FormGroup>
              </Stack>
            </Grid>
            <Grid
              size={{
                md: 4,
                sm: 6,
                xs: 12,
              }}
            >
              <Stack spacing={1}>
                <Typography variant="h6">Alertas </Typography>
                <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Cuando se realice un pedido" />
                  <FormControlLabel control={<Checkbox />} label="Alertas de seguridad" />
                </FormGroup>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">Guardar cambios</Button>
        </CardActions>
      </Card>
    </form>
  );
}
