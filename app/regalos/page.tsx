import Link from 'next/link';

const googleFormUrl = 'PEGA_AQUI_EL_LINK_DE_TU_GOOGLE_FORM';

type GiftStatus = 'Disponible' | 'Reservado';

type Gift = {
  name: string;
  stores: string[];
  note?: string;
  status: GiftStatus;
  url?: string;
};

type GiftCategory = {
  title: string;
  gifts: Gift[];
};

const giftCategories: GiftCategory[] = [
  {
    title: 'Cocina',
    gifts: [
      { name: 'Set de cuchillos', stores: ['Lista de Amazon'], status: 'Disponible' },
      { name: 'Olla arrocera', stores: ['Casa Cuesta'], status: 'Disponible' },
      { name: 'Licuadora', stores: ['Casa Cuesta'], status: 'Disponible' },
      { name: 'Wafflera', stores: ['Casa Cuesta', 'Lista de Amazon'], status: 'Disponible' },
      { name: 'Microondas', stores: ['Cualquier tienda'], status: 'Disponible' },
      {
        name: 'Vajilla no blanca',
        stores: ['Cualquier tienda'],
        note: 'Preferiblemente colorida o con textura.',
        status: 'Disponible',
      },
      {
        name: 'Vasos de colores',
        stores: ['Cualquier tienda'],
        note: 'Coloridos o con textura.',
        status: 'Disponible',
      },
      {
        name: 'Copas de vino',
        stores: ['Cualquier tienda'],
        note: 'Con formas diferentes.',
        status: 'Disponible',
      },
      { name: 'Set de bar', stores: ['Lista de Amazon'], status: 'Disponible' },
      { name: 'Organizadores de gavetas', stores: ['IKEA'], status: 'Disponible' },
      { name: 'Contenedores de comida', stores: ['Amazon'], status: 'Disponible' },
      { name: 'Estante organizador de sartenes', stores: ['Lista de Amazon'], status: 'Disponible' },
      { name: 'Set de ollas', stores: ['Lista de Amazon'], status: 'Disponible' },
      { name: 'Organizadores de nevera', stores: ['Lista de Amazon'], status: 'Disponible' },
      {
        name: 'Set de cantinas',
        stores: ['Cualquier tienda'],
        note: 'Plástico o cristal.',
        status: 'Disponible',
      },
      { name: 'Olla de presión', stores: ['Cualquier tienda'], status: 'Disponible' },
    ],
  },
  {
    title: 'Habitación',
    gifts: [
      { name: 'Cojines mix & match', stores: ['IKEA'], status: 'Disponible' },
      { name: 'Alfombra pequeña', stores: ['IKEA'], status: 'Disponible' },
      {
        name: 'Duvet / edredón simple',
        stores: ['IKEA', 'Shein'],
        note: 'Puede ser solo el relleno.',
        status: 'Disponible',
      },
      {
        name: 'Sábanas',
        stores: ['Cualquier tienda'],
        note: 'Queen XL - 60x80. Sin preferencia de color.',
        status: 'Disponible',
      },
    ],
  },
  {
    title: 'Sala',
    gifts: [
      { name: 'Jarrones de cerámica', stores: ['IKEA'], status: 'Disponible' },
      { name: 'Lámparas de mesa', stores: ['IKEA', 'Lista de Amazon'], status: 'Disponible' },
      { name: 'Alfombra', stores: ['IKEA', 'Lista de Amazon'], status: 'Disponible' },
      { name: 'Cortinas blackout', stores: ['Cualquier tienda china'], status: 'Disponible' },
      { name: 'Organizador de zapatos', stores: ['IKEA'], status: 'Disponible' },
      { name: 'Ottoman', stores: ['Lista de Amazon'], status: 'Disponible' },
    ],
  },
  {
    title: 'Baño y limpieza',
    gifts: [
      { name: 'Toallas de baño', stores: ['Cualquier tienda'], status: 'Disponible' },
      { name: 'Cesta separadora de ropa', stores: ['Lista de Amazon'], status: 'Disponible' },
      { name: 'Aspiradora', stores: ['Casa Cuesta', 'Amazon'], status: 'Disponible' },
      { name: 'Tabla de plancha', stores: ['Cualquier tienda'], status: 'Disponible' },
    ],
  },
  {
    title: 'Electrónica',
    gifts: [
      { name: 'Bombillos inteligentes', stores: ['Lista de Amazon'], status: 'Disponible' },
      { name: 'Echo Dot Alexa', stores: ['Lista de Amazon'], status: 'Disponible' },
      { name: 'Plancha a vapor', stores: ['Lista de Amazon'], status: 'Disponible' },
      { name: 'Extensiones eléctricas', stores: ['Cualquier tienda'], status: 'Disponible' },
    ],
  },
];

function giftImage(name: string) {
  return `https://placehold.co/900x700/f8f4ec/543a61?text=${encodeURIComponent(
    name,
  )}`;
}

function giftSearchUrl(gift: Gift) {
  if (gift.url) return gift.url;

  return `https://www.google.com/search?q=${encodeURIComponent(
    `${gift.name} hogar regalo`,
  )}`;
}

export default function GiftsPage() {
  return (
    <main className="giftPage">
      <section className="giftHero">
        <Link href="/" className="giftBackLink">
          Volver a la invitación
        </Link>

        <p className="smallTitle">Lista de regalos</p>
        <h1>Aritza & Edward</h1>

        <p>
          Tu presencia es el regalo más importante. Pero si deseas tener un
          detalle con nosotros, preparamos esta selección de ideas de diferentes
          tiendas.
        </p>

        <a
          className="button giftMainButton"
          href={googleFormUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Avisar qué regalo elegiste
        </a>
      </section>

      <section className="giftInstructions">
        <div>
          <h2>Cómo funciona</h2>
        </div>

        <div>
          <p>
            Elige un regalo de la lista y luego completa el formulario para
            avisarnos cuál vas a regalar. Actualizaremos la lista manualmente
            para marcar los regalos reservados.
          </p>
        </div>
      </section>

      <section className="giftCategories">
        {giftCategories.map((category) => (
          <div className="giftCategory" key={category.title}>
            <div className="giftCategoryHeader">
              <p className="smallTitle">Categoría</p>
              <h2>{category.title}</h2>
            </div>

            <div className="giftGrid">
              {category.gifts.map((gift) => (
                <article
                  className={`giftCard ${
                    gift.status === 'Reservado' ? 'isReserved' : ''
                  }`}
                  key={`${category.title}-${gift.name}`}
                >
                  <div className="giftImageWrap">
                    <img src={giftImage(gift.name)} alt={gift.name} />
                  </div>

                  <div className="giftCardTop">
                    <span>{gift.status}</span>
                  </div>

                  <div className="giftCardBody">
                    <h3>{gift.name}</h3>

                    <div className="giftStores">
                      {gift.stores.map((store) => (
                        <span key={store}>{store}</span>
                      ))}
                    </div>

                    {gift.note ? <p>{gift.note}</p> : null}
                  </div>

                  <div className="giftActions">
                    <a
                      className="giftCardButton"
                      href={giftSearchUrl(gift)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver referencia
                    </a>

                    <a
                      className="giftCardButton"
                      href={googleFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Avisar que lo regalaré
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}