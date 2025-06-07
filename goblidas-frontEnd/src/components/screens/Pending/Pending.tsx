import React from 'react'
import { Link } from 'react-router-dom'
import './PendingEstilo.css'

export const Pending = () => {
    return (
        <div className="pending-container">
            <svg className="pending-icon" width="80" height="80" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#FFD600" />
                <path d="M12 7v5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="12" cy="16" r="1.5" fill="#fff" />
            </svg>
            <h1 className="pending-title">Pago pendiente</h1>
            <p className="pending-message">
                Tu pago está siendo procesado.<br />
                Te avisaremos cuando se confirme.
            </p>
            <Link to="/" className="pending-link">
                Volver al inicio
            </Link>
        </div>
    )
}