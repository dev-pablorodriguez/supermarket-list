import { createContext } from 'react'
import { Firebase } from './firebase';

const FirebaseContext = createContext<Firebase>({} as Firebase);

export default FirebaseContext;