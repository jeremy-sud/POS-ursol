import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Sistema POS
        </Typography>
        <Button color="inherit">Inicio</Button>
        <Button color="inherit">Productos</Button>
        <Button color="inherit">Ventas</Button>
        <Button color="inherit">Clientes</Button>
        <Button color="inherit">Reportes</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
