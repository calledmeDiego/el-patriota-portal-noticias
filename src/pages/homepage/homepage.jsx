
import TarjetaNoticia from "../../components/tarjeta_noticia/tarjetaNoticia";

import { newsData } from "../../data/noticias";

import useGuardados from "../../hooks/useGuardados";

import "./HomePage.css";
import Portada from "../../components/portada/portada";

function HomePage() {
  const {
    estaGuardada,
    alternarGuardado
  } = useGuardados();

  const noticiasRecientes = [...newsData]
  .sort(
    (a, b) =>
      new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion)
  )
  .slice(0, 3);
  return (
    <main className="homepage">
      <Portada />

      <section className="news-feed">
        <div className="feed-heading">
          <div>
            <span className="section-label">Actualidad</span>
            <h2>Últimas noticias</h2>
          </div>

          <span className="news-count">{noticiasRecientes.length} noticias</span>
        </div>

        {noticiasRecientes.map((news) => (
          <TarjetaNoticia key={news.id} news={news} guardada={estaGuardada(news)} onGuardar={alternarGuardado}/>
        ))}
      </section>
    </main>
  );
}

export default HomePage;
