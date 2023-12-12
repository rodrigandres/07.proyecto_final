import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Contact, Home, NotFound, Tracking, Trip, Perfil, Login, Register } from '../pages/'

const Routers = () => {
  const { isAuth, role } = useSelector((state) => state.auth)

  const PrivateRoutes = () => {
    return isAuth ? <Outlet /> : <Navigate to='/login' />
  }

  const RestrictedRoutes = () => {
    return isAuth && role === 'admin' ? <Outlet /> : <Navigate to='/home' />
  }

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/contact' element={<Contact />} />

      {/* Rutas privadas */}
      <Route element={<PrivateRoutes />}>
        <Route path='/' element={<Home />} />
        <Route path='/tracking' element={<Tracking />} />
        <Route path='/trip' element={<Trip />} />
        <Route path='/profile/:id' element={<Perfil />} />
      </Route>

      {/* Rutas restringidas */}
      <Route element={<RestrictedRoutes />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Routers
