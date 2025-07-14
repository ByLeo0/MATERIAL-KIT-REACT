"use client"

import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

export function AddProductButton() {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    id: "",
    nombre: "",
    descripcion: "",
    vendido: 0,
    stock: 0,
    totalVendido: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["vendido", "stock", "totalVendido"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSave = async () => {
    const response = await fetch("http://localhost:8080/api/producto/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      alert("❌ Error al agregar producto");
      return;
    }

    alert("✅ Producto agregado");
    setOpen(false);
    setForm({ id: "", nombre: "", descripcion: "", vendido: 0, stock: 0, totalVendido: 0 });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained">Agregar</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Agregar producto</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="ID" name="id" value={form.id} onChange={handleChange} fullWidth />
          <TextField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} fullWidth />
          <TextField label="Descripción" name="descripcion" value={form.descripcion} onChange={handleChange} fullWidth />
          <TextField label="Vendidos" name="vendido" type="number" value={form.vendido} onChange={handleChange} fullWidth />
          <TextField label="Stock" name="stock" type="number" value={form.stock} onChange={handleChange} fullWidth />
          <TextField label="Total Vendido" name="totalVendido" type="number" value={form.totalVendido} onChange={handleChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
