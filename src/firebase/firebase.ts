import firebaseConfig from './config';

import { FirebaseApp, initializeApp } from 'firebase/app';
import {
    Firestore,
    getFirestore,
    collection,
    query,
    // where,
    getDocs,
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

    async getProducts(): Promise<IProducto[]>{
        const productos: IProducto[] = [];

        try {
            const col = collection(this._db, 'productos')
            // const q = query(col, where('inPossesion', '==', false));
            const q = query(col);


            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(doc => {
                const { title, inPossesion } = doc.data()
                productos.push({
                    id: doc.id,
                    title,
                    inPossesion
                });
            })
        } catch (error) {
            console.log(error)
        }

        return productos;
    }

    async addProduct(producto: IProducto): Promise<boolean>{
        try {
            const col = collection(this._db, 'productos')
            await addDoc(col, {
                title: producto.title,
                inPossesion: producto.inPossesion
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
            const { id, title, inPossesion } = producto

            const document = doc(this._db, 'productos', id)
            await setDoc(document, {
                title: title,
                inPossesion: inPossesion
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