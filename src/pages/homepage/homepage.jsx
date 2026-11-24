
import TarjetaNoticia from "../../components/tarjeta_noticia/tarjetaNoticia";
import ModalNoticia from "../../components/modal-noticia/modalNoticia";
import { newsData } from "../../data/noticias";

import useGuardados from "../../hooks/useGuardados";
import { useState } from "react";
import "./HomePage.css";
import Portada from "../../components/portada/portada";

function HomePage() {
  const {
    estaGuardada,
    alternarGuardado
  } = useGuardados();
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);

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

        {noticiasRecientes.map((noticia) => (
          <TarjetaNoticia key={noticia.id} noticia={noticia} guardada={estaGuardada(noticia)} onGuardar={alternarGuardado} onLectura={setNoticiaSeleccionada}/>
        ))}
      </section>
      <ModalNoticia
        noticia={noticiaSeleccionada}
        onCerrar={() => setNoticiaSeleccionada(null)}
        onGuardar={alternarGuardado}
        guardada={
          noticiaSeleccionada ? estaGuardada(noticiaSeleccionada) : false
        }
      />
    </main>
  );
}

export default HomePage;
