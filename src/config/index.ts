import dotenv from "dotenv";
import { access } from "fs";
import { env } from 'process';
dotenv.config({ quiet: true });

const config = {
    port: env.PORT,
    db_url: env.DATABASE_URL,
    access_secrete: env.JWT_SECRETE,
}

export default config;