import './App.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import HeaderBar from './components/ui/HeaderBar'
import Box from '@mui/material/Box'

function App() {
 

  return (
    
      
      <BrowserRouter>
        <HeaderBar />
        <Box sx={ {m:'25px auto'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        </Box>
      </BrowserRouter>
    
  )
}

export default App
