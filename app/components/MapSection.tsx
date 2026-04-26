import Reveal from './Reveal';

const mapEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.6067787721768!2d-70.60834932474577!3d19.12489895043552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb02fcc58c3afb1%3A0xdeb005867d371e62!2sInstituto%20T%C3%A9cnico%20de%20Estudios%20Superiores%20en%20Medio%20Ambiente%20y%20Recursos%20Naturales!5e0!3m2!1ses-419!2sdo!4v1777185692674!5m2!1ses-419!2sdo';

const mapDirectionsUrl =
  'https://maps.app.goo.gl/wSBGS2E3vdFu1ssq7';

export default function MapSection() {
  return (
    <Reveal as="section" id="ubicacion" className="mapSection">
      <div className="mapContent">
        <p className="smallTitle">Ubicación</p>
        <h2>Cómo llegar</h2>

        <p>
          Queremos que llegues sin complicaciones. Aquí puedes ver la ubicación
          del evento y abrirla directamente en Google Maps para recibir
          direcciones.
        </p>

        <a
          className="button"
          href={mapDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir en Google Maps
        </a>
      </div>

      <div className="mapFrame">
        <iframe
          src={mapEmbedUrl}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación de la boda de Aritza y Edward"
        />
      </div>
    </Reveal>
  );
}
