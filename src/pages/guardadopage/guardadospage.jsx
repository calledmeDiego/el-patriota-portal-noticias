import TarjetaGuardado from "../../components/tarjeta-guardado/tarjetaGuardado";
import useGuardados from "../../hooks/useGuardados";
import "./guardadosPage.css";

function GuardadosPage() {
  // Reemplazar por el estado real de noticias guardadas.
  const { noticiasGuardadas, quitarGuardado } = useGuardados();
  
  const total = noticiasGuardadas.length;

  const leer = (noticia) => {};
  const verificar = (noticia) => {};
  const quitar = (noticia) => {};

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
                  onLeer={() => leer(noticia)}
                  onVerificar={() => verificar(noticia)}
                  onQuitar={() => quitar(noticia)}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default GuardadosPage;
