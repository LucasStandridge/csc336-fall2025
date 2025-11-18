import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Books from "./Books.jsx"
import About from "./About.jsx"
import Fetch from "./Fetch.jsx"
// import Home from "./Home.jsx"
// import About from "./About.jsx"


function App() {

  return (
    <>
    <BrowserRouter>
      <nav>
        <Link to="/">Home  </Link>
        <Link to="about">About   </Link>
        <Link to="fetch">Fetch</Link>
      </nav>

      <Routes>
        <Route path = "/" element = {<Books/>}></Route>
        <Route path = "/about" element = {<About/>}></Route>
        <Route path = "/fetch" element = {<Fetch/>}></Route>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
