// Approximate coordinates for every pool (resort-level accuracy, good enough for "near you").
// Keyed by pool id from lib/pool-data.ts. Rebuilt October 2026: the old table had drifted
// out of step with the ids, so many pools pointed at the wrong place. Add a line for every new pool.

export const poolCoordinates: Record<number, { lat: number; lng: number }> = {
  1: { lat: 36.4316, lng: 25.423 }, // Grace Santorini
  2: { lat: 1.2834, lng: 103.8607 }, // Marina Bay Sands
  3: { lat: -8.522, lng: 115.511 }, // Amankila, Bali
  4: { lat: 43.5528, lng: 7.1286 }, // Hotel du Cap-Eden-Roc
  5: { lat: 37.0167, lng: -111.61 }, // Amangiri, Utah
  6: { lat: 40.619, lng: 14.573 }, // Monastero Santa Rosa, Amalfi Coast
  7: { lat: 40.649, lng: 14.612 }, // Belmond Hotel Caruso, Ravello
  8: { lat: 24.577, lng: 73.672 }, // Oberoi Udaivilas, Udaipur
  9: { lat: 63.88, lng: -22.449 }, // Retreat at Blue Lagoon, Iceland
  10: { lat: 35.687, lng: 139.765 }, // Aman Tokyo
  11: { lat: 43.911, lng: 5.2 }, // Airelles Gordes, Provence
  12: { lat: 4.37, lng: 73.39 }, // Huvafen Fushi, Maldives
  13: { lat: 45.843, lng: 9.076 }, // Villa d'Este, Lake Como
  14: { lat: 18.93, lng: 98.93 }, // Four Seasons Chiang Mai
  15: { lat: 25.079, lng: 55.134 }, // Address Beach Resort, Dubai
  16: { lat: -22.967, lng: -43.179 }, // Copacabana Palace, Rio
  17: { lat: 31.6, lng: -8.06 }, // Mandarin Oriental Marrakech
  18: { lat: 21.79, lng: -72.19 }, // Rock House, Turks and Caicos
  19: { lat: 13.38, lng: 103.83 }, // Phum Baitang, Siem Reap
  20: { lat: -16.75, lng: -179.67 }, // Laucala Island, Fiji
  21: { lat: 40.702, lng: -73.996 }, // 1 Hotel Brooklyn Bridge
  22: { lat: -2.15, lng: 34.77 }, // Four Seasons Serengeti
  23: { lat: 29.646, lng: 91.117 }, // St. Regis Lhasa
  24: { lat: 10.49, lng: -84.73 }, // Nayara Tented Camp, Costa Rica
  25: { lat: -25.23, lng: 131.03 }, // Longitude 131, Uluru
  26: { lat: 17.13, lng: -61.89 }, // Hermitage Bay, Antigua
  27: { lat: 36.461, lng: 25.376 }, // Andronis, Oia
  28: { lat: 18.477, lng: -66.29 }, // Dorado Beach, Puerto Rico
  29: { lat: 37.02, lng: -111.6 }, // Camp Sarika, Utah
  30: { lat: 13.733, lng: 100.573 }, // 137 Pillars, Bangkok
  31: { lat: -8.488, lng: 115.239 }, // Mandapa, Ubud
  32: { lat: 20.715, lng: -86.966 }, // Waldorf Astoria Riviera Maya
  33: { lat: 15.59, lng: -61.46 }, // Secret Bay, Dominica
  34: { lat: 18.16, lng: -63.15 }, // Belmond Cap Juluca, Anguilla
  35: { lat: -24.8, lng: 15.97 }, // andBeyond Sossusvlei
  36: { lat: -20.49, lng: 25.15 }, // Jack's Camp, Botswana
  37: { lat: 41.92, lng: 12.445 }, // Rome Cavalieri
  38: { lat: -33.908, lng: 18.422 }, // The Silo, Cape Town
  39: { lat: 51.5045, lng: -0.0865 }, // Shangri-La at The Shard
  40: { lat: 22.305, lng: 114.161 }, // W Hong Kong
  41: { lat: 45.8, lng: 9.08 }, // Hilton Lake Como
  42: { lat: 12.93, lng: 100.88 }, // Siam@Siam, Pattaya
  43: { lat: 38.985, lng: 1.534 }, // Aguas de Ibiza
  44: { lat: 45.585, lng: 10.55 }, // AH Porticcioli, Lake Garda
  45: { lat: 36.853, lng: -75.977 }, // Hilton Virginia Beach
  46: { lat: 22.89, lng: -109.905 }, // Corazon Cabo
  47: { lat: 48.204, lng: 16.375 }, // Grand Ferdinand, Vienna
  48: { lat: 38.632, lng: -90.193 }, // Hyatt Centric Downtown St. Louis (former Last Hotel)
  49: { lat: 32.233, lng: -110.96 }, // Graduate Tucson
  50: { lat: -8.506, lng: 115.26 }, // Bisma Eight, Ubud
  51: { lat: 45.986, lng: 9.228 }, // Grand Hotel Tremezzo
  52: { lat: 35.24, lng: 25.73 }, // Daios Cove, Crete
  53: { lat: 37.13, lng: 27.37 }, // Amanruya, Bodrum
  54: { lat: 42.96, lng: 11.32 }, // Castello di Vicarello, Tuscany
  55: { lat: 37.1, lng: 27.29 }, // The Bodrum Edition
  56: { lat: 38.915, lng: 1.45 }, // Nobu Hotel Ibiza Bay
  57: { lat: -8.458, lng: 115.256 }, // Alila Ubud
  58: { lat: 43.35, lng: 12.14 }, // Castello di Reschio, Umbria
  59: { lat: 37.974, lng: 23.727 }, // The Dolli at Athens
  60: { lat: 34.035, lng: -118.237 }, // Soho Warehouse, Los Angeles
  61: { lat: 37.43, lng: 25.43 }, // Cali Mykonos
  62: { lat: 39.48, lng: 2.71 }, // Cap Rocat, Mallorca
  63: { lat: 25.224, lng: 55.285 }, // 25hours One Central, Dubai
  64: { lat: -24.3, lng: 31.95 }, // Singita Sweni, Kruger
  65: { lat: 40.631, lng: 14.596 }, // Hotel Santa Caterina, Amalfi
  66: { lat: -8.48, lng: 115.27 }, // Chapung SeBali, Ubud
  67: { lat: -8.45, lng: 115.24 }, // Capella Ubud
  68: { lat: -4.32, lng: 55.87 }, // Six Senses Zil Pasyon, Seychelles
  69: { lat: 6.27, lng: 81.4 }, // Wild Coast Tented Lodge, Sri Lanka
  70: { lat: -20.34, lng: 148.95 }, // Qualia, Hamilton Island
  71: { lat: 51.501, lng: -0.158 }, // The Berkeley, London
  72: { lat: 8.13, lng: 98.62 }, // Six Senses Yao Noi
  73: { lat: 48.872, lng: 2.315 }, // Le Bristol Paris
  74: { lat: -8.829, lng: 115.088 }, // Alila Villas Uluwatu
  75: { lat: 45.853, lng: 9.117 }, // Il Sereno, Lake Como
  76: { lat: 23.6, lng: 58.4 }, // The Chedi Muscat
  77: { lat: 9.58, lng: 99.97 }, // Four Seasons Koh Samui
  78: { lat: 7.985, lng: 98.278 }, // Amanpuri, Phuket
  79: { lat: 15.923, lng: 108.33 }, // Four Seasons The Nam Hai, Hoi An
  80: { lat: -4.583, lng: 55.94 }, // Fregate Island, Seychelles
  81: { lat: 5.55, lng: 72.9 }, // Joali, Maldives
  82: { lat: 5.6, lng: 73.0 }, // Alila Kothaifaru, Maldives
  83: { lat: 43.42, lng: 10.95 }, // Borgo Pignano, Tuscany
  84: { lat: 36.46, lng: 25.38 }, // Erosantorini
  85: { lat: 38.2, lng: 20.5 }, // Villa Althea, Kefalonia
  86: { lat: -22.91, lng: -68.2 }, // Tierra Atacama, Chile
  87: { lat: -22.5, lng: 17.35 }, // Omaanda, Namibia
  88: { lat: 46.67, lng: 11.13 }, // Miramonti, Merano
  89: { lat: 52.54, lng: 13.405 }, // Hotel Oderberger, Berlin
  90: { lat: 55.679, lng: 12.565 }, // Manon Les Suites, Copenhagen
  91: { lat: 42.68, lng: 18.05 }, // Sun Gardens Dubrovnik
  92: { lat: 4.52, lng: 73.36 }, // One&Only Reethi Rah, Maldives
  93: { lat: 13.36, lng: 103.86 }, // Amansara, Siem Reap
  94: { lat: 12.55, lng: 99.96 }, // Chiva Som, Hua Hin
  96: { lat: 43.706, lng: 7.333 }, // La Reserve de Beaulieu
  97: { lat: 51.83, lng: -2.05 }, // Cowley Manor, Cotswolds
  98: { lat: 32.72, lng: -16.76 }, // Albatroz, Madeira
  99: { lat: 32.643, lng: -16.92 }, // Belmond Reid's Palace, Madeira
  100: { lat: 13.83, lng: -61.05 }, // Boucan, St Lucia
  101: { lat: 25.13, lng: 55.117 }, // Atlantis The Palm, Dubai
  102: { lat: 28.459, lng: -81.46 }, // Cabana Bay, Orlando
  103: { lat: 28.087, lng: -16.74 }, // Hard Rock Tenerife
  104: { lat: -8.71, lng: 115.168 }, // The Stones, Bali
  105: { lat: 40.628, lng: 14.486 }, // Le Sirenuse, Positano
  106: { lat: 23.07, lng: 57.66 }, // Alila Jabal Akhdar, Oman
  107: { lat: -34.845, lng: -54.634 }, // Posada del Faro, Uruguay
  108: { lat: 44.59, lng: -1.21 }, // La Co(o)rniche, France
  110: { lat: 25.088, lng: 55.146 }, // Ciel Dubai Marina
  111: { lat: 26.8, lng: 36.9 }, // Desert Rock, Saudi Arabia
  112: { lat: 10.424, lng: -75.548 }, // Four Seasons Cartagena
  113: { lat: 48.883, lng: 2.3 }, // La Fondation, Paris
  114: { lat: 40.754, lng: -74.004 }, // Faena New York
  115: { lat: 51.51, lng: -0.149 }, // The Chancery Rosewood, London
  116: { lat: -1.48, lng: 29.62 }, // Bisate Lodge, Rwanda
  117: { lat: -24.36, lng: 31.2 }, // Royal Malewane, South Africa
  118: { lat: 39.08, lng: 1.42 }, // Hacienda Na Xamena, Ibiza
  119: { lat: 39.748, lng: 2.648 }, // Belmond La Residencia, Deia
  120: { lat: 39.8, lng: 2.69 }, // Jumeirah Port Soller
  121: { lat: 11.72, lng: 109.19 }, // Amanoi, Vietnam
  122: { lat: 32.78, lng: -96.799 }, // The Joule, Dallas
  123: { lat: 35.686, lng: 139.691 }, // Park Hyatt Tokyo
  124: { lat: 13.743, lng: 100.547 }, // Okura Prestige Bangkok
  125: { lat: 26.56, lng: 37.86 }, // Banyan Tree AlUla
  126: { lat: 21.278, lng: -157.832 }, // Halekulani, Waikiki
  127: { lat: 19.831, lng: -155.996 }, // Four Seasons Hualalai
  128: { lat: 21.83, lng: -72.34 }, // Amanyara, Turks and Caicos
  129: { lat: 20.68, lng: -156.443 }, // Four Seasons Maui
  130: { lat: 23.009, lng: -109.712 }, // One&Only Palmilla
  131: { lat: 22.22, lng: -159.498 }, // 1 Hotel Hanalei Bay
  132: { lat: -20.048, lng: 148.884 }, // InterContinental Hayman Island
  133: { lat: 20.687, lng: -156.441 }, // Grand Wailea
  134: { lat: 20.743, lng: -156.892 }, // Four Seasons Lanai
}

// Calculate distance between two points using Haversine formula
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180)
}

// Convert km to miles
export function kmToMiles(km: number): number {
  return km * 0.621371
}

// Format distance for display
export function formatDistance(km: number, useMiles: boolean = true): string {
  if (useMiles) {
    const miles = kmToMiles(km)
    if (miles < 1) {
      return `${Math.round(miles * 5280)} ft`
    }
    return `${Math.round(miles)} mi`
  }
  if (km < 1) {
    return `${Math.round(km * 1000)} m`
  }
  return `${Math.round(km)} km`
}
