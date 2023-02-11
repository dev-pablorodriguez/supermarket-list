import IProducto from "./IProducto";

export default interface IStateProductosProps {
    productos: IProducto[]
    isDeleteMode: boolean
}