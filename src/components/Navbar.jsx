import { NavLink } from 'react-router-dom'

export default function Navbar({ showContacto = true }) {
  return (
    <header className="navbar">
      <svg className="logo-mark" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 30 L22 16 L36 30 L22 44 Z" stroke="white" strokeWidth="2.2" />
        <path d="M24 30 L38 16 L52 30 L38 44 Z" stroke="white" strokeWidth="2.2" />
      </svg>
      <span className="brand">BORCELLE GYM</span>
      <nav>
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>Inicio</NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>Clases</NavLink>
        {showContacto && <NavLink to="/">Contacto</NavLink>}
      </nav>
    </header>
  )
}
