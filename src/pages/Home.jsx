/* global google */
import Sidenav from '../components/Sidenav'
import Appbar from '../components/Appbar'
import {
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  CardActions,
  Typography,
  Container
}
  from '@mui/material'
import AddShoppingCart from '@mui/icons-material/AddShoppingCart'
import { useState, useEffect } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { getGoogleMapsApiKey } from '../api/googleMapsApi'
import { addToCart } from '../redux/slices/cartSlice'
import { Link } from 'react-router-dom'
import generateUniqueItemId from '../utils/uniqueId'
import Swal from 'sweetalert2'

const Home = () => {
  const [fromLocation, setFromLocation] = useState(null)
  const [toLocation, setToLocation] = useState(null)
  const [fromLatLng, setFromLatLng] = useState(null)
  const [toLatLng, setToLatLng] = useState(null)
  const [distance, setDistance] = useState({})
  const apiKey = getGoogleMapsApiKey()
  const isAuth = useSelector((state) => state.auth.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (fromLatLng !== null) {
      const initMap = () => {
        const map = new google.maps.Map(document.getElementById('map'), {
          center: fromLatLng,
          origin: {
            location: fromLatLng
          },
          destination: {
            location: toLatLng
          },
          zoom: 15
        })

        const display = new google.maps.DirectionsRenderer()
        const services = new google.maps.DirectionsService()
        display.setMap(map)
        const request = {
          origin: fromLatLng,
          destination: toLatLng,
          travelMode: 'DRIVING'
        }
        services.route(request, function (result, status) {
          if (status === 'OK') {
            setDistance(result.routes[0].legs[0].distance)
            display.setDirections(result)
          }
        })
      }
      if (window.google && window.google.maps) {
        initMap()
      } else {
        window.initMap = initMap
      }
    }
  }, [fromLatLng, toLatLng])

  const getLatLng = async (places, types) => {
    const placeId = places.value.place_id
    const service = new google.maps.places.PlacesService(document.createElement('div'))

    service.getDetails({ placeId }, (place, status) => {
      if (status === 'OK' && place.geometry && place.geometry.location) {
        if (types === 'ORIGIN') {
          setFromLatLng({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name
          })
        } else {
          setToLatLng({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name
          })
        }
      }
    })
  }

  const handleSearch = async () => {
    if (fromLocation && toLocation) {
      try {
        await getLatLng(fromLocation, 'ORIGIN')
        await getLatLng(toLocation)

        console.log('Coordenadas de origen:', fromLatLng)
        console.log('Coordenadas de destino:', toLatLng)
      } catch (error) {
        console.error('Error al obtener coordenadas:', error)
      }
    } else {
      console.log('Selecciona ambas ubicaciones antes de realizar la búsqueda.')
    }
  }

  const handleAddToCart = () => {
    if (distance?.value) {
      const newItem = {
        id: generateUniqueItemId(),
        name: fromLatLng.name,
        label: fromLatLng.label,
        toName: toLatLng.name,
        toLabel: toLatLng.label,
        distanceText: distance?.text,
        distanceValue: distance?.value * 4 || 0
      }
      dispatch(addToCart(newItem))
      Swal.fire({
        icon: 'success',
        title: 'Añadido al carrito',
        text: 'El artículo se ha añadido al carrito exitosamente.'
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede añadir al carrito, valor del traslado no disponible.'
      })
    }
  }

  return (
    <>
      {isAuth ? <Sidenav /> : <Appbar />}
      <Box sx={{ display: ' ' }}>
        <Grid container justifyContent='center' alignItems='center' style={{ marginTop: '16px', flex: 1, flexDirection: 'column' }}>
          <Card elevation={5} style={{ marginTop: '16px', width: '100%', maxWidth: '700px' }}>
            <CardContent style={{ padding: '8px' }}>
              <GooglePlacesAutocomplete
                apiKey={apiKey}
                selectProps={{
                  value: fromLocation,
                  onChange: setFromLocation,
                  placeholder: 'From Location',
                  isClearable: true,
                  components: {
                    DropdownIndicator: false
                  },
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: '#EEF0E5',
                      marginTop: '20px'
                    })
                  }
                }}
              />
              <GooglePlacesAutocomplete
                apiKey={apiKey}
                selectProps={{
                  value: toLocation,
                  onChange: setToLocation,
                  placeholder: 'To Location',
                  isClearable: true,
                  components: {
                    DropdownIndicator: false
                  },
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      backgroundColor: '#EEF0E5',
                      marginTop: '20px'
                    })
                  }
                }}
              />
              <CardActions style={{ justifyContent: 'center', marginTop: '16px' }}>
                <Button variant='contained' color='primary' onClick={handleSearch}>
                  Search
                </Button>
              </CardActions>
              {fromLatLng !== null && (
                <>
                  <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
                    <Typography variant='subtitle1' gutterBottom>
                      Distancia del Viaje: {distance?.text || 'Calculando...'}
                    </Typography>
                    <Typography variant='subtitle1' gutterBottom>
                      Valor del traslado: $ {(distance?.value * 4) || 'Calculando...'}
                    </Typography>
                    <CardActions>
                      <Button
                        size='small'
                        variant='contained'
                        color='primary'
                        startIcon={<AddShoppingCart />}
                        onClick={handleAddToCart}
                      >
                        Añadir al Carrito
                      </Button>
                      <Link to='/carrito'>
                        <Button size='small' variant='contained' color='primary' sx={{ margin: 2 }}>
                          Ir al Carrito
                        </Button>
                      </Link>
                    </CardActions>
                  </Container>
                </>
              )}
            </CardContent>

          </Card>
          {fromLatLng !== null && (
            <Card elevation={5} style={{ marginTop: '16px', width: '80%', height: 450 }}>
              <div id='map' style={{ width: '100%', height: '100%' }} />
            </Card>)}
        </Grid>
      </Box>
    </>
  )
}

export default Home
