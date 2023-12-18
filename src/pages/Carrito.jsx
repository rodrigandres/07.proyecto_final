import Sidenav from '../components/Sidenav'
import Appbar from '../components/Appbar'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart } from '../redux/slices/cartSlice'
import { TableCell, TableRow, Typography, Grid, IconButton } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

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
      {isAuth ? <Sidenav /> : <Appbar />}
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
          <TableCell align='center'>
            ${item.distanceValue}
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}

export default Carrito
