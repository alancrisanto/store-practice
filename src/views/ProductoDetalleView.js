import { useState, useEffect, useContext } from "react";
import { CarritoContext } from "../context/carritoContext";
import { useParams, useNavigate } from "react-router";
import { obtenerProductoPorId } from "../services/productoService";
import { obtenerCategorias } from "../services/categoriaService";
import ReactImageMagnify from "react-image-magnify";


export default function ProductoDetalleView() {
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [categoria, setCategoria] = useState("");

    const { id } = useParams(); //un objeto con todos los parámetros de la URL

    const navigate = useNavigate();

    const { anadirACarrito } = useContext(CarritoContext);

    const getProducto = async () => {
        try {
            const prodObtenido = await obtenerProductoPorId(id);
            const catObtenidas = await obtenerCategorias();
            const catProducto = catObtenidas.find((cat) => cat.id === prodObtenido.categoria_id);
            setProducto(prodObtenido);
            setCategoria(catProducto); //todo el objeto de la categoria, id, nombre, descripcion e imagen
        } catch (error) {
            console.log(error);
        }
    };

    const modificarCantidad = (numero) => {
        if (cantidad + numero === 0 || cantidad + numero === 11) {
            return; //corta la ejecución
        }
        setCantidad(cantidad + numero);
    };

    const anadirACarritoContext = () => {
        const { id, nombre, precio } = producto;
        /**   {   id: producto.id,
			nombre: producto.nombre,
			precio: producto.precio,
			cantidad: cantidad,
			}; */
        const nuevoProducto = {
            id,
            nombre,
            precio,
            cantidad,
        };
        anadirACarrito(nuevoProducto);
    };
    const ejecutarComprarAhora = () => {
        anadirACarritoContext();
        navigate("/checkout");
    };


    useEffect(() => {
        getProducto();
    }, []);

    return (
        <>
            <div
                className="title-product py-5 mb-5"
                style={{
                    backgroundImage: `url('${categoria.imagen}')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            >
                <h2 className="fw-bold container">
                    {/* si categoria existe, pregunta por la propiedad nombre */}
                    {categoria?.nombre} - {producto?.nombre}
                </h2>
            </div>
            <div className="container">
                {/* en muchos casos es necesario y recomendable validar si algo es undefined o null */}
                <div className="row my-3">
                    {/* si producto no es null, undefined o algún valor falsy, muestro el producto*/}
                    {producto ? (
                        <>
                            <div className="col-12 col-md-6">
                                {/* cambiar imagen */}
                                {/* <img src={producto.imagen} alt={producto.nombre} className="img-fluid" /> */}
                                <ReactImageMagnify
                                    {...{
                                        smallImage: {
                                            alt: producto.nombre,
                                            isFluidWidth: true,
                                            src: producto.imagen,
                                        },
                                        largeImage: {
                                            src: producto.imagen,
                                            width: 1600,
                                            height: 1200,
                                        },
                                    }}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <h4>{producto.nombre}</h4>
                                <h3>S/ {producto.precio}</h3>
                                <hr />
                                <p>{producto.descripcion}</p>
                                <div className="d-flex">
                                    <button
                                        className="btn btn-dark"
                                        onClick={() => {
                                            modificarCantidad(-1);
                                        }}
                                    >
                                        <i className="fas fa-minus"></i>
                                    </button>
                                    <h4 className="mx-2">{cantidad}</h4>
                                    <button
                                        className="btn btn-dark"
                                        onClick={() => {
                                            modificarCantidad(1);
                                        }}
                                    >
                                        <i className="fas fa-plus"></i>
                                    </button>
                                    <button className="btn btn-outline-dark ms-3" onClick={anadirACarritoContext}>
                                        <i className="fas fa-cart-plus"></i> Añadir a carrito
                                    </button>
                                </div>
                                <button className="btn btn-outline-dark btn-lg mt-2" onClick={ejecutarComprarAhora}>Comprar ahora!</button>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </>
    );
}
