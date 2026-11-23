
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './registerpage.css';

const benefits = [
  {
    icon: 'bi-bookmark-check',
    title: 'Tus noticias, en todos tus dispositivos.',
    shortTitle: 'Guarda y sincroniza tus noticias.',
    description:
      'Sincroniza tus artículos guardados entre tu celular y tu laptop.',
  },
  {
    icon: 'bi-eye',
    title: 'Una lectura a tu medida.',
    shortTitle: 'Tu lectura, a tu manera.',
    description:
      'Conserva tus preferencias, como el modo oscuro y el tamaño de texto.',
  },
  {
    icon: 'bi-bell',
    title: 'Solo las noticias que te interesan.',
    shortTitle: 'Alertas sobre tus temas favoritos.',
    description:
      'Personaliza alertas sobre política, economía, deportes y tecnología, sin spam.',
  },
];

function RegisterPage() {
  const [view, setView] = useState('register');
  const isLogin = view === 'login';

  return (
    <main className="register-page">
      <div className="container register-container">
        <div className="row align-items-center g-4 g-xl-5">

          {/* BLOQUE EDITORIAL */}
          <section className="col-lg-6 register-intro">
            <div className="register-overline">
              <span className="register-overline-line"></span>
              UNA EXPERIENCIA MÁS PERSONAL
            </div>

            <h1>
              La información
              <br />
              también puede ser
              <br />
              <span>tuya.</span>
            </h1>

            <p className="register-intro-description">
              Crea tu cuenta gratuita y convierte tus noticias en una
              experiencia que te acompaña, se adapta a ti y respeta tu tiempo.
            </p>

            <div className="register-benefits">
              {benefits.map((benefit, index) => (
                <article className="register-benefit" key={benefit.icon}>
                  <span className="register-benefit-number">
                    0{index + 1}
                  </span>

                  <div className="register-benefit-icon">
                    <i className={`bi ${benefit.icon}`} aria-hidden="true" />
                  </div>

                  <div className="register-benefit-content">
                    <h2>
                      <span className="benefit-desktop">
                        {benefit.title}
                      </span>
                      <span className="benefit-mobile">
                        {benefit.shortTitle}
                      </span>
                    </h2>

                    <p>{benefit.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="register-editorial-note">
              <i className="bi bi-info-circle" aria-hidden="true" />
              <p>
                Leer noticias seguirá siendo gratuito y no requiere una cuenta.
              </p>
            </div>
          </section>

          {/* PANEL DE REGISTRO / LOGIN */}
          <section className="col-lg-6 register-form-column">
            <div className="register-panel">

              <div className="register-panel-top">
                <span>EL PATRIOTA / CUENTA PERSONAL</span>
                <span>{isLogin ? '02 — 02' : '01 — 02'}</span>
              </div>

              <div className="register-form-heading">
                <span className="register-form-eyebrow">
                  {isLogin ? 'QUÉ BUENO TENERTE DE VUELTA' : 'EMPIEZA GRATIS'}
                </span>

                <h2>
                  {isLogin ? (
                    <>Continúa donde<br />lo dejaste.</>
                  ) : (
                    <>Tu espacio.<br />Tu información.</>
                  )}
                </h2>

                <p>
                  {isLogin
                    ? 'Accede a tus noticias y preferencias guardadas.'
                    : 'Unos pocos datos para comenzar.'}
                </p>
              </div>

              <form onSubmit={(event) => event.preventDefault()}>
                {!isLogin && (
                  <div className="mb-3 register-field">
                    <label className="form-label register-label" htmlFor="register-name">
                      Nombre
                    </label>
                    <input
                      id="register-name"
                      className="ep-form-control"
                      type="text"
                      placeholder="¿Cómo te llamas?"
                      autoComplete="name"
                    />
                  </div>
                )}

                <div className="mb-3 register-field">
                  <label className="form-label register-label" htmlFor="register-email">
                    Correo electrónico
                  </label>
                  <input
                    id="register-email"
                    type="email"
                    placeholder="nombre@correo.com"
                    autoComplete="email"
                  />
                </div>

                <div className="mb-3 register-field">
                  <label className="form-label register-label" htmlFor="register-password">
                    Contraseña
                  </label>
                  <input
                    id="register-password"
                    type="password"
                    placeholder={isLogin ? 'Tu contraseña' : 'Mínimo 8 caracteres'}
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                  />

                  {!isLogin && (
                    <small className="register-field-hint">
                      Usa al menos 8 caracteres.
                    </small>
                  )}
                </div>

                {isLogin && (
                  <div className="text-end mb-3">
                    <Link to="/recuperar-contrasena" className="register-forgot">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn ep-btn-primary w-100 register-submit"
                >
                  {isLogin ? 'Iniciar sesión' : 'Crear cuenta gratuita'}
                  <i
                    className="bi bi-arrow-up-right ms-2"
                    aria-hidden="true"
                  />
                </button>
              </form>

              {!isLogin && (
                <>
                  <div className="register-separator">
                    <span>O</span>
                  </div>

                  <button
                    type="button"
                    className="btn ep-btn-outline w-100"
                  >
                    <i className="bi bi-google me-2" aria-hidden="true" />
                    Continuar con Google
                  </button>
                </>
              )}

              <p className="register-login">
                {isLogin ? '¿Todavía no tienes una cuenta?' : '¿Ya tienes una cuenta?'}

                <button
                  type="button"
                  className="register-switch"
                  onClick={() => setView(isLogin ? 'register' : 'login')}
                >
                  {isLogin ? 'Crear cuenta' : 'Iniciar sesión'}
                </button>
              </p>

              <div className="register-panel-footer">
                <i className="bi bi-shield-check" aria-hidden="true" />
                <span>Tu información personal merece respeto.</span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
