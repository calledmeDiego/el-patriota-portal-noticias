const items = [
    { id:1, path: '/', label: 'Inicio', icon: 'bi-house', end: true },
    { id:2, path: '/buscar', label: 'Buscar', icon: 'bi-search' },
    { id:3, path: '/guardados', label: 'Guardados', icon: 'bi-bookmark' },
    { id:4, path: '/dashboard', label: 'Ajustes', icon: 'bi-gear' }
  ];

import { NavLink } from 'react-router-dom';
import './navegacion.css';

function Navegacion() {
  return (
    <nav className="navigation">
      <div className="navigation-list">
        {items.map((item) => (
          
          <NavLink
            key={item.id}
            to={item.path}
            end={item.end}
            type="button"
            className={`navigation-item ${
              item.active ? 'active' : ''
            }`}
            
          >
            <i className={`bi ${item.icon}`}></i>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navegacion;