import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchQuotations, removeQuotation } from '../redux/slices/quotationSlice'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Sidenav from '../components/Sidenav'
import Appbar from '../components/Appbar'
import {
  TableCell,
  TableRow,
  Typography,
  IconButton,
  Box,
  TableBody,
  TableHead,
  Table
} from '@mui/material'

const MySearch = () => {
  const quotations = useSelector((state) => state.quotation.quotations)
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.auth.isAuth)
  const user = useSelector((state) => state.user.profile[0])

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchQuotations(user.id))
    }
  }, [dispatch, user])

  const handleRemoveQuotation = (quotationId) => {
    dispatch(removeQuotation(quotationId))
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {isAuth ? <Sidenav /> : <Appbar />}
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant='h4' sx={{ mt: 4 }}>Mis Cotizaciones</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Origen</TableCell>
              <TableCell>Destino</TableCell>
              <TableCell>Distancia</TableCell>
              <TableCell>Valor del Traslado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quotations.map((quotation) => (
              <TableRow key={quotation.id}>
                <TableCell>{quotation.name}</TableCell>
                <TableCell>{quotation.toname}</TableCell>
                <TableCell>{quotation.distancetext}</TableCell>
                <TableCell>${quotation.distancevalue * 400}</TableCell>
                <TableCell align='center'>
                  <IconButton
                    variant='contained'
                    color='secondary'
                    size='small'
                    onClick={() => handleRemoveQuotation(quotation.id)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
                <TableCell align='center' />
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </Box>
    </Box>
  )
}

export default MySearch
