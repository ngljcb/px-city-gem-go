/**
 * Calcola la distanza in metri tra due coordinate GPS usando la formula dell'haversine.
 * @param lat1 Latitudine del primo punto
 * @param lon1 Longitudine del primo punto
 * @param lat2 Latitudine del secondo punto
 * @param lon2 Longitudine del secondo punto
 * @returns Distanza in metri
 */
export const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371000; // Raggio della Terra in metri
  const lat1Rad = lat1 * (Math.PI / 180);
  const lat2Rad = lat2 * (Math.PI / 180);
  const deltaLat = (lat2 - lat1) * (Math.PI / 180);
  const deltaLon = (lon2 - lon1) * (Math.PI / 180);

  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distanza in metri
};
