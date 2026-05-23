import { Pool } from "pg";
import config from "../config";
import sendResponse from "../utility/sendResponse";
// neon db url
export const pool = new Pool({
    connectionString: config.db_url,
})

// connect neon DB
export const initDB = async () => {
    try {
        // user table
        await pool.query(`
     CREATE TABLE IF NOT EXISTS users(
     id SERIAL PRIMARY KEY,
     name VARCHAR(200) NOT NULL,
     email VARCHAR(200) UNIQUE NOT NULL,
     password text NOT NULL,
     role VARCHAR(12) DEFAULT 'contributor',
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
     )`);
        // issue table NOT NULL
        await pool.query(`
     CREATE TABLE IF NOT EXISTS issues(
     id SERIAL PRIMARY KEY,
     title VARCHAR(150) NOT NULL,
     description TEXT NOT NULL CHECK (char_length(description) >= 20),
     type VARCHAR(20) NOT NULL,
     status VARCHAR(15) DEFAULT 'open' NOT NULL,
     reporter_id INT NOT NULL,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
     )`)
        console.log('*..DB connected..*')
    } catch (error: unknown) {
        console.error(error);
        throw error;
    }
}