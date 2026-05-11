import Link from 'next/link';
import styles from './regalos.module.css';

const googleFormUrl = 'PEGA_AQUI_EL_LINK_DE_TU_GOOGLE_FORM';
const amazonListUrl = 'https://www.amazon.com/wedding/guest-view/3G1ZSEVJYDVOU';

type GiftStatus = 'Disponible' | 'Reservado';

type Gift = {
  name: string;
  stores: string[];
  note?: string;
  status: GiftStatus;
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

export default function GiftsPage() {
  return (
    <main className={styles.giftPage}>
      <section className={styles.giftHero}>
        <Link href="/" className={styles.giftBackLink}>
          Volver a la invitación
        </Link>

        <p className={styles.eyebrow}>Lista de regalos</p>
        <h1>Aritza & Edward</h1>

        <p>
          Tu presencia es el regalo más importante. Pero si deseas tener un
          detalle con nosotros, dejamos una lista sencilla con algunas ideas para
          nuestro hogar.
        </p>

        <div className={styles.heroActions}>
          <a
            className={styles.giftMainButton}
            href={amazonListUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir lista de Amazon
          </a>

          <a
            className={styles.giftSecondaryButton}
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Avisar qué regalo elegiste
          </a>
        </div>
      </section>

      <section className={styles.giftInstructions}>
        <div>
          <h2>Cómo funciona</h2>
        </div>

        <div>
          <p>
            Puedes abrir nuestra lista de Amazon y elegir desde allí. Si compras
            algo fuera de Amazon, completa el formulario para avisarnos y así
            evitar regalos repetidos.
          </p>
        </div>
      </section>

      <section className={styles.giftCategories}>
        {giftCategories.map((category) => (
          <div className={styles.giftCategory} key={category.title}>
            <div className={styles.giftCategoryHeader}>
              <p className={styles.eyebrow}>Categoría</p>
              <h2>{category.title}</h2>
            </div>

            <ul className={styles.giftList}>
              {category.gifts.map((gift) => (
                <li
                  className={`${styles.giftCard} ${
                    gift.status === 'Reservado' ? styles.isReserved : ''
                  }`}
                  key={`${category.title}-${gift.name}`}
                >
                  <div className={styles.giftCardBody}>
                    <div>
                      <h3>{gift.name}</h3>

                      {gift.note ? <p>{gift.note}</p> : null}
                    </div>

                    <div className={styles.giftStores}>
                      {gift.stores.map((store) => (
                        <span key={store}>{store}</span>
                      ))}
                    </div>
                  </div>

                  <span className={styles.giftStatus}>{gift.status}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
