import { pool } from "../../db";
import type { IUser } from "./user.interface"
import bcrypt from "bcryptjs";
// 
const createUserIntoDB = async (payload: IUser) => {
    const { name, email, password, role } = payload;
    // hashed password
    const hashPass = await bcrypt.hash(password, 10);
    const result = await pool.query(`
        INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,COALESCE($4,'contributor'))
        RETURNING id, name, email,role,created_at,updated_at`, [name, email, hashPass, role]);
    console.log(result)
    return result;
}

export const userService = {
    createUserIntoDB,
}