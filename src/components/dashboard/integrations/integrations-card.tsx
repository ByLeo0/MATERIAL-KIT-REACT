"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { ClockIcon } from "@phosphor-icons/react/dist/ssr/Clock";
import { DownloadIcon } from "@phosphor-icons/react/dist/ssr/Download";
import dayjs from "dayjs";



export interface Integration {
  id: string;
  title: string;
  description: string;
  logo: string;
  installs: number;
  updatedAt: Date;
  stock?: number;
}

export interface IntegrationCardProps {
  integration: Integration;
}

export function IntegrationCard({
  integration,
}: IntegrationCardProps): React.JSX.Element {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [formData, setFormData] = React.useState({
    id: integration.id,
    title: integration.title,
    description: integration.description,
    installs: integration.installs,
    stock: integration.stock ?? 0,
  });

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["installs", "stock"].includes(name) ? Number(value) : value,
    }));
  };

  const handleSaveEdit = async () => {
    const response = await fetch(
      `http://localhost:8080/api/producto/update/${formData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: formData.id,
          nombre: formData.title,
          descripcion: formData.description,
          vendido: formData.installs,
          stock: formData.stock,
          totalVendido: formData.installs,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      alert(`❌ Error al actualizar: ${response.status} ${errorText}`);
      return;
    }

    alert("✅ Producto actualizado correctamente");
    setOpenEdit(false);
  };

  return (
    <>
      <Card
  sx={{
    display: "flex",
    flexDirection: "column",
    minHeight: 300,          // opcional, para dar altura fija mínima
    border: "1px solid #ccc", // borde gris claro para que sea visible
    boxShadow: 3,             // sombra para que resalte un poco
  }}
>
        <CardContent sx={{ flex: "1 1 auto" }}>
          <Stack spacing={2}>
            <Avatar
              src={integration.logo}
              variant="square"
              sx={{ width: 120, height: 120, margin: "0 auto" }}
            />
            <Stack spacing={1}>
              <Typography align="center" variant="h5">
                {integration.title}
              </Typography>
              <Typography align="center" variant="body1">
                {integration.description}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
        <Divider />
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "space-between", p: 2 }}
        >
          <Stack sx={{ alignItems: "center" }} direction="row" spacing={1}>
            <ClockIcon fontSize="var(--icon-fontSize-sm)" />
            <Typography color="text.secondary" variant="body2">
              Descargas {dayjs(integration.updatedAt).format("D MMM , YYYY")}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <DownloadIcon fontSize="var(--icon-fontSize-sm)" />
            <Typography color="text.secondary" variant="body2">
              {integration.installs} Instalados
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Button variant="outlined" onClick={handleOpenEdit}>
            Ver Detalles
          </Button>
        </Box>
      </Card>

      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Editar producto</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Código" name="id" value={formData.id} disabled fullWidth />
          <TextField label="Nombre" name="title" value={formData.title} onChange={handleChangeEdit} fullWidth />
          <TextField label="Descripción" name="description" value={formData.description} onChange={handleChangeEdit} fullWidth />
          <TextField label="Vendidos" name="installs" type="number" value={formData.installs} onChange={handleChangeEdit} fullWidth />
          <TextField label="Stock" name="stock" type="number" value={formData.stock} onChange={handleChangeEdit} fullWidth />
          <TextField label="Total Vendido" value={formData.installs} disabled fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancelar</Button>
          <Button variant="contained" onClick={handleSaveEdit}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}