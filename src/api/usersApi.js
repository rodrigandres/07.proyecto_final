import axios from 'axios'
import store from '../redux/store.js'

axios.defaults.withCredentials = true

export async function getUserProfile () {
  try {
    const state = store.getState()
    const USER_TOKEN = state.auth.token
    const response = await axios.get('http://localhost:3000/api/profile', {
      headers: {
        Authorization: `Bearer ${USER_TOKEN}` // Agregar el token a la cabeceras de la solicitud
      }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener el perfil del usuario')
  }
}
