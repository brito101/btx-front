import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/About"
import About from "./pages/Home"

const Router = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/sobre' element={<About />} />
    </Routes>
  )
}

export default Router
