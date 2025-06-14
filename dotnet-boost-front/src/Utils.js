export function formatTime(ms) {
  if (ms <= 0) return 'Expiré';

  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days} \ Jours ${hours}:${minutes}:${seconds}`;
}

