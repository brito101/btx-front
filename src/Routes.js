import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import NotFound from "./pages/NotFound"
import SignIn from "./pages/SignIn"
import SignUP from "./pages/SignUp"
import AdPAge from "./pages/AdPage"
import ProtectedRoute from "./components/ProtectedRoute"
import AddAd from "./pages/AddAd"

const Router = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/about' element={<About />} />
      <Route exact path='/signin' element={<SignIn />} />
      <Route exact path='/signup' element={<SignUP />} />
      <Route exact path='/ad/:id' element={<AdPAge />} />
      <Route
        exact
        path='/ad/add'
        element={
          <ProtectedRoute>
            <AddAd />
          </ProtectedRoute>
        }
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Router
