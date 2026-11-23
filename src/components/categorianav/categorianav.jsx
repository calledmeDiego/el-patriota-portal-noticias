const categories = [
  'Portada',
  'Deportes',
  'Economía',
  'Tecnología',
];

function CategoriaNav({ activeCategory, onCategoryChange }) {
  return (
    <nav className="category-nav" aria-label="Secciones">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`category-link ${
            activeCategory === category ? 'active' : ''
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}

export default CategoriaNav;