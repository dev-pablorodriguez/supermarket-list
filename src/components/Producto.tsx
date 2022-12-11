import React from 'react'
import IProductoProps from '../interfaces/Producto/IProductoProps'
import { TrashFill } from 'react-bootstrap-icons'
import IProducto from '../interfaces/Producto/IProducto';

const Producto = ({ producto, productos, setProductos }: IProductoProps) => {

    const { id, title, inPossesion } = producto;

    const actualizarProducto = () => {
        const productosActualizados: IProducto[] = productos.map( item => {
            if(producto.id === item.id){
                return { ...item, inPossesion: !item.inPossesion }
            }else{
                return item;
            }
        })

        setProductos(productosActualizados)
    }

    const eliminarProducto = () => {
        setProductos([ ...productos.filter( item => item.id !== id) ])
    }

    return (
        <div className='d-flex p-2 border'>
            <div className="d-flex flex-row-reverse col-sm-2 col-md-4 col-lg-4">
                <input
                    type='checkbox' 
                    className='mx-2 form-check-input'
                    checked={ inPossesion }
                    onChange={ actualizarProducto }
                />
            </div>
            <div className="d-flex col-sm-8 col-md-6 col-lg-7 mx-2">{ title.toUpperCase() }</div>
            <div className="d-flex col-sm-2 col-md-2 col-lg-1 mx-2">
                <button
                    className='btn btn-sm btn-outline-danger'
                    onClick={ eliminarProducto }
                ><TrashFill size={ 16 } /></button>
            </div>
            
        </div>
    )
}

export default Producto