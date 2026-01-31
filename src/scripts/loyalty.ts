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
  // Seguridad nueva
  lastCodeTimestamp?: number; // Para evitar replay attacks
  failedAttempts?: number; // Para rate limiting
  blockUntil?: number; // Timestamp de bloqueo
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
const MAX_FAILED_ATTEMPTS = 3;
const BLOCK_DURATION_MS = 60 * 1000; // 1 minuto de bloqueo

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
    failedAttempts: 0,
    blockUntil: 0,
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
  // Generar código aleatorio de 4 dígitos
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
  blocked?: boolean; // Nuevo: indica si está bloqueado
} {
  const client = getOrCreateClient();
  const now = Date.now();

  // 1. Verificar bloqueo por Rate Limiting
  if (client.blockUntil && now < client.blockUntil) {
    const remainingSeconds = Math.ceil((client.blockUntil - now) / 1000);
    return {
      success: false,
      message: `Sistema bloqueado temporalmente. Intenta en ${remainingSeconds}s`,
      points: client.points,
      blocked: true,
    };
  }

  // Si ya pasó el tiempo de bloqueo, resetear intentos
  if (client.blockUntil && now >= client.blockUntil) {
    client.blockUntil = 0;
    client.failedAttempts = 0;
    saveClient(client);
  }

  // 2. Si ya tiene el descuento disponible, no puede sumar más puntos sin canjear
  if (client.points >= MAX_POINTS) {
    return {
      success: false,
      message: '¡Ya tienes 6 puntos! Canjea y reinicia tu tarjeta para seguir sumando.',
      points: client.points,
      hasDiscount: true,
    };
  }

  // 3. Validar el código con reglas de seguridad
  // Buscamos si el código coincide con algún timestamp reciente
  const validTimestamp = getValidTimestampForCode(inputCode, client.clientId);

  if (validTimestamp === null) {
    // Código inválido manejado como ataque potencial
    return handleFailedAttempt(client);
  }

  // 4. Anti-Replay Attack: Verificar que el timestamp sea NUEVO
  // El nuevo timestamp debe ser mayor estrictamente al último usado
  if (client.lastCodeTimestamp && validTimestamp <= client.lastCodeTimestamp) {
    return {
      success: false,
      message: 'Este código ya fue utilizado. Solicita uno nuevo.',
      points: client.points,
    };
  }

  // 5. Éxito: Añadir punto y guardar estado
  client.points += 1;
  client.failedAttempts = 0; // Resetear fallos
  client.blockUntil = 0;
  client.lastCodeTimestamp = validTimestamp; // Marcar timestamp como usado

  client.history.push({
    date: new Date().toISOString(),
    code: inputCode,
  });

  saveClient(client);

  const hasDiscount = client.points >= MAX_POINTS;

  return {
    success: true,
    message: hasDiscount
      ? '¡Felicidades! Completaste tu tarjeta. 🎉'
      : `¡Punto añadido! Llevas ${client.points}/${MAX_POINTS}`,
    points: client.points,
    hasDiscount,
  };
}

/**
 * Maneja el incremento de intentos fallidos y bloqueo
 */
function handleFailedAttempt(client: LoyaltyData) {
  client.failedAttempts = (client.failedAttempts || 0) + 1;

  let message = 'Código incorrecto.';
  let blocked = false;

  if (client.failedAttempts >= MAX_FAILED_ATTEMPTS) {
    client.blockUntil = Date.now() + BLOCK_DURATION_MS;
    message = 'Demasiados intentos fallidos. Sistema bloqueado por 1 minuto.';
    blocked = true;
  } else {
    const remaining = MAX_FAILED_ATTEMPTS - client.failedAttempts;
    message = `Código incorrecto. Te quedan ${remaining} intentos.`;
  }

  saveClient(client);

  return {
    success: false,
    message,
    points: client.points,
    blocked,
  };
}

/**
 * Verifica si el código corresponde a un timestamp válido
 * Ventana: 1 minuto futuro (drift/rapid) a 5 minutos pasado
 */
function getValidTimestampForCode(code: string, clientId: string): number | null {
  // i = -1 (futuro 1 min), i = 0 (actual), i > 0 (pasado)
  for (let i = -1; i <= 5; i++) {
    const timestamp = Math.floor((Date.now() - i * 60000) / 60000);
    const expected = generateTimeBasedCode(clientId, timestamp);
    if (code === expected) {
      return timestamp;
    }
  }
  return null;
}

/**
 * Genera un código basado en el tiempo (para sincronización)
 */
export function generateTimeBasedCode(clientId: string, timestamp?: number): string {
  const ts = timestamp ?? Math.floor(Date.now() / 60000);

  // Hash simple: suma de códigos ASCII + timestamp
  // Usamos un algoritmo simple pero efectivo para modo offline
  let hash = 0;
  const combined = clientId + ts.toString() + 'HAVANERA_SECRET_SALT'; // Salt simple para más entropía
  for (let i = 0; i < combined.length; i++) {
    hash = ((hash << 5) - hash + combined.charCodeAt(i)) | 0;
  }

  // Convertir a código de 4 dígitos positivo
  const code = Math.abs(hash % 10000)
    .toString()
    .padStart(4, '0');
  return code;
}

/**
 * Reinicia la tarjeta después de usar el descuento
 */
export function resetLoyaltyCard(): LoyaltyData {
  const client = getOrCreateClient();

  // Guardamos el historial antiguo si quisiéramos (opcional),
  // por ahora reinicio simple pero manteniendo el ID cliente
  client.points = 0;
  client.discountUsed = false;
  client.discountCode = undefined;
  client.history = []; // Limpiamos historial visible
  // No reiniciamos lastCodeTimestamp para evitar que reusen códigos viejos inmediatos
  client.failedAttempts = 0;
  client.blockUntil = 0;

  saveClient(client);
  return client;
}

/**
 * Verifica si tiene descuento disponible
 */
export function hasDiscountAvailable(): boolean {
  const client = getOrCreateClient();
  return client.points >= MAX_POINTS;
}
