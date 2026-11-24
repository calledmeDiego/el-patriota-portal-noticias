import TarjetaGuardado from "../../components/tarjeta-guardado/tarjetaGuardado";
import useGuardados from "../../hooks/useGuardados";
import ModalNoticia from "../../components/modal-noticia/modalNoticia";
import AvisoGuardado from "../../components/aviso-guardado/avisoGuardado"; 
import "./guardadospage.css";
import { useState } from "react";

function GuardadosPage() {

  const { noticiasGuardadas, alternarGuardado, estaGuardada, aviso } = useGuardados();
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);
  
  const total = noticiasGuardadas.length;

  return (
    <main
      className="container-fluid px-4 py-4 guardados-page"
      id="contenido"
      tabIndex={-1}
    >
      <header className="guardados-header">
        <p className="guardados-eyebrow">
          Edición de demostración · Contenido de ejemplo
        </p>

        <h1 className="guardados-title">Mis guardados</h1>
      </header>

      <section className="guardados-contenido" aria-label="Noticias guardadas">
        <p className="guardados-contador" role="status">
          {total} {total === 1 ? "noticia" : "noticias"}
        </p>

        {total === 0 ? (
          <div className="guardados-vacio">
            <p>
              Guarda una noticia desde la portada para volver a leerla aquí.
            </p>
          </div>
        ) : (
          <div className="row g-4 guardados-lista">
            {noticiasGuardadas.map((noticia) => (
              <div className="col-12 col-md-6 col-xl-4" key={noticia.id}>
                <TarjetaGuardado
                  noticia={noticia}
                  onLeer={setNoticiaSeleccionada}
                  onVerificar={() => console.log('')}
                  onQuitar={() => alternarGuardado(noticia)}
                />
              </div>
            ))}
          </div>
        )}
      </section>
      <ModalNoticia noticia={noticiaSeleccionada}
        onCerrar={() => setNoticiaSeleccionada(null)}
        onGuardar={alternarGuardado}
        guardada={noticiaSeleccionada ? estaGuardada(noticiaSeleccionada) : false}
      />
      <AvisoGuardado mostrar={aviso.mostrar} mensaje={aviso.mensaje} />
    </main>
  );
}

export default GuardadosPage;
