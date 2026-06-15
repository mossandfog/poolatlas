// Approximate coordinates for pools (city-level accuracy)
// Format: [poolId]: { lat, lng }

export const poolCoordinates: Record<number, { lat: number; lng: number }> = {
  // Top 20 Pools
  1: { lat: 36.4316, lng: 25.4317 }, // Grace Santorini, Greece
  2: { lat: 1.2834, lng: 103.8607 }, // Marina Bay Sands, Singapore
  3: { lat: -8.5217, lng: 115.5019 }, // Amankila, Bali
  4: { lat: 43.5528, lng: 7.1286 }, // Hotel du Cap-Eden-Roc, France
  5: { lat: 37.0167, lng: -111.5833 }, // Amangiri, Utah
  6: { lat: 40.6333, lng: 14.6 }, // Monastero Santa Rosa, Amalfi
  7: { lat: 40.65, lng: 14.6167 }, // Belmond Hotel Caruso, Ravello
  8: { lat: 24.5833, lng: 73.6833 }, // Oberoi Udaivilas, India
  9: { lat: 63.88, lng: -22.45 }, // Blue Lagoon Retreat, Iceland
  10: { lat: 35.6895, lng: 139.6917 }, // Aman Tokyo, Japan
  
  // Additional Top Pools
  11: { lat: 36.4167, lng: 25.4333 }, // Perivolas, Santorini
  12: { lat: 45.8833, lng: 9.0833 }, // Como Castello, Lake Como
  13: { lat: -16.5, lng: -151.75 }, // Four Seasons Bora Bora
  14: { lat: -8.4095, lng: 115.1889 }, // Hanging Gardens Bali
  15: { lat: 4.2167, lng: 73.5333 }, // St Regis Maldives
  16: { lat: 13.8667, lng: -60.9833 }, // Jade Mountain, St Lucia
  17: { lat: 4.3, lng: 73.45 }, // One&Only Reethi Rah, Maldives
  18: { lat: 26.1, lng: 56.35 }, // Six Senses Zighy Bay, Oman
  19: { lat: -24.9833, lng: 31.5833 }, // Singita Lebombo, South Africa
  20: { lat: 40.6333, lng: 14.4833 }, // Le Sirenuse, Positano
  
  // More pools across regions
  21: { lat: 25.1167, lng: 55.1386 }, // Atlantis The Palm, Dubai
  22: { lat: 28.4744, lng: -81.4669 }, // Universal Orlando
  23: { lat: 28.0722, lng: -16.7264 }, // Hard Rock Tenerife
  24: { lat: -8.7275, lng: 115.1689 }, // Waterbom Bali area
  25: { lat: 40.6281, lng: 14.4861 }, // Le Sirenuse, Positano
  26: { lat: 23.15, lng: 57.0833 }, // Alila Jabal Akhdar, Oman
  27: { lat: -34.9667, lng: -54.95 }, // Posada del Faro, Uruguay
  28: { lat: 44.65, lng: -1.2333 }, // La Co(o)rniche, France
  
  // US Pools
  29: { lat: 36.1147, lng: -115.1728 }, // Bellagio, Las Vegas
  30: { lat: 34.0259, lng: -118.7798 }, // Nobu Malibu
  31: { lat: 21.2769, lng: -157.8294 }, // Halekulani, Honolulu
  32: { lat: 33.8303, lng: -116.5453 }, // Parker Palm Springs
  33: { lat: 25.7617, lng: -80.1918 }, // Faena Miami Beach
  34: { lat: 36.1699, lng: -115.1398 }, // Wynn Las Vegas
  35: { lat: 20.9969, lng: -156.6617 }, // Four Seasons Maui
  
  // European Pools
  36: { lat: 41.3851, lng: 2.1734 }, // W Barcelona
  37: { lat: 37.7667, lng: 26.9833 }, // Macakizi Bodrum
  38: { lat: 43.7696, lng: 11.2558 }, // Four Seasons Florence
  39: { lat: 46.005, lng: 8.9467 }, // Kulm Hotel St. Moritz
  40: { lat: 50.0875, lng: 14.4214 }, // Four Seasons Prague
  
  // Asian Pools
  41: { lat: 22.2855, lng: 114.1577 }, // Peninsula Hong Kong
  42: { lat: 13.7563, lng: 100.5018 }, // Mandarin Oriental Bangkok
  43: { lat: -8.8, lng: 115.2333 }, // Alila Villas Uluwatu
  44: { lat: 1.2494, lng: 103.8303 }, // Raffles Singapore
  45: { lat: 35.0116, lng: 135.7681 }, // Aman Kyoto
  
  // Middle East & Africa
  46: { lat: 29.9792, lng: 31.1342 }, // Mena House, Cairo
  47: { lat: 31.5, lng: 34.45 }, // Beresheet, Israel
  48: { lat: -33.9628, lng: 18.4098 }, // One&Only Cape Town
  49: { lat: 25.2048, lng: 55.2708 }, // Burj Al Arab, Dubai
  50: { lat: -1.9403, lng: 30.0445 }, // Bisate Lodge, Rwanda
  
  // Americas
  51: { lat: 19.4326, lng: -99.1332 }, // Four Seasons Mexico City
  52: { lat: 20.6296, lng: -87.0739 }, // Rosewood Mayakoba
  53: { lat: -22.9068, lng: -43.1729 }, // Copacabana Palace, Rio
  54: { lat: -13.5319, lng: -71.9675 }, // Belmond Sanctuary, Peru
  55: { lat: 18.4655, lng: -66.1057 }, // St Regis Bahia Beach, PR
  
  // Australia & Pacific
  56: { lat: -33.8688, lng: 151.2093 }, // Park Hyatt Sydney
  57: { lat: -16.4827, lng: 145.4565 }, // Lizard Island, GBR
  58: { lat: -37.8136, lng: 144.9631 }, // Crown Melbourne
  59: { lat: -17.7765, lng: 177.415 }, // Likuliku Fiji
  60: { lat: -21.2167, lng: -175.15 }, // Fafa Island Tonga
  
  // Additional notable pools (sampling from the 100+)
  61: { lat: 36.4167, lng: 25.4167 }, // Canaves Oia, Santorini
  62: { lat: 39.6403, lng: 19.9217 }, // Domes Miramare, Corfu
  63: { lat: 37.0667, lng: 25.15 }, // Kenshō Psarou, Mykonos
  64: { lat: 40.8518, lng: 14.2681 }, // Grand Hotel Vesuvio, Naples
  65: { lat: 41.9028, lng: 12.4964 }, // Hotel de Russie, Rome
  
  // More pools with correct locations
  29: { lat: 37.0153, lng: -111.5910 }, // Amangiri Camp Sarika, Utah
  30: { lat: 13.7563, lng: 100.5018 }, // 137 Pillars Bangkok, Thailand
  34: { lat: 18.1696, lng: -63.0517 }, // Belmond Cap Juluca, Anguilla
  66: { lat: 40.7589, lng: -73.9851 }, // The Standard High Line, NYC
  67: { lat: -8.4095, lng: 115.1889 }, // Capella Ubud, Bali
  68: { lat: -4.2833, lng: 55.9500 }, // Six Senses Zil Pasyon, Seychelles
  69: { lat: 30.2672, lng: -97.7431 }, // Hotel Saint Cecilia, Austin
  70: { lat: 29.7604, lng: -95.3698 }, // Hotel Granduca, Houston

  // Pool Superlatives
  101: { lat: 25.1167, lng: 55.1386 }, // Atlantis Dubai (waterslide)
  102: { lat: 28.4744, lng: -81.4669 }, // Universal Orlando (waterslide)
  103: { lat: 28.0722, lng: -16.7264 }, // Hard Rock Tenerife (waterslide)
  104: { lat: -8.7275, lng: 115.1689 }, // Waterbom Bali (waterslide)
  105: { lat: 40.6281, lng: 14.4861 }, // Le Sirenuse, Positano
  106: { lat: 23.15, lng: 57.0833 }, // Alila Jabal Akhdar, Oman
  107: { lat: -34.9667, lng: -54.95 }, // Posada del Faro, Uruguay
  108: { lat: 44.65, lng: -1.2333 }, // La Co(o)rniche, France
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
