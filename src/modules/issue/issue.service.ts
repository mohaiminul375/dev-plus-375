import { pool } from "../../db";
import type { IIssue } from "./issue.interface"

const issueCreateIntoDB = async (payload: IIssue, user_id: string) => {
  console.log('step_2')
  const { title, description, type } = payload;
  console.log(payload, 'paylod from')
  const result = await pool.query(`
    INSERT INTO issues(reporter_id,title,description,type) VALUES($1,$2,$3,$4) RETURNING *`, [user_id, title, description, type])
  console.log('step_3', result)
  return result
}
const getAllIssueFromDB = async () => {
  const result = await pool.query(`
    SELECT 
      i.id,
      i.title,
      i.description,
      i.type,
      i.status,
      json_build_object(
        'id', u.id,
        'name', u.name,
        'role', u.role
      ) AS reporter,
      i.created_at,
      i.update_at
    FROM issues i
    JOIN users u ON i.reporter_id = u.id
  `);
  return result;
};
const getSingleIssueFromDB = async (id: string) => {
  const result = await pool.query(`
    SELECT 
      i.id,
      i.title,
      i.description,
      i.type,
      i.status,
      json_build_object(
        'id', u.id,
        'name', u.name,
        'role', u.role
      ) AS reporter,
      i.created_at,
      i.update_at
    FROM issues i
    JOIN users u ON i.reporter_id = u.id
    WHERE i.id=$1
  `, [id]);
  return result;
};
const updateUserIntoDB = async () => {

}
const deleteUserIntoDB = async () => {

}
export const issueService = {
  issueCreateIntoDB,
  getAllIssueFromDB,
  getSingleIssueFromDB,
  updateUserIntoDB,
  deleteUserIntoDB
}