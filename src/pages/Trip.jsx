import Sidenav from '../components/Sidenav'
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box
} from '@mui/material'

const Trip = () => {
  const tripData = [
    {
      id: '1',
      origen: 'Santiago',
      destino: 'Valparaiso',
      fechaSolicitud: '2023-12-16',
      tipoCarga: 'Carga Liviana',
      descripcionTraslado: 'Descripción del traslado...',
      volumenEstimado: '5.25 m³',
      serviciosAdicionales: 'Servicio de embalaje',
      numArticulos: 10,
      nombreCliente: 'Nombre del Cliente',
      telefonoCliente: '123-456-7890',
      emailCliente: 'cliente@example.com',
      presupuestoEstimado: '$750.00'
    },
    {
      id: '2',
      origen: 'Santiago',
      destino: 'Buenos Aires',
      fechaSolicitud: '2023-12-16',
      tipoCarga: 'Carga Pesada',
      descripcionTraslado: 'Descripción del traslado...',
      volumenEstimado: '18.75 m³',
      serviciosAdicionales: 'Servicio de embalaje',
      numArticulos: 30,
      nombreCliente: 'Nombre del Cliente',
      telefonoCliente: '123-456-7890',
      emailCliente: 'cliente@example.com',
      presupuestoEstimado: '$750.00'
    }
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Paper elevation={3} sx={{ padding: '20px', margin: '20px' }}>
          <Typography variant='h4'>Detalles de los Traslados</Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Origen</TableCell>
                  <TableCell>Destino</TableCell>
                  <TableCell>Fecha de Solicitud</TableCell>
                  <TableCell>Tipo de Carga</TableCell>
                  <TableCell>Volumen Estimado</TableCell>
                  <TableCell>Servicios Adicionales</TableCell>
                  <TableCell>Numero de Articulos</TableCell>
                  <TableCell>Correo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tripData.map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell>{trip.origen}</TableCell>
                    <TableCell>{trip.destino}</TableCell>
                    <TableCell>{trip.fechaSolicitud}</TableCell>
                    <TableCell>{trip.tipoCarga}</TableCell>
                    <TableCell>{trip.volumenEstimado}</TableCell>
                    <TableCell>{trip.serviciosAdicionales}</TableCell>
                    <TableCell>{trip.numArticulos}</TableCell>
                    <TableCell>{trip.emailCliente}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  )
}

export default Trip
