import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { useAuth } from '../AuthContext.jsx'

export default function Login() {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const result = login({ usuario, password })
    if (result.ok) {
      navigate('/dashboard')
    } else {
      setError(result.error)
    }
  }

  return (
    <div
      className="page"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop')" }}
    >
      <Navbar />
      <div className="content">
        <form className="auth-card dark" onSubmit={handleSubmit}>
          <h1>Iniciar Sesión</h1>

          {error && <div className="error-msg">{error}</div>}

          <div className="field with-icon">
            <label>Usuario</label>
            <span className="icon">👤</span>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Usuario"
            />
          </div>

          <div className="field with-icon">
            <label>Contraseña</label>
            <span className="icon">🔒</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
          </div>

          <button type="submit" className="btn-primary">Iniciar Sesión</button>

          <div className="switch-link">
            ¿No tenés cuenta? <Link to="/registro">Registrate</Link> | Olvidé mi contraseña
          </div>
        </form>
      </div>

      <div className="hero-copy">
        <h2>EMPIEZA A</h2>
        <h2 className="outline">ENTRENAR</h2>
        <h2 className="fill-red">HOY</h2>
      </div>
    </div>
  )
}
