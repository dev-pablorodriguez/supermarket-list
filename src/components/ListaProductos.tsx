import IStateProductosProps from '../interfaces/Producto/IStateProductosProps'
import Producto from './Producto'

const ListaProductos = ({ productos, isDeleteMode }: IStateProductosProps) => {
  return (
    <div className='mt-3'>
        {
            productos.map( producto =>
                <Producto
                    key={ producto.id }
                    producto={ producto }
                    isDeleteMode={ isDeleteMode }
                />
            )
        }
    </div>
  )
}

export default ListaProductos