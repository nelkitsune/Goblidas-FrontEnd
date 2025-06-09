import { Precio } from './precio'
import { Producto } from './producto'
import { Imagen } from './imagen'

export type Detalle = {
    id: number
    prizeId: Precio
    productIdj: Producto
    imagen_id: Imagen
    sizeId: number
    colour: string
    brand: string
    stock: number
    state: boolean
    active?: boolean
}