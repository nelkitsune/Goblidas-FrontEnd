import React, { useEffect, useState } from 'react'
import { CardProducto } from '../CardProducto/CardProducto'
import './MenuCategoriaEstilo.css'
import { useProductoStore } from '../../../store/useProductoStore';

export const MenuCategoria = () => {
    const detalles = useProductoStore((state) => state.detalles);
    const setDetalles = useProductoStore((state) => state.setDetalles);
    const [productos, setProductos] = useState<any[]>([]);

    // Datos de prueba (mock)
    useEffect(() => {
        setDetalles([
            {
                id: 1,
                precio_id: { id: 1, precio_compra: 100, precio_venta: 150 },
                producto_id: { id: 1, tipo_producto: 1, categoria_id: 1, nombre: "Zapatilla", sexo: "Unisex" },
                imagen_id: { id: 1, url: "https://acdn-us.mitiendanube.com/stores/001/467/692/products/img_62511-acf7f1bcce9e543bac16596220978258-1024-1024.jpg" },
                talle_id: 1,
                color: "Negro",
                marca: "Nike",
                stock: 10,
                estado: true
            },
            {
                id: 2,
                precio_id: { id: 2, precio_compra: 200, precio_venta: 250 },
                producto_id: { id: 2, tipo_producto: 2, categoria_id: 2, nombre: "Remera", sexo: "Hombre" },
                imagen_id: { id: 2, url: "https://www.dexter.com.ar/dw/image/v2/BDTF_PRD/on/demandware.static/-/Sites-365-dabra-catalog/default/dwc772bd01/products/NIDH3158-003/NIDH3158-003-1.JPG?sw=600&sh=600" },
                talle_id: 2,
                color: "Blanco",
                marca: "Adidas",
                stock: 5,
                estado: true
            }
        ]);
    }, [setDetalles]);

    useEffect(() => {
        setProductos(detalles)
    }, [detalles]);

    return (
        <div className='menuCategoria'>
            {productos.map((producto) => (
                <CardProducto
                    key={producto.id}
                    nombreProducto={producto.producto_id.nombre}
                    precio={producto.precio_id.precio_venta}
                    img={producto.imagen_id.url}
                    id={producto.id}
                />
            ))}
        </div>
    )
}
