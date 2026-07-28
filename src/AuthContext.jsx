import { createContext, useContext, useState, useEffect } from 'react'

// Este contexto simula un backend por ahora: guarda el usuario logueado
// y las reservas en localStorage. El día que sumemos un servidor real,
// solo hay que reemplazar estas funciones por llamadas fetch/axios.

const AuthContext = createContext(null)

const DEFAULT_BOOKINGS = [
  { id: 1, clase: 'Spinning', fecha: '23/06/2024', hora: '10:00 AM', icono: '🚴' },
  { id: 2, clase: 'HIIT', fecha: '21/06/2024', hora: '17:00 PM', icono: '🏋️' },
  { id: 3, clase: 'Yoga', fecha: '19/06/2024', hora: '08:00 AM', icono: '🧘' },
  { id: 4, clase: 'Funcional', fecha: '17/06/2024', hora: '15:30 PM', icono: '⚙️' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('borcelle_user')
    return saved ? JSON.parse(saved) : null
  })

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('borcelle_bookings')
    return saved ? JSON.parse(saved) : DEFAULT_BOOKINGS
  })

  useEffect(() => {
    if (user) localStorage.setItem('borcelle_user', JSON.stringify(user))
    else localStorage.removeItem('borcelle_user')
  }, [user])

  useEffect(() => {
    localStorage.setItem('borcelle_bookings', JSON.stringify(bookings))
  }, [bookings])

  function register({ nombre, email, password }) {
    // Acá luego iría el POST /api/register
    const newUser = { nombre, email }
    setUser(newUser)
    return { ok: true }
  }

  function login({ usuario, password }) {
    // Acá luego iría el POST /api/login
    if (!usuario || !password) {
      return { ok: false, error: 'Completá usuario y contraseña.' }
    }
    setUser({ nombre: usuario, email: '' })
    return { ok: true }
  }

  function logout() {
    setUser(null)
  }

  function addBooking(booking) {
    setBookings((prev) => [
      { id: Date.now(), ...booking },
      ...prev,
    ])
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, bookings, addBooking }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
