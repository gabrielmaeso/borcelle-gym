import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { useAuth } from '../AuthContext.jsx'

const CLASES = {
  CrossFit: '🏋️',
  Spinning: '🚴',
  HIIT: '💥',
  Yoga: '🧘',
  Funcional: '⚙️',
}

export default function Dashboard() {
  const { user, bookings, addBooking, logout } = useAuth()
  const navigate = useNavigate()

  const [clase, setClase] = useState('CrossFit')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('18:00 - 19:00')
  const [trainer, setTrainer] = useState('Lucía Martínez')
  const [notificar, setNotificar] = useState(true)

  function handleReservar(e) {
    e.preventDefault()
    if (!fecha) return
    addBooking({
      clase,
      fecha,
      hora,
      trainer,
      icono: CLASES[clase] || '🏋️',
    })
    setFecha('')
  }

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div
      className="page"
      style={{
        justifyContent: 'flex-start',
        backgroundImage: "url('https://images.unsplash.com/photo-1584466977773-e625c37cdd50?q=80&w=1600&auto=format&fit=crop')",
      }}
    >
      <Navbar showContacto={false} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'flex-end', padding: '0 48px' }}>
        <button className="logout-btn" onClick={handleLogout}>
          {user?.nombre ? `Hola, ${user.nombre} · ` : ''}Cerrar sesión
        </button>
      </div>

      <div className="content" style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
        <div className="dashboard-wrap">
          <h1 className="dashboard-title fill-red" style={{ color: 'var(--red)' }}>Reservar Clase</h1>

          <form className="panel" onSubmit={handleReservar}>
            <div className="grid-2">
              <div>
                <label>Seleccionar Clase:</label>
                <select value={clase} onChange={(e) => setClase(e.target.value)}>
                  {Object.keys(CLASES).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Fecha:</label>
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
              </div>
              <div>
                <label>Horario:</label>
                <select value={hora} onChange={(e) => setHora(e.target.value)}>
                  <option>08:00 - 09:00</option>
                  <option>10:00 - 11:00</option>
                  <option>18:00 - 19:00</option>
                  <option>19:00 - 20:00</option>
                </select>
              </div>
              <div>
                <label>Personal Trainer:</label>
                <select value={trainer} onChange={(e) => setTrainer(e.target.value)}>
                  <option>Lucía Martínez</option>
                  <option>Carlos Díaz</option>
                  <option>Sofía Torres</option>
                </select>
              </div>
            </div>

            <div className="checkbox-row">
              <input
                type="checkbox"
                checked={notificar}
                onChange={(e) => setNotificar(e.target.checked)}
                id="notificar"
              />
              <label htmlFor="notificar">Enviar notificación al cliente</label>
            </div>

            <hr className="divider" />

            <button type="submit" className="btn-primary">Reservar Clase</button>
          </form>

          <h2 className="history-title">Historial de Reservas</h2>
          <div className="history-list">
            {bookings.map((b) => (
              <div className="history-item" key={b.id}>
                <span className="emoji">{b.icono}</span>
                <div>
                  <strong>{b.clase}</strong>
                  <span>{b.fecha} - {b.hora}{b.trainer ? ` · ${b.trainer}` : ''}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
