import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart } from '../redux/slices/cartSlice'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Sidenav from '../components/Sidenav'
import Appbar from '../components/Appbar'
import {
  TableCell,
  TableRow,
  Typography,
  Grid,
  IconButton,
  Box,
  TableBody,
  TableHead,
  Table
} from '@mui/material'

const Carrito = () => {
  const cartItems = useSelector((state) => state.cart.items)
  console.log('cart items', cartItems)
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.auth.isAuth)

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId))
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        {isAuth ? <Sidenav /> : <Appbar />}
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant='h4'>Detalle de su Compra</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Origen</TableCell>
                <TableCell>Destino</TableCell>
                <TableCell>Distancia</TableCell>
                <TableCell>Valor del Traslado</TableCell>
                <TableCell>Ubicación Actual</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component='th' scope='row' align='center'>
                    {item.name}
                  </TableCell>
                  <TableCell align='left'>
                    {item.toName}
                  </TableCell>
                  <TableCell align='center'>
                    {item.distanceText}
                  </TableCell>
                  <TableCell align='center'>
                    ${item.distanceValue}
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton
                      variant='contained'
                      color='secondary'
                      size='small'
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align='center'>
                    <Grid item xs={2} sm={2} style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant='body1' component='p' style={{ textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>
                    </Grid>
                  </TableCell>
                  <TableCell align='center'>
                    {item.availableQuantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  )
}

export default Carrito
