
import { useSyncExternalStore, useState, useEffect } from "react";

const STORAGE_KEY = "el-patriota-guardados";

// Estado compartido por toda la aplicación.
let noticiasGuardadas = cargarNoticias();

const suscriptores = new Set();

function cargarNoticias() {
  try {
    const datos = localStorage.getItem(STORAGE_KEY);
    return datos ? JSON.parse(datos) : [];
  } catch {
    return [];
  }
}

function notificarCambios() {
  suscriptores.forEach((actualizar) => actualizar());
}

function suscribirse(callback) {
  suscriptores.add(callback);

  // Escucha cambios realizados en otras pestañas.
  const escucharStorage = (event) => {
    if (event.key === STORAGE_KEY) {
      noticiasGuardadas = cargarNoticias();
      notificarCambios();
    }
  };

  window.addEventListener("storage", escucharStorage);

  return () => {
    suscriptores.delete(callback);
    window.removeEventListener("storage", escucharStorage);
  };
}

function obtenerSnapshot() {
  return noticiasGuardadas;
}

function guardarEnStorage(noticias) {
  noticiasGuardadas = noticias;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(noticias));
  } catch (error) {
    console.error("No se pudieron guardar las noticias:", error);
  }

  notificarCambios();
}

function obtenerId(noticia) {
  return noticia.id ?? noticia.articleUrl ?? noticia.url;
}

function useGuardados() {
  const noticias = useSyncExternalStore(
    suscribirse,
    obtenerSnapshot,
    obtenerSnapshot
  );

  // Estado del aviso.
  const [aviso, setAviso] = useState({
    mostrar: false,
    mensaje: "",
  });

  // Ocultar automáticamente después de 2.5 segundos.
  useEffect(() => {
    if (!aviso.mostrar) return;

    const temporizador = setTimeout(() => {
      setAviso({
        mostrar: false,
        mensaje: "",
      });
    }, 2500);

    return () => clearTimeout(temporizador);
  }, [aviso]);

  // Mostrar mensaje.
  const mostrarAviso = (mensaje) => {
    setAviso({
      mostrar: true,
      mensaje,
    });
  };

  // Comprobar si una noticia está guardada.
  const estaGuardada = (noticia) => {
    return noticias.some(
      (item) => obtenerId(item) === obtenerId(noticia)
    );
  };

  // Guardar o quitar una noticia.
  const alternarGuardado = (noticia) => {
    const id = obtenerId(noticia);

    if (id == null) {
      console.error("La noticia necesita un id o una URL única.");
      return;
    }

    const existe = noticiasGuardadas.some(
      (item) => obtenerId(item) === id
    );

    const actualizadas = existe
      ? noticiasGuardadas.filter(
          (item) => obtenerId(item) !== id
        )
      : [...noticiasGuardadas, noticia];

    guardarEnStorage(actualizadas);

    mostrarAviso(
      existe
        ? "Noticia eliminada de guardados"
        : "Noticia guardada"
    );
  };

  // Quitar una noticia directamente.
  const quitarGuardado = (noticia) => {
    const id = obtenerId(noticia);

    if (id == null) return;

    const existe = noticiasGuardadas.some(
      (item) => obtenerId(item) === id
    );

    if (!existe) return;

    const actualizadas = noticiasGuardadas.filter(
      (item) => obtenerId(item) !== id
    );

    guardarEnStorage(actualizadas);

    mostrarAviso("Noticia eliminada de guardados");
  };

  return {
    noticiasGuardadas: noticias,
    estaGuardada,
    alternarGuardado,
    quitarGuardado,
    aviso,
  };
}

export default useGuardados;
