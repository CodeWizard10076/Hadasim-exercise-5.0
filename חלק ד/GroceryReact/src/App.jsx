import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from './components/app/store';
import Entrance from './components/Entrance'
import Login from './components/features/Supplier/Login'
import SignUp from './components/features/Supplier/SignUp'
import SupplierPage from './components/features/Supplier/SupplierPage'
import Orders from './components/features/Owner/Orders'
import OrderGoods from './components/features/Owner/OrderGoods'
import OwnerMain from './components/features/Owner/OwnerMain'
import OwnerLogin from './components/features/Owner/OwnerLogin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
        <Routes>
        <Route index element={<Entrance />} />
        <Route path='SignUp' element={<SignUp />} />
        <Route path='Login' element={<Login />} />
        <Route path='SupplierPage' element={<SupplierPage />} />
        <Route path='Orders' element={<Orders />} />
        <Route path='OrderGoods' element={<OrderGoods />} />
        <Route path='OwnerMain' element={<OwnerMain />} />
        <Route path='OwnerLogin' element={<OwnerLogin />} />

        </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
