import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DisplaySettingsIcon,
  MiscellaneousServicesIcon,
  // ShareLocationIcon,
  // FormatListNumberedIcon,
  ExitToAppIcon,
  ScreenSearchDesktopIcon
} from '../assets/material-icon'
import { useDispatch } from 'react-redux'
import { unauthenticateUser } from '../redux/slices/authSlice'
import Swal from 'sweetalert2'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
)

export default function Sidenav () {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(true)
  const navigate = useNavigate()

  const logoutUser = () => {
    try {
      const token = window.sessionStorage.getItem('token')

      if (token) {
        window.sessionStorage.removeItem('token')
        dispatch(unauthenticateUser())
        Swal.fire({
          icon: 'success',
          title: 'Cierre de Sesión Exitoso',
          text: 'Has cerrado sesión exitosamente'
        })
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Usuario no Autenticado',
          text: 'El usuario no está autenticado.'
        })
      }navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant='permanent' open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(!open)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List x={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate('/') }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}
              >
                <DisplaySettingsIcon />
              </ListItemIcon>
              <ListItemText primary='Services' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          {/*  <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate('/trip') }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}
              >
                <FormatListNumberedIcon />
              </ListItemIcon>
              <ListItemText primary='Trips' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate('/tracking') }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}
              >
                <ShareLocationIcon />
              </ListItemIcon>
              <ListItemText
                primary='Tracking' sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem> */}
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate('/mySearch') }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}
              >
                <ScreenSearchDesktopIcon />
              </ListItemIcon>
              <ListItemText
                primary='My Search' sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate('/profile/') }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}
              >
                <MiscellaneousServicesIcon />
              </ListItemIcon>
              <ListItemText primary='Perfil' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ pt: '61vh' }} />
          <ListItem disablePadding sx={{ display: 'block' }} onClick={logoutUser}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}
              >
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary='Log Out' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  )
}
