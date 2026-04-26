'use client';

import { useEffect, useMemo, useState } from 'react';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
};

type CountdownProps = {
  targetDate: string;
};

const labels = {
  days: 'Days',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds',
} as const;

function calculateTimeLeft(targetDate: string): TimeLeft {
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const total = Math.max(target - now, 0);

  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

function format(value: number, key: keyof typeof labels) {
  if (key === 'days') return String(value);
  return String(value).padStart(2, '0');
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const updateCountdown = () => setTimeLeft(calculateTimeLeft(targetDate));

    updateCountdown();

    const interval = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, [targetDate]);

  const entries = useMemo(() => {
    const values = timeLeft ?? {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: 1,
    };

    return [
      ['days', values.days],
      ['hours', values.hours],
      ['minutes', values.minutes],
      ['seconds', values.seconds],
    ] as const;
  }, [timeLeft]);

  if (timeLeft?.total === 0) {
    return (
      <div className="countdown countdownFinished" aria-live="polite">
        <p>¡Llegó el gran día!</p>
      </div>
    );
  }

  return (
    <div
      className="countdown"
      aria-label="Cuenta regresiva a la boda"
      aria-live="polite"
    >
      {entries.map(([key, value], index) => (
        <div className="countdownGroup" key={key}>
          <div className="countdownItem">
            <strong>{timeLeft ? format(value, key) : '--'}</strong>
            <span>{labels[key]}</span>
          </div>

          {index < entries.length - 1 && <b aria-hidden="true">:</b>}
        </div>
      ))}
    </div>
  );
}