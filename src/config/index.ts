import dotenv from "dotenv";
import { access } from "fs";
import { env } from 'process';
dotenv.config({ quiet: true });

const config = {
    port: env.PORT,
    db_url: env.DATABASE_URL,
    access_secrete: env.JWT_SECRETE,
    expire_jwt:env.ACCESS_EXPIRE as string,
}

export default config;