import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from "./Home.jsx"
import About from "./About.jsx"


function App() {

  return (
    <>
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to ="/about">About</Link>
      </nav>

      <Routes>
        <Route path = "/" element = {"Home"}></Route>
        <Route path = "/about" element = {"About"}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
