import axios from "axios";

const URL = `${process.env.REACT_APP_API}categorias`; //equivale a obtener las categorias

//buscar todos o filtrar
const obtenerCategorias = async () => {
    try {
        let { data } = await axios.get(URL);
        return data;
    } catch (error) {
        throw error;
    }
};

export { obtenerCategorias };
