import axios from 'axios'

axios.defaults.withCredentials = true

export async function getGoogleMapsApiKey () {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/google-maps-api-key`)
    return response.data.apiKey
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener la API key de Google Maps')
  }
}
