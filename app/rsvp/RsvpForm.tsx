'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import styles from './rsvp.module.css';

type Attendance = 'yes' | 'no';

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  const first = digits.slice(0, 3);
  const second = digits.slice(3, 6);
  const third = digits.slice(6, 10);

  if (digits.length > 6) return `${first}-${second}-${third}`;
  if (digits.length > 3) return `${first}-${second}`;

  return first;
}

export default function RsvpForm() {
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState<Attendance>('yes');
  const [guestCount, setGuestCount] = useState('1');
  const [comments, setComments] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');

    if (phone.replace(/\D/g, '').length !== 10) {
      setMessage('Escribe un teléfono válido con 10 dígitos.');
      return;
    }

    setIsSaving(true);

    try {
      await addDoc(collection(db, 'rsvps'), {
        guestName: guestName.trim(),
        phone,
        attending: attendance === 'yes',
        guestCount: attendance === 'yes' ? Number(guestCount) : 0,
        comments: comments.trim(),
        createdAt: serverTimestamp(),
      });

      setGuestName('');
      setPhone('');
      setAttendance('yes');
      setGuestCount('1');
      setComments('');
      setMessage('Gracias. Recibimos tu confirmación.');
    } catch {
      setMessage('No pudimos guardar tu confirmación. Inténtalo de nuevo.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className={styles.rsvpPage}>
      <section className={styles.rsvpShell}>
        <Link href="/" className={styles.backLink}>
          Volver a la invitación
        </Link>

        <div className={styles.header}>
          <p className={styles.eyebrow}>RSVP</p>
          <h1>Confirma tu asistencia</h1>
          <p>
            Nos ayuda mucho saber si podremos contar contigo para celebrar este
            día juntos.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Nombre completo
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
              value={phone}
              onChange={(event) => setPhone(formatPhone(event.target.value))}
              required
              minLength={12}
              maxLength={12}
              inputMode="tel"
              placeholder="829-000-0000"
            />
          </label>

          <fieldset>
            <legend>¿Podrás asistir?</legend>

            <div className={styles.segmented}>
              <label>
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  checked={attendance === 'yes'}
                  onChange={() => setAttendance('yes')}
                />
                Sí asistiré
              </label>

              <label>
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  checked={attendance === 'no'}
                  onChange={() => setAttendance('no')}
                />
                No podré asistir
              </label>
            </div>
          </fieldset>

          {attendance === 'yes' ? (
            <label>
              Cantidad de personas
              <select
                value={guestCount}
                onChange={(event) => setGuestCount(event.target.value)}
              >
                <option value="1">1 persona</option>
                <option value="2">2 personas</option>
                <option value="3">3 personas</option>
                <option value="4">4 personas</option>
                <option value="5">5 personas</option>
                <option value="6">6 personas</option>
                <option value="7">7 personas</option>
                <option value="8">8 personas</option>
                <option value="9">9 personas</option>
                <option value="10">10 personas</option>
              </select>
            </label>
          ) : null}

          <label>
            Notas o comentarios
            <textarea
              value={comments}
              onChange={(event) => setComments(event.target.value)}
              rows={4}
              placeholder="Opcional"
            />
          </label>

          {message ? <p className={styles.notice}>{message}</p> : null}

          <button className={styles.submitButton} type="submit" disabled={isSaving}>
            {isSaving ? 'Guardando...' : 'Enviar confirmación'}
          </button>
        </form>
      </section>
    </main>
  );
}
