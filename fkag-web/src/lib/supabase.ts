/**
 * Cliente REST de Supabase (sin dependencia externa — solo fetch).
 * Usa la anon key: solo lecturas públicas de inventario.
 * Las escrituras (leads) NO pasan por aquí, van al webhook de n8n.
 */
import { site } from '../config/site';

const HEADERS = {
  apikey: site.supabaseKey,
  Authorization: `Bearer ${site.supabaseKey}`,
};

/** Fila cruda de la tabla `inventory` en Supabase. */
export interface InventoryRow {
  id?: string;
  stock?: string;
  year?: number;
  make?: string;
  model?: string;
  trim?: string;
  body_type?: string;
  price?: number;
  msrp?: number;
  mileage?: number;
  fuel?: string;
  transmission?: string;
  drivetrain?: string;
  engine?: string;
  exterior_color?: string;
  interior_color?: string;
  vin?: string;
  badge?: string;
  mpg_city?: number;
  mpg_highway?: number;
  cover_image?: string;
  gallery?: string[];
  features?: string[];
  description?: string;
  featured?: boolean;
  created_at?: string;
}

/** Vehículo normalizado que consume la UI. */
export interface Vehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  bodyType: string;
  price: number;
  msrp: number | null;
  mileage: number;
  fuel: string;
  transmission: string;
  drivetrain: string;
  engine: string;
  exteriorColor: string;
  interiorColor: string;
  vin: string;
  stock: string;
  badge: string;
  mpgCity: number | null;
  mpgHighway: number | null;
  photos: number;
  image: string;
  photoArray: string[];
  features: string[];
  description: string;
  featured: boolean;
}

const PLACEHOLDER = '/images/placeholder.svg';

export function mapVehicle(r: InventoryRow): Vehicle {
  const gallery = Array.isArray(r.gallery) ? r.gallery : [];
  const firstImg = r.cover_image || gallery[0] || PLACEHOLDER;
  const id =
    r.id ||
    r.stock ||
    `${r.year || ''}-${r.make || ''}-${r.model || ''}`.toLowerCase().replace(/\s+/g, '-');
  return {
    id,
    year: r.year ?? 0,
    make: r.make ?? '',
    model: r.model ?? '',
    trim: r.trim ?? '',
    bodyType: (r.body_type ?? 'sedan').toLowerCase(),
    price: Number(r.price) || 0,
    msrp: r.msrp ? Number(r.msrp) : null,
    mileage: Number(r.mileage) || 0,
    fuel: r.fuel ?? 'Gasoline',
    transmission: r.transmission ?? 'Automatic',
    drivetrain: r.drivetrain ?? 'FWD',
    engine: r.engine ?? '',
    exteriorColor: r.exterior_color ?? '',
    interiorColor: r.interior_color ?? '',
    vin: r.vin ?? '',
    stock: r.stock ?? '',
    badge: r.badge ?? '',
    mpgCity: r.mpg_city ?? null,
    mpgHighway: r.mpg_highway ?? null,
    photos: gallery.length,
    image: firstImg,
    photoArray: gallery,
    features: Array.isArray(r.features) ? r.features : [],
    description: r.description ?? '',
    featured: Boolean(r.featured),
  };
}

async function query(path: string): Promise<InventoryRow[]> {
  try {
    const res = await fetch(`${site.supabaseUrl}/rest/v1/${path}`, { headers: HEADERS });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as InventoryRow[];
  } catch (err) {
    console.error('[supabase] fetch error:', err);
    return [];
  }
}

export async function getAllVehicles(): Promise<Vehicle[]> {
  const rows = await query('inventory?select=*&order=created_at.desc');
  return rows.map(mapVehicle);
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  const rows = await query(`inventory?id=eq.${encodeURIComponent(id)}&select=*`);
  return rows.length ? mapVehicle(rows[0]) : null;
}

export async function getFeaturedVehicles(limit = 6): Promise<Vehicle[]> {
  let rows = await query(`inventory?featured=eq.true&order=created_at.desc&limit=${limit}`);
  if (rows.length < 3) {
    rows = await query(`inventory?order=created_at.desc&limit=${limit}`);
  }
  return rows.map(mapVehicle);
}
