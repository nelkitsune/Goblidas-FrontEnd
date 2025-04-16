import React from 'react'
import './PieDePaginaEstilo.css'

export const PieDePagina = () => {
    return (
        <>
            <footer className='pieDePagina'>
                <div className='pieDePagina__div1'>
                    <h4>
                        <a href="https://www.google.com/maps/place/Corrientes+123,+M5500HWG+Mendoza/@-32.8826074,-68.8374576,17z/data=!3m1!4b1!4m6!3m5!1s0x967e091f8705050f:0xfe02f77878cfb6b8!8m2!3d-32.8826074!4d-68.8348827!16s%2Fg%2F11w7r4y0_7?entry=ttu&g_ep=EgoyMDI1MDQxMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">Estamos en Av.Corrietes 123, 3° piso</a>
                    </h4>
                    <h4>
                        podes contactarnos al 261-1234567
                    </h4>
                </div>
                <div className='pieDePagina__div2'>
                    <h4>Goblidas</h4>
                    <h4>Derechos reservados 2023</h4>
                </div>
                <div className='pieDePagina__div3'>
                    <h4>Redes sociales</h4>
                    <h4>Instagram</h4>
                    <h4>Facebook</h4>
                </div>
            </footer>
        </>
    )
}
