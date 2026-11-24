import { useMemo, useState } from "react";

import Destacados from "./destacados";
import NotaPortada from "./notaPortada";
import ContrasteMedios from "./contrasteMedios";
import { newsData }  from "../../data/noticias";
import "./portada.css";
import ModalNoticia from "../../components/modal-noticia/modalNoticia";
import useGuardados from "../../hooks/useGuardados";

function Portada() {
  
  const contrasteTransporte = {
    titulo: "Debate sobre el transporte urbano en Lima",
    medios: [
      {
        nombre: "El Comercio",
        enfoque: "Enfoque en subsidios y fiscalización de las concesiones.",
      },
      {
        nombre: "RPP Noticias",
        enfoque: "Enfoque en usuarios, frecuencia y precio del pasaje.",
      },
    ],
    puntosComunes: [
      "La calidad del servicio afecta los desplazamientos diarios.",
      "La tarifa y la fiscalización son parte del debate.",
    ],

    descripcion: "Comparación ilustrativa del proyecto académico.",
  };

  const { estaGuardada, alternarGuardado } = useGuardados();
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);
  const [indice, setIndice] = useState(0);
  

  const ordenadas = useMemo(
    () => newsData
      .filter((noticia) => noticia.destacado === true)
      .sort((a, b) =>
        b.fechaPublicacion.localeCompare(a.fechaPublicacion)
      ),
    [],
  );
  const total = ordenadas.length;

  const principal = ordenadas[indice];
  const siguiente = total > 1 ? ordenadas[(indice + 1) % total] : null;

  // Circular: después de la última vuelve a la primera
  const mover = (paso) => setIndice((indice + paso + total) % total);

  return (
    <main className="portada container-fluid">
      <header className="portada__header">
        <h1 className="portada__titulo">Portada</h1>
      </header>

      <div className="row gx-4 gy-4 gy-lg-0 portada__contenido">
        <section className="col-12 col-lg-8 portada__principal">
          <Destacados
            noticia={principal}
            posicion={indice}
            total={total}
            onAnterior={() => mover(-1)}
            onSiguiente={() => mover(1)}
            onGuardar={alternarGuardado}
            guardada={principal ? estaGuardada(principal) : false}
            onLectura={setNoticiaSeleccionada}
          />
        </section>

        <aside className="col-12 col-lg-4 portada__lateral">
          {siguiente && (
            <section className="portada__siguiente d-none d-lg-flex">
              <NotaPortada
                noticia={siguiente}
                secundaria
                onGuardar={alternarGuardado}
                guardada={estaGuardada(siguiente)}
                onSeleccionar={() => mover(1)}
                onLectura={setNoticiaSeleccionada}
              />
            </section>
          )}

          <section className="portada__contraste">
            <ContrasteMedios contraste={contrasteTransporte} />
          </section>
        </aside>
      </div>
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

export default Portada;
