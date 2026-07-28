# Borcelle Gym

Proyecto React (Vite) con 3 pantallas: Login, Registro y Dashboard de reservas.

## Cómo correrlo

1. Instalá las dependencias:
   ```bash
   npm install
   ```
2. Levantá el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Abrí la URL que te muestra la terminal (normalmente http://localhost:5173).

## Estructura

```
src/
  main.jsx          -> punto de entrada, monta el router
  App.jsx            -> define las rutas (/  /registro  /dashboard)
  AuthContext.jsx     -> "backend falso": guarda user y reservas en localStorage
  components/
    Navbar.jsx
  pages/
    Login.jsx
    Register.jsx
    Dashboard.jsx
```

## Cómo funciona el login (por ahora)

No hay servidor todavía. `AuthContext.jsx` simula el login: cualquier
usuario/contraseña no vacíos te dejan entrar, y el registro guarda el
nombre/email en el estado de React + localStorage. Cuando quieras sumar un
backend real, solo hay que reemplazar las funciones `login`, `register` y
`addBooking` de ese archivo por llamadas `fetch` a tu API — el resto de la
app no se toca.

## Próximos pasos sugeridos

- Backend real (Node/Express + base de datos) para persistir usuarios y reservas.
- Validaciones de formulario más completas (formato de email, largo de contraseña).
- Reemplazar las imágenes de Unsplash por las tuyas.
