export class Status {
  created_at: string;
  dependencies: Dependencies;
}

export class Dependencies {
  database: Database;
}

export class Database {
  database_version: string;
  max_connections: number;
  active_connections: number;
}
