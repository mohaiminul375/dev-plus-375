import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
    connectionString: config.db_url,
})

export const initDB = async () => {
    try {
        // user table
        await pool.query(`
     CREATE TABLE IF NOT EXISTS users(
     id SERIAL PRIMARY KEY,
     name text NOT NULL,
     email text UNIQUE NOT NULL,
     password text NOT NULL,
     role text DEFAULT 'contributor',
     created_at TIMESTAMP DEFAULT NOW(),
     update_at TIMESTAMP DEFAULT NOW()
     )`);
        // issue table
        console.log('..DB connected')
    } catch (error: any) {
        console.error(error);
    }
}