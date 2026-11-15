import net from "net";

/**
 * Global DB connection health tracking with instant TCP probing
 * Mencegah freeze 4-5 detik pada cold start dan menghindari spam prisma:error saat PostgreSQL offline.
 */
let dbOfflineUntil = 0;

function getDatabaseHostAndPort(): { host: string; port: number } {
  const dbUrl = process.env.DATABASE_URL;
  if (dbUrl) {
    try {
      const url = new URL(dbUrl);
      return {
        host: url.hostname || "127.0.0.1",
        port: url.port ? parseInt(url.port, 10) : 5432,
      };
    } catch {
      const match = dbUrl.match(/@([^:/]+)(?::(\d+))?/);
      if (match) {
        return {
          host: match[1] || "127.0.0.1",
          port: match[2] ? parseInt(match[2], 10) : 5432,
        };
      }
    }
  }
  const envPort = process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : 5432;
  return { host: "127.0.0.1", port: envPort };
}

function probePort() {
  const { host, port } = getDatabaseHostAndPort();
  const socket = new net.Socket();
  socket.setTimeout(1500);

  socket.on("connect", () => {
    socket.destroy();
    dbOfflineUntil = 0;
  });

  socket.on("timeout", () => {
    socket.destroy();
    if (process.env.NODE_ENV !== "production") {
      dbOfflineUntil = Date.now() + 15000;
    }
  });

  socket.on("error", () => {
    socket.destroy();
    if (process.env.NODE_ENV !== "production") {
      dbOfflineUntil = Date.now() + 15000;
    }
  });

  try {
    socket.connect(port, host);
  } catch {
    if (process.env.NODE_ENV !== "production") {
      dbOfflineUntil = Date.now() + 15000;
    }
  }
}

// Immediate probe on module initialization
probePort();

export function isDbKnownOffline(): boolean {
  if (process.env.NODE_ENV === "production") {
    // Di production Docker, jangan matikan koneksi DB pre-emptif via probe port
    return false;
  }
  const now = Date.now();
  if (now > dbOfflineUntil && dbOfflineUntil !== 0) {
    probePort();
  }
  return now < dbOfflineUntil;
}

export function markDbOffline(durationMs = 15000): void {
  dbOfflineUntil = Date.now() + durationMs;
}

export function markDbOnline(): void {
  dbOfflineUntil = 0;
}

