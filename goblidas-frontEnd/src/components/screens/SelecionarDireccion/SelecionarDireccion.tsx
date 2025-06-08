import React, { use, useEffect, useState } from 'react'
import { CardDireccion } from '../../ui/CardDireccion/CardDireccion'
import './SeleccionarDireccionEstilo.css'
import { Direccion } from '../../../types/direccion'
import { getAdressByUser } from '../../../service/adressService'
import { useUsuarioStore } from '../../../store/useUsuarioStore'
import { data } from 'react-router'
import { createOrdenDetail } from '../../../service/orderDetailService'
import { useCarritoStore } from '../../../store/useCarritoStore' // Asegúrate de tener este store

export const SelecionarDireccion = () => {
    const [direccionesUsuario, setDireccionesUsuario] = useState<Direccion[]>([])
    const usuario = useUsuarioStore(state => state.usuario);
    const carrito = useCarritoStore(state => state.productos);

    const handleClick = async (direccion: Direccion) => {
        const cartItems = carrito.map((item: any) => ({
            detailId: item.id,
            quantity: item.cantidad,
            price: item.prizeId.sellingPrice
        }));
        console.log('Dirección seleccionada:', direccion);
        console.log('Carrito de compras:', cartItems);
        try {
            await createOrdenDetail({
                userAdressId: { id: direccion.id },
                cartItems
            });

        } catch (error) {
            console.error('Error al crear la orden:', error);
        }
    }

    useEffect(() => {
        if (usuario?.id) {
            getAdressByUser(usuario.id)
                .then(data => {
                    const direcciones = data.map((item: any) => ({
                        id: item.adressId.id,
                        departament: item.adressId.departament,
                        locality: item.adressId.locality,
                        country: item.adressId.country,
                        province: item.adressId.province,
                        number: item.adressId.number,
                        streetName: item.adressId.streetName,
                    }));
                    setDireccionesUsuario(direcciones);
                })
                .catch(error => {
                    console.error('Error al obtener las direcciones del usuario:', error);
                });
        }
    }, [usuario]);
    return (
        <div className='selecionarDireccionScreen'>
            <h1>Selecionar Dirección</h1>
            <div className='selecionarDireccionCuerpo'>
                {direccionesUsuario.length > 0 ? (
                    direccionesUsuario.map((direccion) => (
                        <div onClick={() => handleClick(direccion)}>
                            <CardDireccion
                                key={direccion.id}
                                id={direccion.id}
                                departament={direccion.departament}
                                locality={direccion.locality}
                                country={direccion.country}
                                province={direccion.province}
                                number={direccion.number}
                                streetName={direccion.streetName}
                            />
                        </div>

                    ))
                ) : (
                    <p>No hay direcciones disponibles.</p>
                )}
            </div>
            <div className='selecionarDireccionBotones'>
                <button className='botonSelecionarDireccion'>Agregar nueva direccion</button>
            </div>
        </div>
    )
}
