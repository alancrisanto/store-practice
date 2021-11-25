export default function CategoriaBox({ categoria }) {
    return (
        <div className="categoria-box">
            <div className="categoria-body">
                <h5 className="fw-bold">{categoria.nombre}</h5>
                <small>Ver más...</small>
            </div>
            <img src={categoria.imagen} alt={categoria.nombre} className="categoria-img" />
        </div>
    );
}
