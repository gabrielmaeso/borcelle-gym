import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { useAuth } from '../AuthContext.jsx'

export default function Register() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '' })
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.nombre || !form.email || !form.password) {
      setError('Completá todos los campos.')
      return
    }
    register(form)
    navigate('/dashboard')
  }

  return (
    <div
      className="page"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1600&auto=format&fit=crop')" }}
    >
      <Navbar />
      <div className="content">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h1>Crear nueva cuenta</h1>

          {error && <div className="error-msg">{error}</div>}

          <div className="field">
            <label>Nombre</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} />
          </div>

          <div className="field">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} />
          </div>

          <div className="field">
            <label>Contraseña</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} />
          </div>

          <button type="submit" className="btn-primary">Registrarse</button>

          <div className="switch-link">
            ¿Ya tenés cuenta? <Link to="/">Iniciar sesión</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
