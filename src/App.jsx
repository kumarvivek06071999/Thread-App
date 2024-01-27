
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Feed from './pages/feedPage/Feed'
import { useState } from 'react'
function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Feed />} />
      </Routes>
    </Router>
  )
}

export default App
