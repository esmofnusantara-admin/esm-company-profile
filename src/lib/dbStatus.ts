import net from "net";

/**
 * Global DB connection health tracking with instant TCP probing
 * Mencegah freeze 4-5 detik pada cold start dan menghindari spam prisma:error saat PostgreSQL offline.
 */
let dbOfflineUntil = 0;

function probePort(port = 5433, host = "127.0.0.1") {
  const socket = new net.Socket();
  socket.setTimeout(120);

  socket.on("connect", () => {
    socket.destroy();
    dbOfflineUntil = 0;
  });

  socket.on("timeout", () => {
    socket.destroy();
    dbOfflineUntil = Date.now() + 20000;
  });

  socket.on("error", () => {
    socket.destroy();
    dbOfflineUntil = Date.now() + 20000;
  });

  try {
    socket.connect(port, host);
  } catch {
    dbOfflineUntil = Date.now() + 20000;
  }
}

// Immediate probe on module initialization (resolves in ~4ms)
probePort();

export function isDbKnownOffline(): boolean {
  const now = Date.now();
  if (now > dbOfflineUntil && dbOfflineUntil !== 0) {
    // 20 detik telah berlalu, lakukan probe ulang di background
    probePort();
  }
  return now < dbOfflineUntil;
}

export function markDbOffline(durationMs = 20000): void {
  dbOfflineUntil = Date.now() + durationMs;
}

export function markDbOnline(): void {
  dbOfflineUntil = 0;
}
