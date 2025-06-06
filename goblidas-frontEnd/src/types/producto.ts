import { Categoria } from './categoria'
import { Detalle } from './detalle'
export type Producto = {
    id: number
    productType: string
    categoriesIds: Categoria[]
    name: string
    gender: string
    details: Detalle[];
}