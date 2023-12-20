import axios from 'axios'

axios.defaults.withCredentials = true

export async function saveQuotation (quotationData) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/quotation`, {
      quotationData
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al guardar la cotización')
  }
}

export async function getAllQuotationsByUserId (userId) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/quotation/user/${userId}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener las cotizaciones por usuario')
  }
}

export async function getAllQuotationsByEmail (email) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/quotation/email/${email}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener las cotizaciones por correo electronico')
  }
}
