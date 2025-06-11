import { useEffect, useState } from 'react'
import { CardDireccion } from '../../ui/CardDireccion/CardDireccion'
import './SeleccionarDireccionEstilo.css'
import { Direccion } from '../../../types/direccion'
import { getAdressByUser, postDireccion, createUsuarioDireccion } from '../../../service/adressService'
import { useUsuarioStore } from '../../../store/useUsuarioStore'
import { createOrder } from '../../../service/orderDetailService'
import { useCarritoStore } from '../../../store/useCarritoStore'
import { ModalAgregarDireccion } from './../../ui/ModalAgregarDireccion/ModalAgregarDireccion';
import { createPaymentPreference } from '../../../service/paymentService'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

initMercadoPago('APP_USR-ef0be797-dce2-4633-b909-b06945e1578e'); // Reemplaza con tu public key real

export const SelecionarDireccion = () => {
    const [direccionesUsuario, setDireccionesUsuario] = useState<Direccion[]>([])
    const [mostrarModal, setMostrarModal] = useState(false);
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [direccionSeleccionada, setDireccionSeleccionada] = useState<Direccion | null>(null);
    const usuario = useUsuarioStore(state => state.usuario);
    const carrito = useCarritoStore(state => state.productos);
    const navigate = useNavigate();

    const handleClick = async (direccion: Direccion) => {
        const cartItems = carrito.map((item: any) => ({
            detailId: item.id,
            quantity: item.cantidad,
            price: item.prizeId.sellingPrice
        }));

        const order = {
            userAdressId: direccion.id,
            cartItems
        };

        let ordenCreada: any;

        try {
            ordenCreada = await createOrder(order);
        } catch (error) {
            console.error('Error al crear la orden:', error);
            return;
        }

        try {
            const initPoint = await createPaymentPreference(ordenCreada.id);
            setPreferenceId(initPoint); // initPoint debe ser SOLO el id, no la URL
        } catch (error) {
            console.error('Error al crear preferencia de pago:', error);
        }
    };

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

    const handleSaveDireccion = async (direccion: any) => {
        if (!usuario?.id) return;
        try {
            // 1. Crear la dirección y obtener la respuesta (que debe incluir el id de la nueva dirección)
            const nuevaDireccion = await postDireccion(usuario.id, direccion);

            // 2. Asociar la dirección al usuario
            await createUsuarioDireccion(usuario.id, nuevaDireccion.id);

            // 3. Recargar las direcciones después de guardar
            const data = await getAdressByUser(usuario.id);
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
        } catch (error) {
            console.error('Error al guardar la dirección:', error);
        }
        setMostrarModal(false);
    };

    const handleSeleccionarDireccion = (direccion: Direccion) => {
        setDireccionSeleccionada(direccion);
    };

    const handleContinuar = async () => {
        if (!direccionSeleccionada) return;
        const cartItems = carrito.map((item: any) => ({
            detailId: item.id,
            quantity: item.cantidad,
            price: item.prizeId.sellingPrice
        }));
        const order = {
            userAdressId: direccionSeleccionada.id,
            cartItems
        };
        let ordenCreada: any;
        try {
            ordenCreada = await createOrder(order);
        } catch (error) {
            Swal.fire('Error', 'No se pudo crear la orden', 'error');
            return;
        }
        // Navega al componente de confirmación, pasando la orden y la dirección
        navigate('/confirmar-compra', {
            state: {
                order: ordenCreada, // solo si necesitas el id de la orden/preferenceId
                direccion: direccionSeleccionada,
                carrito: carrito.map(item => ({
                    nombre: item.productIdj.name,
                    cantidad: item.cantidad,
                    precio: item.prizeId.sellingPrice
                }))
            }
        });
    };

    return (
        <div className='selecionarDireccionScreen'>
            <h1>Selecionar Dirección</h1>
            <div className='selecionarDireccionCuerpo'>
                {direccionesUsuario.length > 0 ? (
                    direccionesUsuario.map((direccion) => (
                        <div
                            key={direccion.id}
                            onClick={() => handleSeleccionarDireccion(direccion)}
                            style={{
                                border: direccionSeleccionada?.id === direccion.id ? '2px solid #4caf50' : 'none'
                            }}
                        >
                            <CardDireccion {...direccion} />
                        </div>
                    ))
                ) : (
                    <p>No hay direcciones disponibles.</p>
                )}
            </div>
            <div className='selecionarDireccionBotones'>
                <button className='botonSelecionarDireccion' onClick={() => setMostrarModal(true)}>
                    Agregar nueva direccion
                </button>
                <button
                    className='botonContinuar'
                    disabled={!direccionSeleccionada}
                    onClick={handleContinuar}
                >
                    Continuar
                </button>
            </div>
            {mostrarModal && (
                <ModalAgregarDireccion
                    onClose={() => setMostrarModal(false)}
                    onSave={handleSaveDireccion}
                />
            )}

            {/* Botón de Mercado Pago solo si hay preferenceId */}
            {preferenceId && (
                <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                    <Wallet initialization={{ preferenceId }} />
                </div>
            )}
        </div>
    )
}
