import React from "react"
import Form from "./views/form"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SendForm from "./views/sendForm"

function App() {
  return (
    <div>
      <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<Form/>} />
    <Route path="/sendForm" element={<SendForm />}/>
    </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
//hola
