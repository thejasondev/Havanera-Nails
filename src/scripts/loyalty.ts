/**
 * Sistema de Fidelidad - Havanera Nails
 * Gestión de puntos con localStorage y códigos de activación
 */

// Tipos
export interface LoyaltyData {
  clientId: string;
  points: number;
  createdAt: string;
  history: { date: string; code: string }[];
  discountUsed: boolean;
  discountCode?: string;
}

interface CodeData {
  code: string;
  clientId: string;
  expiresAt: number;
}

// Constantes
const STORAGE_KEY = 'havanera_loyalty';
const CODE_STORAGE_KEY = 'havanera_active_code';
const MAX_POINTS = 6;
const CODE_EXPIRY_MS = 2 * 60 * 1000; // 2 minutos

/**
 * Genera un UUID v4 simple
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Obtiene o crea los datos del cliente
 */
export function getOrCreateClient(): LoyaltyData {
  if (typeof window === 'undefined') {
    return createDefaultData();
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return createAndStore();
    }
  }
  return createAndStore();
}

function createDefaultData(): LoyaltyData {
  return {
    clientId: generateUUID(),
    points: 0,
    createdAt: new Date().toISOString(),
    history: [],
    discountUsed: false,
  };
}

function createAndStore(): LoyaltyData {
  const data = createDefaultData();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

/**
 * Guarda los datos del cliente
 */
export function saveClient(data: LoyaltyData): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
}

/**
 * Obtiene los puntos actuales
 */
export function getPoints(): number {
  return getOrCreateClient().points;
}

/**
 * Obtiene el ID del cliente
 */
export function getClientId(): string {
  return getOrCreateClient().clientId;
}

/**
 * Genera un código de activación temporal (para el dueño)
 */
export function generateActivationCode(clientId: string): string {
  const code = Math.floor(1000 + Math.random() * 9000).toString();

  const codeData: CodeData = {
    code,
    clientId,
    expiresAt: Date.now() + CODE_EXPIRY_MS,
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(CODE_STORAGE_KEY, JSON.stringify(codeData));
  }

  return code;
}

/**
 * Valida un código ingresado por la cliente
 */
export function validateAndAddPoint(inputCode: string): {
  success: boolean;
  message: string;
  points?: number;
  hasDiscount?: boolean;
} {
  const client = getOrCreateClient();

  // Si ya tiene el descuento usado, no puede sumar más puntos
  if (client.discountUsed) {
    // Reiniciar para nuevo ciclo
    client.points = 0;
    client.discountUsed = false;
    client.history = [];
  }

  // Verificar si ya tiene 6 puntos
  if (client.points >= MAX_POINTS) {
    return {
      success: false,
      message: '¡Ya tienes todos los puntos! Canjea tu descuento.',
      points: client.points,
      hasDiscount: true,
    };
  }

  // Validar el código (hash simple basado en el clientId)
  const expectedCode = generateExpectedCode(client.clientId, inputCode);

  if (!isValidCode(inputCode, client.clientId)) {
    return {
      success: false,
      message: 'Código inválido o expirado. Intenta de nuevo.',
      points: client.points,
    };
  }

  // Añadir punto
  client.points += 1;
  client.history.push({
    date: new Date().toISOString(),
    code: inputCode,
  });

  saveClient(client);

  const hasDiscount = client.points >= MAX_POINTS;

  return {
    success: true,
    message: hasDiscount
      ? '¡Felicidades! Completaste tu tarjeta. 🎉 Tienes 20% de descuento.'
      : `¡Punto añadido! Llevas ${client.points}/${MAX_POINTS}`,
    points: client.points,
    hasDiscount,
  };
}

/**
 * Genera el código esperado basado en el clientId
 * Usa un algoritmo simple: combina clientId + timestamp actual (minuto)
 */
function generateExpectedCode(clientId: string, inputCode: string): string {
  // El código se genera en el escáner y se valida aquí
  // Este es un placeholder - la validación real usa tiempo
  return inputCode;
}

/**
 * Valida si el código es válido para este cliente
 * Usa un sistema de tiempo: el código = hash(clientId + minuto actual)
 */
function isValidCode(code: string, clientId: string): boolean {
  // Verificar los últimos 3 minutos para dar margen
  for (let i = 0; i < 3; i++) {
    const timestamp = Math.floor((Date.now() - i * 60000) / 60000);
    const expected = generateTimeBasedCode(clientId, timestamp);
    if (code === expected) {
      return true;
    }
  }
  return false;
}

/**
 * Genera un código basado en el tiempo (para sincronización)
 */
export function generateTimeBasedCode(clientId: string, timestamp?: number): string {
  const ts = timestamp ?? Math.floor(Date.now() / 60000);

  // Hash simple: suma de códigos ASCII + timestamp
  let hash = 0;
  const combined = clientId + ts.toString();
  for (let i = 0; i < combined.length; i++) {
    hash = ((hash << 5) - hash + combined.charCodeAt(i)) | 0;
  }

  // Convertir a código de 4 dígitos
  const code = Math.abs(hash % 10000)
    .toString()
    .padStart(4, '0');
  return code;
}

/**
 * Canjea el descuento
 */
export function redeemDiscount(): { success: boolean; discountCode: string } {
  const client = getOrCreateClient();

  if (client.points < MAX_POINTS) {
    return { success: false, discountCode: '' };
  }

  // Generar código de descuento único
  const discountCode = `HAV20-${generateUUID().slice(0, 8).toUpperCase()}`;

  client.discountUsed = true;
  client.discountCode = discountCode;
  saveClient(client);

  return { success: true, discountCode };
}

/**
 * Reinicia la tarjeta después de usar el descuento
 */
export function resetLoyaltyCard(): void {
  const client = getOrCreateClient();
  client.points = 0;
  client.discountUsed = false;
  client.discountCode = undefined;
  client.history = [];
  saveClient(client);
}

/**
 * Verifica si tiene descuento disponible
 */
export function hasDiscountAvailable(): boolean {
  const client = getOrCreateClient();
  return client.points >= MAX_POINTS && !client.discountUsed;
}
