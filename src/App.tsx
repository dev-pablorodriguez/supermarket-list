import { useState, useEffect } from 'react';
import Agregar from './components/Agregar';
import ListaProductos from './components/ListaProductos';
import IProducto from './interfaces/Producto/IProducto';

import firebase, { FirebaseContext } from './firebase'

function App() {
  const [productos, setProductos] = useState<IProducto[]>([]);

  useEffect(() => {
    firebase.getProductsFromFirestoreAndSetThemInState(setProductos);
  }, [])

  return (
    <FirebaseContext.Provider value={ firebase }>
      <div className='container'>
        <div className='row text-center justify-content-center'>
          <div className="col-sm-12 col-md-9">
            <div className='bg-success p-2 text-white font-bold'>
              <h1>Lista Supermercado</h1>
            </div>
            <Agregar />
            
            <ListaProductos
              productos={ productos }
            />
          </div>
        </div>
      </div>
    </FirebaseContext.Provider>
  );
}

export default App;
