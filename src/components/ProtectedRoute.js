import React from "react"
import { Navigate } from "react-router-dom"
import { isLogged } from "../helpers/AuthHandler"

const ProtectedRoute = ({ children }) => {
  const user = isLogged()
  if (!user) {
    return <Navigate to='/signin' />
  }
  return children
}

export default ProtectedRoute
