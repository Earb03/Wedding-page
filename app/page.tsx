import Image from 'next/image';
import Countdown from './components/Countdown';
import Reveal from './components/Reveal';
import MapSection from './components/MapSection';
import FAQAccordion from './components/FAQAccordion';

const weddingDate = '2026-06-20T17:00:00-04:00';

const navItems = [
  'Inicio',
  'Nuestra historia',
  'Programa',
  'Dress code',
  'Información',
  'Regalos',
  'Galería',
  'FAQ',
];

const reservedColors = ['#7e8b3d', '#b7d3e7', '#b39ccf', '#5d416e'];

const programItems = [
  {
    time: '4:30 PM',
    title: 'Llegada de invitados',
    description: 'Te recomendamos llegar con tiempo para disfrutar el ambiente.',
  },
  {
    time: '5:00 PM',
    title: 'Ceremonia',
    description: 'El momento más especial del día.',
  },
  {
    time: '6:00 PM',
    title: 'Fotos y cóctel',
    description: 'Un espacio para compartir, saludar y celebrar.',
  },
  {
    time: '7:00 PM',
    title: 'Cena',
    description: 'Cena y brindis junto a nuestros seres queridos.',
  },
  {
    time: '8:30 PM',
    title: 'Baile y celebración',
    description: 'Música, alegría y mucho amor.',
  },
];

const faqItems = [
  {
    question: '¿Puedo llevar acompañante?',
    answer:
      'Por ahora te pedimos esperar la confirmación formal de RSVP para validar los cupos disponibles.',
  },
  {
    question: '¿Puedo llevar niños?',
    answer:
      'Más adelante compartiremos los detalles finales junto con la confirmación de asistencia.',
  },
  {
    question: '¿Hay parqueo?',
    answer:
      'Sí, el lugar cuenta con espacio para recibir a los invitados. Recomendamos llegar con tiempo.',
  },
  {
    question: '¿El evento es al aire libre?',
    answer:
      'Sí. La celebración será en un ambiente abierto, por eso recomendamos telas frescas y calzado cómodo.',
  },
  {
    question: '¿Qué colores debo evitar?',
    answer:
      'Te pedimos evitar blanco o tonos muy similares, ya que estarán reservados para la novia. También evita los colores de la paleta del dress code, porque estarán reservados para la boda.',
  },
  {
    question: '¿Dónde confirmo asistencia?',
    answer:
      'La sección de RSVP estará disponible en una próxima versión de la página.',
  },
];

function sectionHref(item: string) {
  return `#${item
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replaceAll(' ', '-')}`;
}

