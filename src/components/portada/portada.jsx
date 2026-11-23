import { useMemo, useState } from "react";

import Destacados from "./destacados";
import NotaPortada from "./notaPortada";
import ContrasteMedios from "./contrasteMedios";
import "./portada.css";

function Portada() {
  const portadaNoticias = [
    {
      id: "pensiones",
      fecha: "2026-11-22",
      category: "Economía",
      source: "El Comercio",
      titulo: "Congreso prioriza el debate de la reforma previsional",
      descripcion:
        "El prototipo presenta dos ejes de discusión: la pensión por consumo y su posible impacto en las finanzas públicas.",
      cuerpo:
        "En este escenario de prueba, la discusión enfrenta propuestas para ampliar la cobertura de pensiones y preguntas sobre cómo financiarlas. Al leer una cobertura real conviene distinguir el texto de un proyecto de ley, un dictamen y una norma ya aprobada.",
      url: "https://elcomercio.pe/economia/",
      imagen: {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Vista_panor%C3%A1mica_del_Hemiciclo_de_sesiones_del_Congreso_del_Peru_en_2023_-_53234664814.jpg/960px-Vista_panor%C3%A1mica_del_Hemiciclo_de_sesiones_del_Congreso_del_Peru_en_2023_-_53234664814.jpg",
      },
    },
    {
      id: "voley",
      fecha: "2026-11-22",
      category: "Deportes",
      source: "RPP Noticias",
      titulo: "Selección peruana de vóley debuta en el Sudamericano Juvenil",
      descripcion:
        "Una crónica de ejemplo repasa el desempeño del equipo juvenil y la respuesta de la afición limeña.",
      cuerpo:
        "El ejemplo muestra cómo una nota deportiva puede combinar el contexto del torneo, el desarrollo del encuentro y la perspectiva de los jugadores. Los resultados de un partido se deben contrastar con el acta de la organización.",
      url: "https://rpp.pe/deportes",
      imagen: {
        src: "https://peru21.pe/sites/default/efsfiles/2026-11/alianza-vs-san-martin.png",
      },
    },
    {
      id: "tasa",
      fecha: "2026-11-18",
      category: "Economía",
      source: "RPP Noticias",
      titulo: "Tasa de interés: qué observar antes de pedir un crédito",
      descripcion:
        "Una guía para distinguir la tasa de referencia del costo total de un préstamo.",
      cuerpo:
        "Las tasas que ofrecen las entidades dependen del producto, el plazo y el perfil del solicitante. Para comparar préstamos del mismo tipo, revisa el cronograma y la tasa de costo efectivo anual.",
      url: "https://rpp.pe/economia",
      imagen: {
        src: "https://tse1.mm.bing.net/th/id/OIP.OhECgU8eWgdUvxw_9wQUoAHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      },
    },

    {
      id: "privacidad",
      fecha: "2026-11-13",
      category: "Tecnología",
      source: "Google News",
      titulo: "Privacidad digital: revisa los permisos de tus aplicaciones",
      descripcion:
        "Ubicación, cámara y micrófono son algunos de los permisos que se pueden gestionar desde el teléfono.",
      cuerpo:
        "Revisa qué acceso necesita cada aplicación para cumplir la función que usas. En los ajustes del teléfono puedes modificar permisos y revisarlos de nuevo cuando cambie el uso de la aplicación.",
      url: "https://news.google.com/home?hl=es-419&gl=PE&ceid=PE:es-419",
      imagen: {
        src: "https://blog.personal.com.py/wp-content/uploads/2019/06/administrar-permisos-aplicaciones-moviles.jpg?x49650",
      },
    },
    {
      id: "conectividad",
      fecha: "2026-10-12",
      category: "Tecnología",
      source: "El Comercio",
      titulo: "Conectividad móvil: qué cambia al pasar de 4G a 5G",
      descripcion:
        "La cobertura, el equipo y las condiciones de uso influyen en la experiencia de conexión.",
      cuerpo:
        "Una red más rápida puede ayudar en tareas intensivas, como descargar archivos grandes. La experiencia también depende del despliegue local y de la congestión de la red.",
      url: "https://elcomercio.pe/tecnologia/",
      imagen: {
        src: "https://bitel.com.pe/upload/2005922/20251105/5g_banda_hancha_bitel_7bfea.webp.jpg",
      },
    },
  ];

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
  const [indice, setIndice] = useState(0);

  // Más recientes primero (con la misma fecha respeta el orden del array)
  const ordenadas = useMemo(
    () => [...portadaNoticias].sort((a, b) => b.fecha.localeCompare(a.fecha)),
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

      <div className="row g-4 portada__contenido">
        <section className="col-12 col-lg-8">
          <Destacados
            noticia={principal}
            posicion={indice}
            total={total}
            onAnterior={() => mover(-1)}
            onSiguiente={() => mover(1)}
          />
        </section>

        <aside className="col-12 col-lg-4 portada__lateral">
          {siguiente && (
            <section className="portada__siguiente">
              <NotaPortada
                noticia={siguiente}
                secundaria
                onSeleccionar={() => mover(1)}
              />
            </section>
          )}

          <section className="portada__contraste">
            <ContrasteMedios contraste={contrasteTransporte} />
          </section>
        </aside>
      </div>
    </main>
  );
}

export default Portada;
