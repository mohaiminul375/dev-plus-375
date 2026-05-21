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
     role VARCHAR(12) DEFAULT 'contributor',
     created_at TIMESTAMP DEFAULT NOW(),
     update_at TIMESTAMP DEFAULT NOW()
     )`);
        // issue table
        await pool.query(`
     CREATE TABLE IF NOT EXISTS issue(
     id SERIAL PRIMARY KEY,
     title VARCHAR(150) NOT NULL,
     description TEXT NOT NULL CHECK (char_length(description) >= 20),
     type VARCHAR(20) NOT NULL,
     status VARCHAR(15) DEFAULT 'open' NOT NULL,
     reporter_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
     created_at TIMESTAMP DEFAULT NOW(),
     update_at TIMESTAMP DEFAULT NOW()
     )`)
        console.log('..DB connected')
    } catch (error: any) {
        console.error(error);
    }
}