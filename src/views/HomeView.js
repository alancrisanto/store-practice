import GrupoProdHome from "../components/GrupoProdHome";
import GroupCategoria from "../components/GroupCategoria";
import HeaderCarousel from "../components/HeaderCarousel";

export default function HomeView() {
    return (
        <div>
            <HeaderCarousel/>
            <h2 className="text-center">Categorias</h2>
            <GroupCategoria />
            <h2 className="text-center">Últimas novedades</h2>
            <GrupoProdHome />
        </div>
    );
}
