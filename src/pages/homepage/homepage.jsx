
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
  return (
    <main className="homepage">
      <Portada />

      <section className="news-feed">
        <div className="feed-heading">
          <div>
            <span className="section-label">Actualidad</span>
            <h2>Últimas noticias</h2>
          </div>

          <span className="news-count">{newsData.length} noticias</span>
        </div>

        {newsData.map((news) => (
          <TarjetaNoticia key={news.id} news={news} guardada={estaGuardada(news)} onGuardar={alternarGuardado}/>
        ))}
      </section>
    </main>
  );
}

export default HomePage;
