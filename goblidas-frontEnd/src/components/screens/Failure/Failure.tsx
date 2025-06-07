import React from 'react'
import { Link } from 'react-router-dom'
import './failureEstilo.css'

export const Failure = () => {
    return (
        <div className="failure-container">
            <svg className="failure-icon" width="80" height="80" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#FF5252" />
                <path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <h1 className="failure-title">¡Pago rechazado!</h1>
            <p className="failure-message">
                Hubo un problema con tu pago.<br />
                Por favor, intenta nuevamente o usa otro método.
            </p>
            <Link to="/" className="failure-link">
                Volver al inicio
            </Link>
        </div>
    )
}