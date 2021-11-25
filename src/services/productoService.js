import axios from "axios";

const URL = `${process.env.REACT_APP_API}productos`;

//buscar todos o filtrar
const obtenerProductos = async (busqueda = "") => {
    try {
        let { data } = await axios.get(`${URL}?search=${busqueda}`);
        return data;
    } catch (error) {
        throw error;
    }
};

//obtener un solo producto por su ID
const obtenerProductoPorId = async (id) => {
    try {
        let { data } = await axios.get(`${URL}/${id}`);
        return data;
    } catch (error) {
        throw error;
    }
};

//obtener producto por su categoria
const obtenerProductosPorCat = async (idCategoria) => {
    try {
        let { data } = await axios.get(`${URL}?categoria_id=${idCategoria}`);
        return data;
    } catch (error) {
        throw error;
    }
};

//obtener productos pero limitar la cantidad y página por página, como grupitos
const obtenerProductosPorPagina = async (pagina = 1, limite = 9) => {
    try {
        let { data } = await axios.get(`${URL}?page=${pagina}&limit=${limite}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export { obtenerProductos, obtenerProductoPorId, obtenerProductosPorCat, obtenerProductosPorPagina };
