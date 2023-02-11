import firebaseConfig from './config';

import { FirebaseApp, initializeApp } from 'firebase/app';
import {
    Firestore,
    getFirestore,
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
    setDoc
} from 'firebase/firestore'

import IProducto from '../interfaces/Producto/IProducto';

export class Firebase {
    private _db: Firestore;

    constructor(){
        const app: FirebaseApp = initializeApp(firebaseConfig);
        this._db = getFirestore(app);
    }

    getProductsFromFirestoreAndSetThemInState(setProductos: React.Dispatch<React.SetStateAction<IProducto[]>>){
        try {
            const col = collection(this._db, 'productos')

            const unsuscribe = onSnapshot(query(col, orderBy('inPossesion')), querySnapshot => {
                const productos: IProducto[] = [];
                querySnapshot.forEach(doc => {
                    const { title, inPossesion, created } = doc.data()
                    productos.push({
                        id: doc.id,
                        title,
                        inPossesion,
                        created
                    });
                })

                setProductos(productos);
            })

        } catch (error) {
            console.log(error);
        }
    }

    async addProduct(producto: IProducto): Promise<boolean>{
        try {
            const col = collection(this._db, 'productos')
            const { title, inPossesion, created } = producto;
            await addDoc(col, {
                title,
                inPossesion,
                created
            })

            return true;
        } catch (error) {
            console.log(error)

            return false;
        }
    }

    async deleteProduct(id: string): Promise<boolean>{
        try {
            const document = doc(this._db, 'productos', id)
            await deleteDoc(document);

            return true;
        } catch (error) {
            console.log(error)

            return false;
        }
    }

    async updateProduct(producto: IProducto): Promise<boolean>{
        try {
            const { id, title, inPossesion, created } = producto

            const document = doc(this._db, 'productos', id)
            await setDoc(document, {
                title,
                inPossesion,
                created
            })

            return true;
        } catch (error) {
            console.log(error)

            return false;
        }
    }
}

const firebase = new Firebase();

export default firebase;