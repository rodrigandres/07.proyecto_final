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

const Tracking = () => {
  const trackingData = [
    {
      tracking_id: 1,
      id_trip: 1,
      fecha_estado: '2023-12-16 10:00:00',
      estado_actual: 'En tránsito',
      descripcion_estado: 'El traslado está en curso',
      ubicacion_actual: 'Santiago'
    },
    {
      tracking_id: 2,
      id_trip: 2,
      fecha_estado: '2023-12-16 15:30:00',
      estado_actual: 'Entregado',
      descripcion_estado: 'El traslado ha sido entregado con éxito',
      ubicacion_actual: 'Buenos aires'
    }
  ]

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Paper elevation={3} sx={{ padding: '20px', margin: '20px' }}>
          <Typography variant='h4'>Detalles de Seguimiento</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>N° Traslado</TableCell>
                  <TableCell>Fecha de Estado</TableCell>
                  <TableCell>Estado Actual</TableCell>
                  <TableCell>Descripción del Estado</TableCell>
                  <TableCell>Ubicación Actual</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trackingData.map((track) => (
                  <TableRow key={track.id_trip}>
                    <TableCell>{track.tracking_id}</TableCell>
                    <TableCell>{track.fecha_estado}</TableCell>
                    <TableCell>{track.estado_actual}</TableCell>
                    <TableCell>{track.descripcion_estado}</TableCell>
                    <TableCell>{track.ubicacion_actual}</TableCell>
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

export default Tracking
