/* eslint-disable react-refresh/only-export-components */
import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

export const Context=createContext({IsAuthenticated: false});

const AppWrapper=()=> {
  const [IsAuthenticated, setIsAuthenticated]=useState(false);
  const [user, setUser]=useState({});

  return (
    <Context.Provider value={{IsAuthenticated, setIsAuthenticated, user, setUser}}>
      <App/>
    </Context.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper/>
  </StrictMode>,
)
