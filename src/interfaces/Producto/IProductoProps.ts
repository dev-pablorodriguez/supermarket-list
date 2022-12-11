import IStateProductosProps from "../IStateProductosProps";
import IProducto from "./IProducto";

export default interface IProductoProps extends IStateProductosProps {
    key: string
    producto: IProducto
}