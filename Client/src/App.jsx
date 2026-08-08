import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AuthStore from './Store/Auth.store.js'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const checkAuth = AuthStore(state => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div className='text-stone-100'>
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        toastStyle={{
          background: '#1e293b',
          border: '1px solid rgba(148, 163, 184, 0.12)',
          borderRadius: '1rem',
          fontFamily: "'Inter', sans-serif",
        }}
      />
    </div>
  )
}

export default App
