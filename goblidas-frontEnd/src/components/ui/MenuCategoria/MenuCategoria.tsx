
import { CardProducto } from '../CardProducto/CardProducto'
import './MenuCategoriaEstilo.css'
import { useDetalleStore } from '../../../store/useDetalleStore';
import { Producto } from '../../../types/producto';

export const MenuCategoria = ({ productos }: { productos: any[] }) => {

    const setDetalleActivo = useDetalleStore((state) => state.setDetalleActivo);

    const buscarPrecio = (producto: Producto): number => {
        if (!producto.details || producto.details.length === 0) return 0;
        const detalleActivo = producto.details.find((detalle) => detalle.state === true);
        setDetalleActivo(detalleActivo ?? null);
        return detalleActivo?.prizeId?.sellingPrice ?? 0;
    };
    return (
        <div className='menuCategoria'>
            {productos
                .filter(producto =>
                    producto.details &&
                    producto.details.length > 0 &&
                    producto.details.some((detalle: any) => detalle.state === true)
                )
                .map((producto) => (
                    <CardProducto
                        key={producto.id}
                        id={producto.id}
                        nombreProducto={producto.name}
                        precio={buscarPrecio(producto)}
                        producto={producto}
                    />
                ))}
        </div>
    )
}
