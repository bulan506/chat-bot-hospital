'use client';

const OpenStreetMap = () => {
  return (
    <div className="map-container">
      <iframe
        width="100%"
        height="400"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-83.870663%2C9.825531%2C-83.866663%2C9.829531&layer=mapnik&marker=9.827531%2C-83.868663"
        title="Ubicación del Tatooine Medical Center"
      />
      <br/>
      <small>
        <a 
          href="https://www.openstreetmap.org/?mlat=9.827531&amp;mlon=-83.868663#map=17/9.827531/-83.868663" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Ver mapa más grande
        </a>
      </small>
    </div>
  );
};

export default OpenStreetMap;