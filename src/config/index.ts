import dotenv from "dotenv";
import { env } from 'process';
dotenv.config({ quiet: true });

// dotenv config
const config = {
    port: env.PORT,
    db_url: env.DATABASE_URL,
    access_secrete: env.JWT_SECRETE,
    expire_jwt: env.ACCESS_EXPIRE as string,
    origin_url: env.CORS_URL,
    node_env: 'development',
}

export default config;