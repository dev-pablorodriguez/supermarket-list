import { useContext } from 'react'
import IProductoProps from '../interfaces/Producto/IProductoProps'
import { TrashFill } from 'react-bootstrap-icons'

import { FirebaseContext } from '../firebase'

const Producto = ({ producto, isDeleteMode }: IProductoProps) => {
    const firebase = useContext(FirebaseContext);
    const { id, title, inPossesion } = producto;

    const actualizarProducto = () => {
        producto.inPossesion = !inPossesion;
        firebase.updateProduct(producto);
    }

    const eliminarProducto = () => {
        firebase.deleteProduct(id)
    }

    const titleStyle = () => {
        return `mx-2 ${ inPossesion ? 'text-decoration-line-through text-secondary' : '' }`
    }

    return (
        <div className='d-flex justify-content-between p-2 border'>
            <div className={ titleStyle() }>{ title.toUpperCase() }</div>
            <div>
                {
                    isDeleteMode ?
                    <button
                        className='btn btn-sm btn-outline-danger'
                        onClick={ eliminarProducto }
                    >
                        <TrashFill size={ 16 } />
                    </button>
                    :
                    <input
                        type='checkbox' 
                        className='mx-2 form-check-input'
                        checked={ inPossesion }
                        onChange={ actualizarProducto }
                    />
                }
            </div>
            
        </div>
    )
}

export default Producto