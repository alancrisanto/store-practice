import { useContext } from "react";

import { AuthContext } from "../context/authContext";

export default function LoginView() {
    const { signIn } = useContext(AuthContext);

    return (
        <button className="btn btn-danger btn-lg" onClick={signIn}>
            Ingresa con Google
        </button>
    );
}
