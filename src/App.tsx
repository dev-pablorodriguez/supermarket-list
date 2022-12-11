import React, { useState } from 'react';
import Agregar from './components/Agregar';
import ListaProductos from './components/ListaProductos';
import IProducto from './interfaces/Producto/IProducto';

function App() {
  const [productos, setProductos] = useState<IProducto[]>([]);

  return (
    <div className='container'>
      <div className='row text-center justify-content-center'>
        <div className="col-sm-12 col-md-9">
          <div className='bg-success p-2 text-white font-bold'>
            <h1>Lista Supermercado</h1>
          </div>
          <Agregar
            productos={ productos }
            setProductos={ setProductos }
          />
          
          <ListaProductos
            productos={ productos }
            setProductos={ setProductos }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
