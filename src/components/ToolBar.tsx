import React, { useState, useContext } from 'react'
import IProducto from '../interfaces/Producto/IProducto'

import { FirebaseContext } from '../firebase'

const ToolBar = ({ isDeleteMode, setIsDeleteMode }: any) => {
    const [title, setTitle] = useState<string>('')
    const [textAreaProducts, setTextAreaProducts] = useState<string>('')

    const firebase = useContext(FirebaseContext);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(title.trim() === ''){
            return;
        }

        const nuevoProducto = getNewProduct(title)

        firebase.addProduct(nuevoProducto)

        setTitle('')
    }

    const onInputChange = ({ currentTarget }: React.FormEvent<HTMLInputElement>) => {
        setTitle(currentTarget.value)
    }

    const onTextAreaChange = ({ currentTarget }: React.FormEvent<HTMLTextAreaElement>) =>{
        setTextAreaProducts(currentTarget.value)
    }

    const agregarMultiplesProductos = () => {
        if(textAreaProducts.trim() === ''){
            return;
        }
        const nuevosProductos = textAreaProducts.split(/\r?\n|\r|\n/g);

        nuevosProductos.forEach( title => {
            if(title.trim() === ''){
                return;
            }

            const nuevoProducto = getNewProduct(title)

            firebase.addProduct(nuevoProducto)
        })

        setTextAreaProducts('')
    }

    const getNewProduct = (title: string): IProducto => {
        return {
            id: '',
            title: title,
            inPossesion: false,
            created: new Date()
        }
    }

    return (
        <div className='mt-5'>
            <div className='mb-4'>
                <div className="row">
                    <div className="col m-1">
                        <button
                            className='btn btn-primary'
                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                        >
                            Copiar Productos del Portapapeles
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col m-1">
                        <button
                            onClick={ () => setIsDeleteMode(!isDeleteMode) }
                            className={ isDeleteMode ? 'btn btn-warning m-1' : 'btn btn-danger m-1' }
                        >
                            { isDeleteMode ? 'Salir Modo Eliminación' : 'Entrar Modo Eliminación' }
                        </button>
                    </div>
                </div>
            </div>
            <form onSubmit={ handleSubmit }>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Agregar Producto'
                    value={ title }
                    onChange={ onInputChange }
                />
            </form>
            <div className="modal fade" id='exampleModal'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Copiar Productos del Portapapeles</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <textarea
                                placeholder='Pega tus productos aquí'
                                className='form-control'
                                rows={ 10 }
                                value={ textAreaProducts }
                                onChange={ onTextAreaChange }
                            ></textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button
                                type="button" 
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={ agregarMultiplesProductos }
                            >Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToolBar