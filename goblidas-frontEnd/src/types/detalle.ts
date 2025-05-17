import { Precio } from './precio'
import { Producto } from './producto'
import { Imagen } from './imagen'

export type Detalle = {
    id: number
    precio_id: Precio
    producto_id: Producto
    imagen_id: Imagen
    talle_id: number
    color: string
    marca: string
    stock: number
    estado: boolean
}