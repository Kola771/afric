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
