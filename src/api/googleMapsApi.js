import axios from 'axios'

axios.defaults.withCredentials = true

const SERVER_URL = 'http://localhost:3000'

export async function getGoogleMapsApiKey () {
  try {
    const response = await axios.get(`${SERVER_URL}/api/google-maps-api-key`)
    return response.data.apiKey
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener la API key de Google Maps')
  }
}
