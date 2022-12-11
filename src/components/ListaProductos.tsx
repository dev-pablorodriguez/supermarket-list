import IStateProductosProps from '../interfaces/Producto/IStateProductosProps'
import Producto from './Producto'

const ListaProductos = ({ productos }: IStateProductosProps) => {
  return (
    <div className='mt-3'>
        {
            productos.map( producto =>
                <Producto
                    key={ producto.id }
                    producto={ producto }
                />
            )
        }
    </div>
  )
}

export default ListaProductos