import React from 'react'
import IStateProductosProps from '../interfaces/IStateProductosProps'
import Producto from './Producto'

const ListaProductos = ({ productos, setProductos }: IStateProductosProps) => {
  return (
    <div className='mt-3'>
        {
            productos.map( producto =>
                <Producto
                    key={ producto.id }
                    producto={ producto }
                    productos={ productos }
                    setProductos={ setProductos }
                />
            )
        }
    </div>
  )
}

export default ListaProductos