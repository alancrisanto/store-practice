import { useState, useEffect, createContext } from "react";

import { auth, firebase } from "../config/Firebase";

//para poder ejecutar las funciones de ingresar, salir y ver el estado del login
export const AuthContext = createContext();

const proveedorGoogle = new firebase.auth.GoogleAuthProvider();

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState(null);

    //Logueo
    const signIn = async () => {
        //para loguearte abre una ventanita. signInWithPopup(proveedor)
        const rptaGoogle = await auth.signInWithPopup(proveedorGoogle);
    };

    //Deslogueo
    const signOut = () => auth.signOut();

    useEffect(() => {
        //en caso el usuario ingrese o salga de la app, se va a disparar esta funcion para ver que hay
        //si no esta logueado o si sale, retornará null
        //si se logue retornará un objeto
        return auth.onAuthStateChanged((user) => {
            //user es null(no logueado), o es un objeto(logueado)
            setUser(user);
        });
    }, []);

    return (
        <AuthContext.Provider
            // value es lo que va a brindar desde su estado global
            value={{ user, signIn, signOut }}
        >
            {/* Provider va a funcionar como una caja generica transparente, componente genérico que va a contener otros componentes pero sin saber exactamente que componentes son */}
            {props.children}
        </AuthContext.Provider>
    );
};
