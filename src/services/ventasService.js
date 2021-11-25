import axios from "axios";


const URL = `${process.env.REACT_APP_API}ventas`;

const guardarVenta = async (nuevaVenta) => {
    try {
        const headers = {
            "Content-Type":"application/json"
        }
        const {data} = await axios.post(URL, nuevaVenta, {headers})
    } catch (error) {
        throw error
    }
}

export {guardarVenta}