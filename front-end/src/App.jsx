import './App.css'
import React from 'react'
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import HeaderBar from './components/ui/HeaderBar'
import Box from '@mui/material/Box'
import PaymentMethodList from './pages/payment_method/PaymentMethodList'
import PaymentMethodForm from './pages/payment_method/PaymentMethodForm'
import ChannelMethodList from './pages/channel/ChannelMethodList'
import ChannelMethodForm from './pages/channel/ChannelMethodForm'
import CarrierMethodList from './pages/carrier/CarrierMethodList'
import CarrierMethodForm from './pages/carrier/CarrierMethodForm'
import ShipmentPriorityList from './pages/shipment_priority/ShipmentPriorityList'
import ShipmentPriorityForm from './pages/shipment_priority/ShipmentPriorityForm'
import OrderStatusList from './pages/order_status/OrderStatusList'
import OrderStatusForm from './pages/order_status/OrderStatusForm'
import TagList from './pages/tag/TagList'
import TagForm from './pages/tag/TagForm'
import UserList from './pages/user/UserList'
import UserForm from './pages/user/UserForm'


function AuthGuard({children}){
  //Estaremos autenticados se tivermos um token gravado no localStorage
  if(window.localStorage.getItem('token')) return children
  else return <Navigate to="/login" replace />
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  function onLoginLogout(loggedIn){
    setIsLoggedIn(loggedIn)
  }

  return (
    
      
      <BrowserRouter>
        <HeaderBar isLoggedIn={isLoggedIn} onLoginLogout={onLoginLogout} />
        <Box sx={ {m:'25px auto', p: '16px'}}>
        <Routes>
          <Route path="/" element={<AuthGuard><Home /> </AuthGuard>} />

          <Route path="/login" element={
          <Login onLoginLogout={onLoginLogout} />} />

          <Route path="/payment_method" element={<AuthGuard><PaymentMethodList /> </AuthGuard>} />
          <Route path="/payment_method/new" element={<AuthGuard><PaymentMethodForm /> </AuthGuard>} />
          <Route path="/payment_method/:id" element={<AuthGuard><PaymentMethodForm /> </AuthGuard>} />

          <Route path="/channels" element={<AuthGuard><ChannelMethodList /> </AuthGuard>} />
          <Route path="/channels/new" element={<AuthGuard><ChannelMethodForm /> </AuthGuard>} />
          <Route path="/channels/:id" element={<AuthGuard><ChannelMethodForm /> </AuthGuard>} />


          <Route path="/carriers" element={<AuthGuard><CarrierMethodList /> </AuthGuard>} />
          <Route path="/carriers/new" element={<AuthGuard><CarrierMethodForm /> </AuthGuard>} />
          <Route path="/carriers/:id" element={<AuthGuard><CarrierMethodForm /> </AuthGuard>} />

          <Route path="/shipment_priority" element={<AuthGuard><ShipmentPriorityList /> </AuthGuard>} />
          <Route path="/shipment_priority/new" element={<AuthGuard><ShipmentPriorityForm /> </AuthGuard>} />
          <Route path="/shipment_priority/:id" element={<AuthGuard><ShipmentPriorityForm /> </AuthGuard>} />

          <Route path="/order_status" element={<AuthGuard><OrderStatusList /> </AuthGuard>} />
          <Route path="/order_status/new" element={<AuthGuard><OrderStatusForm /> </AuthGuard>} />
          <Route path="/order_status/:id" element={<AuthGuard><OrderStatusForm /> </AuthGuard>} />

          <Route path="/tag" element={<AuthGuard><TagList /> </AuthGuard>} />
          <Route path="/tag/new" element={<AuthGuard><TagForm /> </AuthGuard>} />
          <Route path="/tag/:id" element={<AuthGuard><TagForm /> </AuthGuard>} />

          <Route path="/user" element={<AuthGuard><UserList /> </AuthGuard>} />
          <Route path="/user/new" element={<AuthGuard><UserForm /> </AuthGuard>} />
          <Route path="/user/:id" element={<AuthGuard><UserForm /> </AuthGuard>} />

        </Routes>
        </Box>
      </BrowserRouter>
    
  )
}

export default App
