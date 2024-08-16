import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

export default function OSMap({gpxFile}) {
  useEffect(() => {
    const initializeMap = async () => {
      if (typeof window !== 'undefined') {
        const L = (await import('leaflet')).default;
        await import('leaflet-gpx'); // Ensure leaflet-gpx plugin is loaded

        const markerIcon = '/marker-icon.png'
        // Override the default marker options
        L.Marker.prototype.options.icon = markerIcon;


        // Initialize the map with a specific DOM element
        const map = L.map('map', {
          center: [51.43971, -116.15172], // Initial map center
          zoom: 13,
        });

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);


        // Load and add the GPX file to the map
        const gpxLayer = new L.GPX(gpxFile, {
          async: true,
          markers: {
            startIcon: markerIcon, // Disable start marker
            endIcon: markerIcon,   // Disable end marker
            wptIcons: {
              '': markerIcon,
            }
          },
        }).on('loaded', function (e) {
          map.fitBounds(e.target.getBounds()); // Fit the map to the GPX track's bounds
        });

        gpxLayer.addTo(map); // Add GPX layer to the map
      }
    };

    initializeMap();
  }, [gpxFile]);

  return (
    <>
      <div id="map" style={{ height: '400px', width: '100%' }}></div>
    </>
  );
}
