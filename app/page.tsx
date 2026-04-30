import Image from 'next/image';
import Countdown from './components/Countdown';
import Reveal from './components/Reveal';
import MapSection from './components/MapSection';
import FAQAccordion from './components/FAQAccordion';

const weddingDate = '2026-06-20T17:00:00-04:00';

const giftRegistryUrl =
  'https://www.amazon.com/wedding/guest-view/3G1ZSEVJYDVOU';

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

const colors = ['#6e477a', '#b9a0cf', '#b9dff0', '#f7f2e7', '#788a3e'];

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
      'Te pedimos evitar blanco o tonos muy similares, ya que estarán reservados para la novia.',
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
          alt="Aritza y Edward frente al mar"
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
          <p className="eyebrow">Junio 20, 2026 · 5:00 PM</p>
          <h1>Aritza & Edward</h1>
          <p className="subtitle">We are getting married</p>

          <button type="button" className="button heroRsvpButton" disabled>
            RSVP pronto
          </button>
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
      “Love is never wasted
      <br />
      when shared that’s why we chose
      to share ours”
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

      <Reveal as="section" id="dress-code" className="dress sectionGrid">
        <div>
          <h2>Dress code</h2>
          <p>
            Queremos que te sientas increíble y que seas parte del ambiente de
            este día. Nuestro dress code es elegante con un toque de color, pero
            no es necesario seguirlo exactamente.
          </p>
          <p>
            El evento será en un ambiente donde queremos que te sientas libre de
            moverte, bailar y disfrutar, así que te sugerimos optar por telas
            frescas y calzado cómodo.
          </p>
          <p>
            Solo te pedimos evitar el blanco o tonos muy similares, ya que
            estarán reservados para la novia.
          </p>
        </div>

        <div className="paletteBox">
          <p>Colores reservados para la boda</p>

          <div className="swatches">
            {colors.map((color) => (
              <span key={color} style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="informacion" className="venue sectionGrid">
        <Countdown targetDate={weddingDate} />

        <div>
          <p className="smallTitle">Información</p>
          <h2>Cuándo y dónde</h2>
          <p>
            La ceremonia y celebración serán el sábado 20 de junio de 2026 a las
            5:00 PM en el Instituto Técnico de Estudios Superiores en Medio
            Ambiente y Recursos Naturales, en Jarabacoa.
          </p>
          <p>
            Nos reuniremos en un ambiente natural y abierto para compartir una
            tarde llena de amor, alegría y buenos recuerdos.
          </p>
        </div>

        <Image
          src="/images/monogram.png"
          alt="Monograma A y E"
          width={200}
          height={242}
          className="monogram"
        />
      </Reveal>

      <MapSection />

      <Reveal as="section" id="regalos" className="gifts sectionGrid">
        <Image
          src="/images/hug.png"
          alt="Aritza y Edward abrazados"
          width={908}
          height={1210}
        />

        <div>
          <h2>Tu presencia es el mejor regalo que podemos pedir.</h2>
          <p>
            Pero si sientes el deseo de regalarnos algo, hicimos una pequeña
            lista con algunas cosas que nos agradaría tener.
          </p>

          <a
            className="button"
            href={giftRegistryUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver lista de regalos
          </a>
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
        </div>
      </footer>
    </main>
  );
}