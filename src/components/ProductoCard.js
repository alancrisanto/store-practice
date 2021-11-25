import { Link } from "react-router-dom";

//eventualmente le pasaremos un producto
const ProductoCard = ({ producto }) => {
    return (
        <Link className="card mb-3" to={`/detalleproducto/${producto.id}`}>
            <img className="card-img-top" src={producto.imagen} alt={producto.nombre} />
            <div className="card-body text-center">
                <h5 className="card-title">{producto.nombre}</h5>
                <p>S/ {producto.precio}</p>
            </div>
        </Link>
    );
};

export default ProductoCard;
