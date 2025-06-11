
import { Link } from 'react-router-dom'
import './SuccessEstilo.css'

export const Success = () => {
  return (
    <div className="success-container">
      <svg className="success-icon" width="80" height="80" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill="#4BB543" />
        <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h1 className="success-title">¡Pago exitoso!</h1>
      <p className="success-message">
        Gracias por tu compra.<br />
        Pronto recibirás la confirmación en tu correo.
      </p>
      <Link to="/" className="success-link">
        Volver al inicio
      </Link>
    </div>
  )
}
