'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { signInAnonymously } from 'firebase/auth';
import {
  collection,
  doc,
  onSnapshot,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Gift, GiftCategory, giftCategories, groupGifts } from './gifts';
import styles from './regalos.module.css';

const amazonListUrl = 'https://www.amazon.com/wedding/guest-view/3G1ZSEVJYDVOU';

const moneyGiftAccounts = [
  {
    owner: 'Edward De La Rosa Bodré',
    idNumber: '402-0907534-6',
    bank: 'Banreservas',
    accountType: 'Cuenta de ahorros',
    accountNumber: '9605247435',
  },
  {
    owner: 'Edward De La Rosa Bodré',
    idNumber: '402-0907534-6',
    bank: 'BHD',
    accountType: 'Cuenta de ahorros',
    accountNumber: '34614400019',
  },
];

type Reservation = {
  giftId: string;
  giftName: string;
  guestName: string;
  guestPhone: string;
  comments: string;
};

export default function GiftRegistry() {
  const [categories, setCategories] = useState<GiftCategory[]>(giftCategories);
  const [reservedIds, setReservedIds] = useState<Set<string>>(new Set());
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [giftComments, setGiftComments] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'gifts'),
      (snapshot) => {
        if (!snapshot.empty) {
          const gifts = snapshot.docs.map((giftDoc) => {
            const gift = giftDoc.data() as Omit<Gift, 'id'>;

            return {
              ...gift,
              id: giftDoc.id,
            };
          });

          setCategories(groupGifts(gifts));
        }
      },
      () => {
        setLoadError(
          'No pudimos cargar la lista desde Firebase. Mostramos la lista guardada en la página.',
        );
      },
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'reservations'),
      (snapshot) => {
        setReservedIds(new Set(snapshot.docs.map((reservation) => reservation.id)));
        setLoadError('');
      },
      () => {
        setLoadError(
          'No pudimos cargar las reservas ahora mismo. Intenta refrescar la página.',
        );
      },
    );

    return unsubscribe;
  }, []);

  const availableCount = useMemo(() => {
    return categories.reduce((total, category) => {
      return total + category.gifts.filter((gift) => !reservedIds.has(gift.id)).length;
    }, 0);
  }, [categories, reservedIds]);

  function openReservation(gift: Gift) {
    if (reservedIds.has(gift.id)) return;

    setSelectedGift(gift);
    setGuestName('');
    setGuestPhone('');
    setGiftComments('');
    setMessage('');
    setModalMessage('');
  }

  function closeReservation() {
    if (isSaving) return;

    setSelectedGift(null);
    setMessage('');
    setModalMessage('');
  }

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    const first = digits.slice(0, 3);
    const second = digits.slice(3, 6);
    const third = digits.slice(6, 10);

    if (digits.length > 6) return `${first}-${second}-${third}`;
    if (digits.length > 3) return `${first}-${second}`;

    return first;
  }

  async function handleReserve(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedGift) return;

    setIsSaving(true);
    setModalMessage('');

    if (guestPhone.replace(/\D/g, '').length !== 10) {
      setModalMessage('Escribe un teléfono válido con 10 dígitos.');
      setIsSaving(false);
      return;
    }

    try {
      if (!auth.currentUser) {
        await signInAnonymously(auth);
      }

      const reservationRef = doc(db, 'reservations', selectedGift.id);

      await runTransaction(db, async (transaction) => {
        const existingReservation = await transaction.get(reservationRef);

        if (existingReservation.exists()) {
          throw new Error('reserved');
        }

        const reservation: Reservation = {
          giftId: selectedGift.id,
          giftName: selectedGift.name,
          guestName: guestName.trim(),
          guestPhone,
          comments: giftComments.trim(),
        };

        transaction.set(reservationRef, {
          ...reservation,
          createdAt: serverTimestamp(),
        });
      });

      setSelectedGift(null);
      setGuestName('');
      setGuestPhone('');
      setGiftComments('');
      setMessage('Gracias. Marcamos ese regalo como reservado.');
    } catch (error) {
      if (error instanceof Error && error.message === 'reserved') {
        setMessage('Ese regalo ya fue reservado por otra persona.');
      } else {
        setModalMessage('No pudimos guardar la reserva. Inténtalo de nuevo.');
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className={styles.giftPage}>
      <section className={styles.giftHero}>
        <Link href="/" className={styles.giftBackLink}>
          Volver a la invitación
        </Link>

        <p className={styles.eyebrow}>Lista de regalos</p>
        <h1 className={styles.giftNames}>
          <span>Aritza</span>
          <span>y</span>
          <span>Edward</span>
        </h1>

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
        </div>
      </section>

      <section className={styles.giftInstructions}>
        <div>
          <h2>Cómo funciona</h2>
        </div>

        <div>
          <p>
            Puedes abrir nuestra lista de Amazon y elegir un regalo desde allí.
            Las tiendas que aparecen son solo sugerencias, así que también
            puedes comprar el regalo en tu tienda de preferencia.
          </p>

          <p>
            Si compras algo fuera de Amazon, por favor resérvalo aquí. Cuando un
            regalo aparezca como “reservado”, significa que alguien ya lo compró
            o lo eligió, y así evitamos regalos repetidos.
          </p>

          <p className={styles.giftCounter}>
            {availableCount} regalos disponibles
          </p>

          {message ? <p className={styles.giftNotice}>{message}</p> : null}
          {loadError ? <p className={styles.giftNotice}>{loadError}</p> : null}
        </div>
      </section>

      <section className={styles.giftCategories}>
        {categories.map((category) => (
          <div className={styles.giftCategory} key={category.title}>
            <div className={styles.giftCategoryHeader}>
              <p className={styles.eyebrow}>Categoría</p>
              <h2>{category.title}</h2>
            </div>

            <ul className={styles.giftList}>
              {category.gifts.map((gift) => {
                const isReserved = reservedIds.has(gift.id);

                return (
                  <li
                    className={`${styles.giftCard} ${
                      isReserved ? styles.isReserved : ''
                    }`}
                    key={gift.id}
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

                    <button
                      className={styles.giftReserveButton}
                      type="button"
                      disabled={isReserved}
                      onClick={() => openReservation(gift)}
                    >
                      {isReserved ? 'Reservado' : 'Reservar'}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </section>

      <section className={styles.moneyGiftSection}>
        <div className={styles.moneyGiftHeader}>
          <p className={styles.eyebrow}>Aporte en efectivo</p>
          <h2>También puedes hacerlo de esta forma</h2>
          <p>
            Si prefieres hacernos un regalo en efectivo, dejamos estas cuentas
            disponibles con mucho agradecimiento.
          </p>
        </div>

        <div className={styles.accountGrid}>
          {moneyGiftAccounts.map((account) => (
            <article
              className={styles.accountCard}
              key={`${account.bank}-${account.accountNumber}`}
            >
              <dl>
                <div>
                  <dt>Nombre</dt>
                  <dd>{account.owner}</dd>
                </div>

                <div>
                  <dt>Cédula</dt>
                  <dd>{account.idNumber}</dd>
                </div>

                <div>
                  <dt>Banco</dt>
                  <dd>{account.bank}</dd>
                </div>

                <div>
                  <dt>Tipo de cuenta</dt>
                  <dd>{account.accountType}</dd>
                </div>

                <div>
                  <dt>Número de cuenta</dt>
                  <dd>{account.accountNumber}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      {selectedGift ? (
        <div className={styles.modalBackdrop} role="presentation">
          <form className={styles.reserveModal} onSubmit={handleReserve}>
            <button
              className={styles.closeButton}
              type="button"
              onClick={closeReservation}
              aria-label="Cerrar"
            >
              ×
            </button>

            <p className={styles.eyebrow}>Reservar regalo</p>
            <h2>{selectedGift.name}</h2>

            <label>
              Tu nombre
              <input
                value={guestName}
                onChange={(event) => setGuestName(event.target.value)}
                required
                minLength={2}
              />
            </label>

            <label>
              Teléfono
              <input
                value={guestPhone}
                onChange={(event) => setGuestPhone(formatPhone(event.target.value))}
                required
                minLength={12}
                maxLength={12}
                inputMode="tel"
                placeholder="829-000-0000"
              />
            </label>

            <label>
              Comentarios
              <textarea
                value={giftComments}
                onChange={(event) => setGiftComments(event.target.value)}
                rows={3}
                placeholder="Opcional"
              />
            </label>

            {modalMessage ? (
              <p className={styles.modalNotice}>{modalMessage}</p>
            ) : null}

            <button
              className={styles.giftMainButton}
              type="submit"
              disabled={isSaving}
            >
              {isSaving ? 'Guardando...' : 'Confirmar reserva'}
            </button>
          </form>
        </div>
      ) : null}
    </main>
  );
}