export default function Home() {
  return (
    <main>
      <section id="inicio" className="hero">
        <Image
          src="/images/heroImage.png"
          alt="Ilustración de Aritza y Edward"
          fill
          priority
          className="heroImage"
        />

        <div className="heroOverlay" />

        <nav className="nav">
          <div className="navLinks">
            {navItems.map((item) => (
              <a key={item} href={sectionHref(item)}>
                {item}
              </a>
            ))}
          </div>
        </nav>

        <div className="heroContent">
          <h1 className="heroNames">
            <span>Aritza</span>
            <span className="heroConnector"> y </span>
            <span className='heroEdward'>Edward</span>
          </h1>

          <p className="subtitle">We are getting married</p>
        </div>

        <div className="heroFooter">
          <button type="button" className="button heroRsvpButton" disabled>
            RSVP pronto
          </button>

          <p className="heroBottomDate">
            <span>Junio 20, 2026</span>
            <span>5:00 PM</span>
          </p>
        </div>
      </section>

      <Reveal as="section" id="nuestra-historia" className="storyEditorial">
        <div className="storyEditorialPhoto">
          <Image
            src="/images/vertical.png"
            alt="Aritza y Edward en una escena de atardecer"
            width={700}
            height={1100}
          />
        </div>

        <div className="storyEditorialContent">
          <p className="storyEditorialQuote">
            <span>“Love is never wasted,</span>
            <span>when shared, that’s why</span>
            <span>we chose to share ours”</span>
          </p>

          <div className="storyEditorialIllustration">
            <Image
              src="/images/story-illustration-transparent.png"
              alt="Ilustración romántica de la pareja"
              width={260}
              height={260}
            />
          </div>

          <div className="storyEditorialVerse">
            <p>El Cantar de los Cantares 8:6</p>
            <blockquote>
              “Ponme como un sello sobre tu corazón,
              <br />
              como un sello sobre tu brazo,
              <br />
              porque el amor es tan fuerte como la muerte...”
            </blockquote>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="widePhoto">
        <Image
          src="/images/couple-cliff.png"
          alt="La pareja tomada de manos frente al mar"
          fill
        />
      </Reveal>

      <Reveal as="section" id="programa" className="programSection">
        <div className="sectionHeader">
          <p className="smallTitle">Programa</p>
          <h2>Itinerario</h2>
          <p>
            Estos son los momentos principales que queremos compartir contigo. Si
            algún horario cambia, lo actualizaremos aquí antes del gran día.
          </p>
        </div>

        <div className="programTimeline">
          {programItems.map((item, index) => (
            <div className="programStep" key={`${item.time}-${item.title}`}>
              <div className="programMarker">
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>

              <div className="programContent">
                <strong>{item.time}</strong>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" id="dress-code" className="dressSection">
        <div className="dressGrid">
          <div className="dressCopy">
            <h2 className="dressCodeTitle">Dress code</h2>

            <div className="dressText">
              <p>
                Queremos que te sientas increíble y que seas parte del ambiente
                de este día. Pero sobre que te sientas cómodo contigo mismo.
              </p>

              <p>
                Nuestro dress code es elegante con un toque de color, pero no es
                necesario seguirlo exactamente. Además, el evento será en un
                ambiente en el que queremos que te sientas libre de moverte,
                bailar y disfrutar, así que te sugerimos optar por telas frescas
                y calzado cómodo, porque parte de la celebración es al aire
                libre.
              </p>

              <p>
                Solo te pedimos evitar{' '}
                <strong>el blanco o tonos muy similares</strong>, ya que estarán
                reservados para la novia. También te pedimos no usar los colores
                mostrados en la paleta, porque estarán reservados para la boda.
              </p>
            </div>
          </div>

          <div className="dressVisual">
            <p className="paletteHeading">Colores reservados para la boda</p>

            <div className="swatches swatchesArch">
              {reservedColors.map((color) => (
                <span key={color} style={{ backgroundColor: color }} />
              ))}
            </div>

            <div className="dressIllustrations">
              <Image
                src="/images/dress-bouquet.png"
                alt="Ilustración de ramo"
                width={180}
                height={180}
              />
              <Image
                src="/images/dress-shoes.png"
                alt="Ilustración de zapatos"
                width={180}
                height={180}
              />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="informacion" className="infoSection">
        <div className="infoIntro">
          <div className="infoArtwork">
            <Image
              src="/images/info-rings.png"
              alt="Ilustración de argollas"
              width={420}
              height={260}
            />
          </div>

          <div className="infoCopy">
            <h2>¿Cuándo y dónde?</h2>

            <div className="infoTextBlock">
              <p>
                La ceremonia y celebración serán el sábado 20 de junio de 2026 a
                las 5:00 PM en el Instituto Técnico de Estudios Superiores en
                Medio Ambiente y Recursos Naturales, en Jarabacoa.
              </p>

              <p>
                Nos reuniremos en un ambiente natural y abierto para compartir
                una tarde llena de amor, alegría y buenos recuerdos.
              </p>
            </div>
          </div>
        </div>

        <div className="infoCountdown">
          <Countdown targetDate={weddingDate} />
        </div>

        <Image
          src="/images/monogram.png"
          alt="Monograma A y E"
          width={200}
          height={242}
          className="infoMonogram"
        />
      </Reveal>

      <MapSection />

      <Reveal as="section" id="regalos" className="giftsSection">
        <div className="giftsGrid">
          <div className="giftsPhoto">
            <Image
              src="/images/hug.png"
              alt="Aritza y Edward abrazados"
              width={900}
              height={1200}
            />
          </div>

          <div className="giftsContent">
            <h2 className="giftsTitle">
              <span>Tu presencia es</span>
              <span>el mejor regalo</span>
              <span>que podemos pedir.</span>
            </h2>

            <div className="giftsText">
              <p>
                Pero si sientes el deseo de regalarnos algo, hicimos una pequeña
                lista con algunas cosas que nos agradarían tener.
              </p>

              <p>
                Aquí debajo dejamos un enlace a la lista de regalo.
              </p>
            </div>

            <a className="button" href="/regalos">
              Ver opciones de regalos
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="galeria" className="gallery">
        <Image
          src="/images/proposal.png"
          alt="Propuesta de matrimonio"
          width={1037}
          height={692}
        />
        <Image
          src="/images/ring.png"
          alt="Anillo de compromiso"
          width={1037}
          height={692}
        />
        <Image
          src="/images/proposal-wide.png"
          alt="La pareja en el jardín"
          width={1037}
          height={692}
        />
      </Reveal>

      <Reveal as="section" id="faq" className="faqSection">
        <div className="sectionHeader">
          <p className="smallTitle">FAQ</p>
          <h2>Preguntas frecuentes</h2>
          <p>
            Aquí reunimos algunas respuestas importantes para que puedas
            prepararte con tranquilidad.
          </p>
        </div>

        <FAQAccordion items={faqItems} />
      </Reveal>

      <footer>
        <p className="smallTitle">Aritza & Edward</p>
        <h2>Junio 20, 2026</h2>
        <p>
          Con amor, gracias por ser parte de nuestra historia. Nos vemos pronto.
        </p>

        <div className="footerContact">
          <span>Contacto</span>
          <strong>Edward De La Rosa</strong>
          <a href="tel:+18294721317">829-472-1317</a>
          <br />
          <strong>Aritza Jarvis</strong>
          <a href="tel:+18496382082">849-638-2082</a>
        </div>
      </footer>
    </main>
  );
}
