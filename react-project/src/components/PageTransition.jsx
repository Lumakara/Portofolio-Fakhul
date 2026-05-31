import React, { useEffect, useState } from 'react';
import { sfx } from './SoundEffects';

export default function PageTransition({ trigger, onComplete }) {
  const [status, setStatus] = useState('exit'); // exit, active, idle

  useEffect(() => {
    // Initial entrance on mount
    setStatus('exit');
    const timer = setTimeout(() => {
      setStatus('idle');
    }, 750);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (trigger) {
      setStatus('active');
      sfx.playOpenModal(); // springy sound sweep
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (status === 'idle') return null;

  return (
    <div
      className={`page-transition-overlay ${
        status === 'active' ? 'active' : 'exit'
      }`}
      aria-hidden="true"
    />
  );
}
