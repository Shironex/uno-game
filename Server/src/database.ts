import { Pool, PoolClient } from "pg";

interface DatabaseConfig {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
}

const config: DatabaseConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
};

const pool = new Pool(config);

const connect = new Promise<void>((resolve, reject) => {
    pool.connect((err: Error, client: PoolClient, release: () => void) => {
      if (err) {
        reject(err);
        return console.error("Error acquiring client", err.stack);
      }
      console.log("Connected to database");
      release();
      resolve();
    });
  });

export { connect };
