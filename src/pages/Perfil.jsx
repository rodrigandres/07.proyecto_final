import React, { useEffect, useState } from 'react'
import Sidenav from '../components/Sidenav'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Avatar, Container, Grid, Typography, Button, CircularProgress, Card, Divider, CardActions, CardContent } from '@mui/material'
import { getUserProfile } from '../api/usersApi.js'
import { setUserProfile } from '../redux/slices/userSlice.js'

const Perfil = () => {
  const dispatch = useDispatch()
  const userProfile = useSelector((state) => state.user.profile)
  const userToken = useSelector((state) => state.auth.token)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (userToken) {
        try {
          const profile = await getUserProfile(userToken)
          dispatch(setUserProfile(profile))
          setLoading(false)
        } catch (error) {
          console.error(error.message)
        }
      }
    }

    if (userToken) {
      fetchUserProfile()
    }
  }, [userToken, dispatch])

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidenav />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth='md'>
          <Box my={4}>
            <Grid container spacing={3} justifyContent='center'>
              <Grid item xs={12} md={6}>
                {loading
                  ? (
                    <Box display='flex' justifyContent='center' alignItems='center' height='60vh'>
                      <CircularProgress />
                    </Box>
                    )
                  : userProfile && userProfile.length > 0
                    ? (
                      <>
                        {userProfile.map(user => (
                          <div key={user.id}>
                            <Card>
                              <CardContent>
                                <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                                  {/* <Avatar alt={user.name} src={user.name} sx={{ height: 80, mb: 2, width: 80 }} /> */}
                                  <Typography gutterBottom variant='h5'>
                                    {user.name}
                                  </Typography>
                                  <Typography color='text.secondary' variant='body2' />
                                  <Typography color='text.secondary' variant='body2' />
                                </Box>
                              </CardContent>
                              <Divider />
                              {/* <CardActions>
                                  <Button fullWidth variant='text'>
                                    Upload picture
                                  </Button>
                                </CardActions> */}
                            </Card>
                            <Typography variant='h4' align='center' gutterBottom />
                            <Typography variant='subtitle1' align='center' gutterBottom>
                              Email: {user.email}
                            </Typography>
                            <Typography variant='subtitle1' align='center' gutterBottom>
                              Gender: {user.gender}
                            </Typography>
                            <Typography variant='subtitle1' align='center' gutterBottom>
                              Phone Number: {user.phonenumber}
                            </Typography>
                            {/*  <Typography variant='subtitle1' align='center' gutterBottom>
                              Terms and Conditions: {user.termsandconditions ? 'true' : 'false'}
                            </Typography> */}
                            {/* <Box mt={3} display='flex' justifyContent='center'>
                                <Button variant='contained' color='primary'>
                                  Edit Profile
                                </Button>
                              </Box> */}
                          </div>
                        ))}
                      </>
                      )
                    : (
                      <Typography variant='h6' align='center'>
                        No se encontró el perfil del usuario.
                      </Typography>
                      )}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Perfil
