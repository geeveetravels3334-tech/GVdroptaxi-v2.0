
import Database from "better-sqlite3";
import path from "path";

export class DatabaseService {
  private db: Database.Database;

  constructor() {
    // Stores the DB in the mcp-server root
    const dbPath = path.resolve("local_data.sqlite");
    this.db = new Database(dbPath);
    this.init();
  }

  private init() {
    // Create a default table for logs or local caches
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS server_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        action TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  async query(sql: string, params: any[]) {
    try {
      const stmt = this.db.prepare(sql);
      // Determine if it's a read (SELECT) or write (INSERT/UPDATE/DELETE)
      // For safety, this basic implementation treats everything as 'all' or 'run' based on syntax
      // In production, strictly separate read/write tools.
      
      if (sql.trim().toLowerCase().startsWith("select")) {
        const rows = stmt.all(...params);
        return {
          content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
        };
      } else {
        throw new Error("This tool only supports SELECT queries. Use db_execute for writes.");
      }
    } catch (error: any) {
      throw new Error(`SQLite Error: ${error.message}`);
    }
  }
}
