'use client';

import React from 'react';

const OpenStreetMap = ({ center = [9.827531, -83.868663] }) => {
  const [lat, lon] = center;

  const delta = 0.005; 

  const minLon = lon - delta;
  const minLat = lat - delta;
  const maxLon = lon + delta;
  const maxLat = lat + delta;

  const embedUrl = 
    `https://www.openstreetmap.org/export/embed.html?` +
    `bbox=${minLon}%2C${minLat}%2C${maxLon}%2C${maxLat}` +
    `&layer=mapnik&marker=${lat}%2C${lon}`;

  const bigMapUrl = 
    `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}` +
    `#map=17/${lat}/${lon}`;

  return (
    <div className="map-container">
      <iframe
        width="100%"
        height="400"
        src={embedUrl}
        title="Mapa de sucursal"
        style={{ border: 0 }}
      />
      <br/>
      <small>
        <a 
          href={bigMapUrl}
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
