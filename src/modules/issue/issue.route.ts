import { Router } from "express";
import { issueController } from "./issue.controller";
import { authorized } from "../../middleware/auth";
import { USER_ROLE } from "./issue.interface";

const router = Router();
router.post('/', authorized(USER_ROLE.contributor, USER_ROLE.maintainer), issueController.createIssue);
router.get('/', issueController.getAllIssue); // pending filter
router.get('/:id', issueController.getSingleIssue); // pending filter
router.put('/:id', issueController.updateUser);
router.delete('/:id', authorized(USER_ROLE.maintainer), issueController.deleteUser);
export const issueRouter = router;