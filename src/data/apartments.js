import { BUILDINGS_DATA } from './buildings';

export const APARTMENT_TYPES = {
  UNIT_1: {
    typeCode: 'Type-1',
    typeName: '3 BHK Luxury (Wing A/Left)',
    superBuiltUpArea: 1845,
    carpetArea: 1330,
    balconiesCount: 2,
    bathroomsCount: 3,
    facing: 'East / Morning Garden View',
    features: [
      'Master suite with dressing nook',
      'Dual balconies with garden vistas',
      'Dedicated utility & wash yard',
      'East-facing vastu compliant entrance'
    ],
    samplePrice: '₹1.85 Cr*',
  },
  UNIT_2: {
    typeCode: 'Type-2',
    typeName: '3 BHK Grand Royal (Center Wing)',
    superBuiltUpArea: 1980,
    carpetArea: 1410,
    balconiesCount: 2,
    bathroomsCount: 3,
    facing: 'Direct Central Park & Boulevard',
    features: [
      'Expanded 24-ft wide living salon',
      'Panoramic central park frontage',
      'Gourmet island kitchen layout',
      'Powder room / en-suite for all bedrooms'
    ],
    samplePrice: '₹1.98 Cr*',
  },
  UNIT_3: {
    typeCode: 'Type-3',
    typeName: '3 BHK Elite (Wing C/Right)',
    superBuiltUpArea: 1875,
    carpetArea: 1350,
    balconiesCount: 2,
    bathroomsCount: 3,
    facing: 'Clubhouse & Sunset Deck',
    features: [
      'Corner privacy with dual side ventilation',
      'Private bedroom wing separation',
      'Wide master balcony overlooking pool',
      'Pre-fitted smart home automation conduits'
    ],
    samplePrice: '₹1.88 Cr*',
  },
};

// Deterministic status generator for demo data
const getDemoStatus = (towerCode, floor, unitIndex) => {
  const seed = (towerCode.charCodeAt(0) * 17 + floor * 7 + unitIndex * 13) % 100;
  if (seed < 22) return 'sold';
  if (seed < 48) return 'booked';
  return 'available';
};

// Generate all 135 apartments
export const ALL_APARTMENTS = BUILDINGS_DATA.flatMap((bld) => {
  const towerApartments = [];
  for (let floor = 1; floor <= 15; floor++) {
    for (let u = 1; u <= 3; u++) {
      const unitNumber = floor * 100 + u;
      const aptId = `${bld.code}-${unitNumber}`;
      const typeKey = u === 1 ? 'UNIT_1' : u === 2 ? 'UNIT_2' : 'UNIT_3';
      const typeInfo = APARTMENT_TYPES[typeKey];
      const status = getDemoStatus(bld.code, floor, u);

      towerApartments.push({
        id: aptId,
        buildingId: bld.id,
        buildingCode: bld.code,
        buildingName: bld.name,
        floorNumber: floor,
        unitIndex: u,
        unitPosition: u === 1 ? 'left' : u === 2 ? 'center' : 'right',
        unitNumber: `${bld.code}-${unitNumber}`,
        displayName: `Apartment ${bld.code}-${unitNumber}`,
        config: '3 BHK',
        ...typeInfo,
        status, // 'available' | 'booked' | 'sold'
        floorLevel: floor <= 5 ? 'Lower Levels' : floor <= 10 ? 'Mid Heights' : 'Penthouse View Levels',
      });
    }
  }
  return towerApartments;
});

// Helper lookups
export const getApartmentsByTower = (buildingId) =>
  ALL_APARTMENTS.filter((apt) => apt.buildingId === buildingId);

export const getApartmentsByFloor = (buildingId, floorNumber) =>
  ALL_APARTMENTS.filter(
    (apt) => apt.buildingId === buildingId && apt.floorNumber === floorNumber
  );

export const getApartmentById = (apartmentId) =>
  ALL_APARTMENTS.find((apt) => apt.id === apartmentId);
