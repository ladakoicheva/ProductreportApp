// Фейковые координаты ферм и описание локаций
export const FARM_LOCATIONS = {
  'Meat & Poultry': {
    name: 'Green Pastures Farm',
    coordinates: [51.5074, -0.1278], // Лондон
    description: 'Органическая ферма с чистыми пастбищами',
    region: 'England'
  },
  'Vegetables & Greens': {
    name: 'Valley Organic Gardens',
    coordinates: [48.8566, 2.3522], // Париж
    description: 'Овощное хозяйство с биоустойчивыми методами',
    region: 'France'
  },
  'Dairy & Eggs': {
    name: 'Alpine Dairy Co.',
    coordinates: [47.3769, 8.5472], // Цюрих
    description: 'Молочная ферма в альпийских горах',
    region: 'Switzerland'
  },
  'Fruits': {
    name: 'Sunny Orchards',
    coordinates: [40.7128, -74.0060], // Нью-Йорк
    description: 'Плодовый сад с традиционными методами выращивания',
    region: 'USA'
  },
  'Wine': {
    name: 'Vineyard Heritage Estate',
    coordinates: [43.6929, 7.2674], // Болонья
    description: 'Винодельческое хозяйство с семейными традициями',
    region: 'Italy'
  }
}

export const DEFAULT_CENTER = [51.5074, -0.1278] // Центр карты по умолчанию
export const DEFAULT_ZOOM = 3
