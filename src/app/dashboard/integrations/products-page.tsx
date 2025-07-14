    "use client";

    import * as React from 'react';
    import Box from '@mui/material/Box';
    import Button from '@mui/material/Button';
    import Grid from '@mui/material/Grid';
    import Pagination from '@mui/material/Pagination';
    import Stack from '@mui/material/Stack';
    import Typography from '@mui/material/Typography';
    import Dialog from '@mui/material/Dialog';
    import DialogTitle from '@mui/material/DialogTitle';
    import DialogContent from '@mui/material/DialogContent';
    import DialogActions from '@mui/material/DialogActions';
    import TextField from '@mui/material/TextField';

    import { DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
    import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
    import { UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';

    import { IntegrationCard } from '@/components/dashboard/integrations/integrations-card';
    import { CompaniesFilters } from '@/components/dashboard/integrations/integrations-filters';

    interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    vendido: number;
    stock: number;
    totalVendido: number;
    }



    export default function ProductsPage() {
    const [productos, setProductos] = React.useState<Producto[]>([]);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [newProduct, setNewProduct] = React.useState<Producto>({
        id: 0,
        nombre: '',
        descripcion: '',
        vendido: 0,
        stock: 0,
        totalVendido: 0,
    });

    const [errorBackend, setErrorBackend] = React.useState<string | null>(null);

React.useEffect(() => {
    fetch("http://localhost:8080/api/producto/list")
        .then(res => res.json())
        .then(json => {
            const lista = json.data?.listaProductos;
            if (Array.isArray(lista)) {
                setProductos(lista);
            } else {
                console.error("❌ No se recibió una lista válida de productos:", json);
            }
        });
}, []);

const handleChangeAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
    ...prev,
    [name]: ['id', 'vendido', 'stock', 'totalVendido'].includes(name) ? Number(value) : value,
    }));
};

    const handleSaveAdd = async () => {
        const response = await fetch("http://localhost:8080/api/producto/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
        });

        if (!response.ok) {
        const errorText = await response.text();
        alert(`❌ Error al agregar: ${response.status} ${errorText}`);
        return;
        }

        alert("✅ Producto agregado correctamente");
        setOpenAdd(false);
        setNewProduct({
        id: 0,
        nombre: '',
        descripcion: '',
        vendido: 0,
        stock: 0,
        totalVendido: 0,
        });

        // Volver a cargar los productos
        fetch("http://localhost:8080/api/producto/list")
        .then(res => res.json())
        .then(json => setProductos(json.data))
    };

    return (
        <Stack spacing={3}>
        <Stack direction="row" spacing={3}>
            <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Productos</Typography>
            <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
                <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
                Importar
                </Button>
                <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
                Exportar
                </Button>
            </Stack>
            </Stack>
            <div>
            <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained" onClick={() => setOpenAdd(true)}>
                Agregar
            </Button>
            </div>
        </Stack>

        <CompaniesFilters />

        {productos.length === 0 && (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 4 }}>
            No hay productos para mostrar.
            </Typography>
        )}

        {errorBackend && (
        <Typography color="error" variant="body1">
        {errorBackend}
        </Typography>
        )}

        <Grid container spacing={3}>
            {Array.isArray(productos) && productos.map((producto) => (
            <Grid key={producto.id} item xs={12} md={6} lg={4}>
                <IntegrationCard
                integration={{
                    id: producto.id.toString(),
                    title: producto.nombre,
                    description: producto.descripcion,
                    logo: "/assets/celular.png",
                    installs: producto.vendido,
                    updatedAt: new Date("2025-01-01"), // fecha fija para ejemplo
                    stock: producto.stock,
                }}
                />
            </Grid>
            ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination count={3} size="small" />
        </Box>

        {/* Diálogo Agregar */}
        <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
            <DialogTitle>Agregar producto</DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Nombre" name="nombre" value={newProduct.nombre} onChange={handleChangeAdd} fullWidth />
            <TextField label="Descripción" name="descripcion" value={newProduct.descripcion} onChange={handleChangeAdd} fullWidth />
            <TextField label="Vendidos" name="vendido" type="number" value={newProduct.vendido} onChange={handleChangeAdd} fullWidth />
            <TextField label="Stock" name="stock" type="number" value={newProduct.stock} onChange={handleChangeAdd} fullWidth />
            <TextField label="Total Vendido" name="totalVendido" type="number" value={newProduct.totalVendido} onChange={handleChangeAdd} fullWidth />
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setOpenAdd(false)}>Cancelar</Button>
            <Button variant="contained" onClick={handleSaveAdd}>Guardar</Button>
            </DialogActions>
        </Dialog>
        </Stack>
    );
    }
