
import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'el-patriota-guardados';

function cargarNoticias() {
  try {
    const datos = localStorage.getItem(STORAGE_KEY);
    return datos ? JSON.parse(datos) : [];
  } catch {
    return [];
  }
}

// Estado compartido por toda la aplicación.
let noticiasGuardadas = cargarNoticias();

const suscriptores = new Set();

function notificarCambios() {
  suscriptores.forEach((actualizar) => actualizar());
}

function suscribirse(callback) {
  suscriptores.add(callback);

  // También escucha cambios realizados en otras pestañas.
  const escucharStorage = (event) => {
    if (event.key === STORAGE_KEY) {
      noticiasGuardadas = cargarNoticias();
      notificarCambios();
    }
  };

  window.addEventListener('storage', escucharStorage);

  return () => {
    suscriptores.delete(callback);
    window.removeEventListener('storage', escucharStorage);
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
    console.error('No se pudieron guardar las noticias:', error);
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

  const estaGuardada = (noticia) => {
    return noticias.some(
      (item) => obtenerId(item) === obtenerId(noticia)
    );
  };

  const alternarGuardado = (noticia) => {
    const id = obtenerId(noticia);

    if (id == null) {
      console.error('La noticia necesita un id o una URL única.');
      return;
    }

    const existe = noticiasGuardadas.some(
      (item) => obtenerId(item) === id
    );

    const actualizadas = existe
      ? noticiasGuardadas.filter((item) => obtenerId(item) !== id)
      : [...noticiasGuardadas, noticia];

    guardarEnStorage(actualizadas);
  };

  const quitarGuardado = (noticia) => {
    const id = obtenerId(noticia);

    guardarEnStorage(
      noticiasGuardadas.filter(
        (item) => obtenerId(item) !== id
      )
    );
  };

  return {
    noticiasGuardadas: noticias,
    estaGuardada,
    alternarGuardado,
    quitarGuardado
  };
}

export default useGuardados;
