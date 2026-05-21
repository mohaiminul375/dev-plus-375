import { pool } from "../../db";
import type { IUser } from "./user.interface"
import bcrypt from "bcryptjs";
const createUserIntoDB = async (payload: IUser) => {
    const { name, email, password } = payload;
    const hashPass = await bcrypt.hash(password, 10);
    const result = await pool.query(`
        INSERT INTO users(name,email,password) VALUES($1,$2,$3)
        RETURNING *`, [name, email, hashPass]);
    return result;
}

export const userService = {
    createUserIntoDB,
}