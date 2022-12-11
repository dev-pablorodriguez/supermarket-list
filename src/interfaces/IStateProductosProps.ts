import IProducto from "./Producto/IProducto";

export default interface IStateProductosProps {
    productos: IProducto[]
    setProductos: (productos: IProducto[]) => void 
}