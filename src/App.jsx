
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Feed from './pages/feed'
import { useState } from 'react'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Feed/>} / >
      </Routes>
    </Router>
  )
}

export default App
