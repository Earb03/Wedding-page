'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { FirebaseError } from 'firebase/app';
import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import styles from './admin.module.css';

type Rsvp = {
  id: string;
  guestName: string;
  phone: string;
  attending: boolean;
  guestCount: number;
  comments?: string;
  createdAt?: {
    toDate: () => Date;
  };
};

const allowedEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

function isAllowed(user: User | null) {
  if (!user?.email) return false;

  return allowedEmails.includes(user.email.toLowerCase());
}

function formatDate(rsvp: Rsvp) {
  if (!rsvp.createdAt) return '';

  return rsvp.createdAt.toDate().toLocaleString('es-DO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export default function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [filter, setFilter] = useState<'all' | 'yes' | 'no'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isAllowed(user)) {
      setRsvps([]);
      return;
    }

    const rsvpQuery = query(collection(db, 'rsvps'), orderBy('createdAt', 'desc'));

    return onSnapshot(
      rsvpQuery,
      (snapshot) => {
        setRsvps(
          snapshot.docs.map((rsvpDoc) => ({
            id: rsvpDoc.id,
            ...(rsvpDoc.data() as Omit<Rsvp, 'id'>),
          })),
        );
      },
      () => {
        setMessage('No pudimos cargar las confirmaciones.');
      },
    );
  }, [user]);

  const visibleRsvps = useMemo(() => {
    if (filter === 'yes') return rsvps.filter((rsvp) => rsvp.attending);
    if (filter === 'no') return rsvps.filter((rsvp) => !rsvp.attending);

    return rsvps;
  }, [filter, rsvps]);

  const totals = useMemo(() => {
    const attending = rsvps.filter((rsvp) => rsvp.attending);

    return {
      yes: attending.length,
      no: rsvps.length - attending.length,
      people: attending.reduce((total, rsvp) => total + (rsvp.guestCount || 0), 0),
    };
  }, [rsvps]);

  async function handleLogin() {
    setMessage('');

    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      if (error instanceof FirebaseError) {
        setMessage(`No pudimos iniciar sesión. Firebase respondió: ${error.code}`);
      } else {
        setMessage('No pudimos iniciar sesión.');
      }
    }
  }

  function exportCsv() {
    const rows = [
      ['Nombre', 'Telefono', 'Asiste', 'Cantidad', 'Comentarios', 'Fecha'],
      ...visibleRsvps.map((rsvp) => [
        rsvp.guestName,
        rsvp.phone,
        rsvp.attending ? 'Si' : 'No',
        String(rsvp.guestCount || 0),
        rsvp.comments || '',
        formatDate(rsvp),
      ]),
    ];

    const csv = rows
      .map((row) =>
        row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','),
      )
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'confirmaciones-rsvp.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  if (isLoading) {
    return <main className={styles.adminPage}>Cargando...</main>;
  }

  if (!isAllowed(user)) {
    return (
      <main className={styles.adminPage}>
        <section className={styles.loginBox}>
          <p className={styles.eyebrow}>Acceso privado</p>
          <h1>Panel RSVP</h1>
          <p>Inicia sesión con una cuenta autorizada.</p>

          <button type="button" onClick={handleLogin}>
            Entrar con Google
          </button>

          <Link className={styles.homeLink} href="/">
            Volver al inicio
          </Link>

          {user ? (
            <button type="button" onClick={() => signOut(auth)}>
              Cerrar sesión
            </button>
          ) : null}

          {message ? <p>{message}</p> : null}
        </section>
      </main>
    );
  }

  return (
    <main className={styles.adminPage}>
      <section className={styles.dashboard}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Panel privado</p>
            <h1>Confirmaciones</h1>
          </div>

          <button type="button" onClick={() => signOut(auth)}>
            Salir
          </button>
        </header>

        <div className={styles.stats}>
          <article>
            <span>Asisten</span>
            <strong>{totals.yes}</strong>
          </article>
          <article>
            <span>No asisten</span>
            <strong>{totals.no}</strong>
          </article>
          <article>
            <span>Personas</span>
            <strong>{totals.people}</strong>
          </article>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.filters}>
            <button
              type="button"
              className={filter === 'all' ? styles.isActive : ''}
              onClick={() => setFilter('all')}
            >
              Todos
            </button>
            <button
              type="button"
              className={filter === 'yes' ? styles.isActive : ''}
              onClick={() => setFilter('yes')}
            >
              Asisten
            </button>
            <button
              type="button"
              className={filter === 'no' ? styles.isActive : ''}
              onClick={() => setFilter('no')}
            >
              No asisten
            </button>
          </div>

          <button type="button" onClick={exportCsv}>
            Exportar CSV
          </button>
        </div>

        {message ? <p className={styles.notice}>{message}</p> : null}

        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Asiste</th>
                <th>Cantidad</th>
                <th>Comentarios</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {visibleRsvps.map((rsvp) => (
                <tr key={rsvp.id}>
                  <td>{rsvp.guestName}</td>
                  <td>{rsvp.phone}</td>
                  <td>{rsvp.attending ? 'Sí' : 'No'}</td>
                  <td>{rsvp.guestCount || 0}</td>
                  <td>{rsvp.comments || '-'}</td>
                  <td>{formatDate(rsvp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
