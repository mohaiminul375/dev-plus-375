import { pool } from "../../db";
import type { IIssue, IQParams, UPIssue } from "./issue.interface"

const issueCreateIntoDB = async (payload: IIssue, user_id: string) => {
  const { title, description, type, status } = payload;
  const result = await pool.query(`
    INSERT INTO issues(reporter_id,title,description,type,status) VALUES($1,$2,$3,$4,COALESCE($5,status)) RETURNING *`, [user_id, title, description, type, status])
  return result
}
// 
const getAllIssueFromDB = async (urlParams: IQParams) => {
  const { sort, status, type } = urlParams;
  console.log(urlParams)
  let query = "SELECT * FROM issues";
  let values: string[] = [];
  if (type && status) {
    values.push(type)
    query += ` WHERE type=$${values.length}`
    values.push(status)
    query += ` OR status=$${values.length}`
  } else if (type) {
    values.push(type)
    query += ` WHERE type=$${values.length}`
  }
  else if (status) {
    values.push(status)
    query += ` WHERE status=$${values.length}`
  }

  // sort by oldest and default newest first
  if (sort === 'oldest') {
    query += " ORDER BY id ASC"
  } else {
    query += " ORDER BY id DESC"
  }
  console.log(query, values)
  // get issues collection
  const issues = (await pool.query(query, values)).rows;
  const reporterId = issues.map(i => i.reporter_id);
  // get the user
  const users = (await pool.query(`SELECT id, name, role FROM users WHERE id= ANY($1)`, [reporterId])).rows
  // return issues with reporter info 
  const result = issues.map(issue => {
    const reporter = users.find(u => u.id === issue.reporter_id);
    // remove reporter_id
    const { reporter_id, ...issueCollection } = issue;
    // create new collection
    return {
      ...issueCollection,
      reporter: reporter || null
    }
  })
  return result
};
const getSingleIssueFromDB = async (id: string) => {
  // single one collection
  const issues = (await pool.query(`
    SELECT * FROM issues WHERE id=$1
      `, [id])).rows[0];
  if (!issues) {
    return undefined;
  }
  // for a single user
  const user = (await pool.query(`
    SELECT id,name,role FROM users WHERE id=$1
    `, [issues.reporter_id])).rows[0]
  const result = {
    ...issues, reporter: user
  }
  if (!user) {
    return undefined;
  }
  return result
};
const updateUserIntoDB = async (id: string, payload: UPIssue) => {
  const { title, description, type } = payload;
  const result = await pool.query(`UPDATE issues 
    SET
    title=COALESCE($1,title),
    description=COALESCE($2,description),
    type=COALESCE($3,type)
    WHERE id=$4 RETURNING *`, [title, description, type, id])
  return result;
}
const deleteUserIntoDB = async (id: string) => {
  const result = await pool.query(`DELETE FROM issues WHERE id=$1`, [id])
  return result;
}
export const issueService = {
  issueCreateIntoDB,
  getAllIssueFromDB,
  getSingleIssueFromDB,
  updateUserIntoDB,
  deleteUserIntoDB
}


