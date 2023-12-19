import axios from 'axios'

axios.defaults.withCredentials = true

// Función para Registrar un usuario
export async function registerUser (userData) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/users`, userData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al registrar el usuario')
  }
}

// Función para iniciar sesión
export async function onLogin (loginData) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/login`, loginData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al iniciar sesión')
  }
}

export async function onLogout () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ message: 'Sesión cerrada exitosamente' })
    }, 1000)
  })
}

// Función para verificar el token del usuario
export async function verifyToken () {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/verify`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al verificar el token')
  }
}
