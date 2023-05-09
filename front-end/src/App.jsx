import './App.css'
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import HeaderBar from './components/ui/HeaderBar'
import Box from '@mui/material/Box'
import PaymentMethodList from './pages/payment_method/PaymentMethodList'
import PaymentMethodForm from './pages/payment_method/PaymentMethodForm'


function AuthGuard({children}){
  //Estaremos autenticados se tivermos um token gravado no localStorage
  if(window.localStorage.getItem('token')) return children
  else return <Navigate to="/login" replace />
}

function App() {
 

  return (
    
      
      <BrowserRouter>
        <HeaderBar />
        <Box sx={ {m:'25px auto', p: '16px'}}>
        <Routes>
          <Route path="/" element={<AuthGuard><Home /> </AuthGuard>} />

          <Route path="/login" element={<Login />} />

          <Route path="/payment_method" element={<AuthGuard><PaymentMethodList /> </AuthGuard>} />

          <Route path="/payment_method/new" element={<AuthGuard><PaymentMethodForm /> </AuthGuard>} />


        </Routes>
        </Box>
      </BrowserRouter>
    
  )
}

export default App
