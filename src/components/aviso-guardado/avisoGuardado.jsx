import './avisoGuardado.css'
function AvisoGuardado({ mostrar, mensaje }) {
  if (!mostrar) return null;

  const eliminado = mensaje.toLowerCase().includes("eliminada");

  return (
    <div
      className={`toast show position-fixed bottom-0 end-0 m-4 aviso-guardado ${
        eliminado ? "aviso-guardado--eliminado" : ""
      }`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="toast-body d-flex align-items-center gap-3">
        <i
          className={`bi ${
            eliminado ? "bi-bookmark-x" : "bi-bookmark-check"
          } aviso-guardado__icono`}
        ></i>

        <span className="aviso-guardado__mensaje">
          {mensaje}
        </span>
      </div>
    </div>
  );
}

export default AvisoGuardado;
