import React from "react"
import { BrowserRouter } from "react-router-dom"

import './App.css';

import { Template } from "./components/main"
import Footer from "./components/partials/Footer"
import Header from "./components/partials/Header"
import Router from "./Routes"

const Page = (props) => {
  return (
    <BrowserRouter>
      <Template>
        <Header />
        <Router />
        <Footer />
      </Template>
    </BrowserRouter>
  )
}

export default Page
