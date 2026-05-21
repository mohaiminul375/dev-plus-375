import { pool } from "../../db";
import type { IIssue } from "./issue.interface"

const issueCreateIntoDB = async (payload: IIssue) => {
    console.log('step_2')
    const { reporter_id, title, description, type } = payload;
    console.log(payload)
    const result = await pool.query(`
    INSERT INTO issue(reporter_id,title,description,type) VALUES($1,$2,$3,$4) RETURNING *`, [reporter_id, title, description, type])
    console.log('step_3', result)
    return result
}

export const issueService = {
    issueCreateIntoDB
}