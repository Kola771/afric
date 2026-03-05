// utils/index.ts

/**
 * Convertit une date ISO en format "DD MMM YYYY à HH:MM"
 * en heure locale de l'ordinateur
 * 
 * @param isoDate - chaîne ISO ou objet Date
 * @returns string formatée
 */
export function formatLocalDate(isoDate: string | Date): string {
  const date = typeof isoDate === 'string' ? new Date(isoDate) : isoDate;

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',   // "Feb"
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,    // format 24h
  };

  // locale undefined → utilise la locale du poste
  return date.toLocaleString(undefined, options).replace(',', ' à');
}

/**
 * Retourne le nombre de jours entre deux dates
 * ainsi que la date la plus récente
 * 
 * @param date1 - string ISO ou Date
 * @param date2 - string ISO ou Date
 */
export function getDaysFromToday(
  targetDate: string | Date
): {
  days: number;
  lastDate: Date;
  isPast: boolean;
} {

  const today = new Date();
  const target = typeof targetDate === "string"
    ? new Date(targetDate)
    : new Date(targetDate);

  // Normaliser à minuit pour éviter les bugs liés aux heures
  const utcToday = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const utcTarget = Date.UTC(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  );

  const diffTime = utcTarget - utcToday;
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return {
    days: Math.abs(days),
    lastDate: target > today ? target : today,
    isPast: days < 0
  };
}

/**
 * Retourne une représentation relative du temps écoulé
 * depuis une date donnée (ex : "maintenant", "5min", "2h", "3j", "1sem").
 *
 * Utile pour afficher des timestamps courts dans une interface
 * (commentaires, réactions, posts, etc.).
 *
 * @param date - Date à comparer (string ISO ou objet Date)
 * @returns Une chaîne représentant le temps écoulé
 */
export function formatRelativeDate(date: string | Date): string {
  const now = new Date();
  const target = new Date(date);

  const diff = Math.floor((now.getTime() - target.getTime()) / 1000);

  if (diff < 10) return "maintenant";

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes}min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}j`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}sem`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mois`;

  const years = Math.floor(days / 365);
  return `${years}an${years > 1 ? "s" : ""}`;
}

/**
 * Formate un temps de lecture en format lisible (heure, minute, seconde)
 * 
 * Cette fonction convertit un nombre de secondes en une chaîne formatée :
 * - Exemples :
 *   45 → "45sec"
 *   75 → "1min15sec"
 *   3670 → "1h1min10sec"
 * 
 * @param seconds - Temps de lecture en secondes
 * @returns string - Temps formaté pour l'affichage
 */
export const formatReadingTime = (seconds: number) => {

    if (!seconds || seconds <= 0) return "0sec"

    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    let result = ""

    if (hours > 0) result += `${hours}h`
    if (minutes > 0) result += `${minutes}min`
    if (remainingSeconds > 0) result += `${remainingSeconds}sec`

    return result
}

/**
 * Vérifie si l'utilisateur a le droit d'accéder à la création de livre et chapitres
 * @param role - rôle de l'utilisateur
 * @returns boolean
 */
export function authorizeRoleUser(role: string): boolean {
  return role === 'super-admin' || role === 'admin' || role === 'support' || role === 'auteur';
}

/**
 * Vérifie si l'utilisateur a le droit d'accéder au tableau de bord
 * @param role - rôle de l'utilisateur
 * @returns boolean
 */
export function authorizeRoleDash(role: string): boolean {
  return role === 'super-admin' || role === 'admin' || role === 'support';
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }

  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }

  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }

  return num.toString();
}