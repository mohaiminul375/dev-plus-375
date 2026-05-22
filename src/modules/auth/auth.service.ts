import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt, { type SignOptions } from 'jsonwebtoken';
import config from "../../config";
// pending error handling
const LoginUserIntoDB = async (payload: { email: string, password: string }) => {
    const { email, password } = payload;
    const userExisted = await pool.query(`
    SELECT * FROM users WHERE email=$1`, [email]);
    if (userExisted.rows.length === 0) {
        throw new Error("Invalid credential");
    }
    // get user
    const user = userExisted.rows[0];
    // compare pass
    const matchedPass = await bcrypt.compare(password, user.password)
    if (!matchedPass) {
        throw new Error("Invalid credential");
    }
    // generate token
    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }
    // delete user.password;
    // generate token
    const accessToken = jwt.sign(jwtPayload, config.access_secrete as string, { expiresIn: config.expire_jwt } as SignOptions)
    return {
        accessToken,
        user
    }
}

export const authService = {
    LoginUserIntoDB,
}