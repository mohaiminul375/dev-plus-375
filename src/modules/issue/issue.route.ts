import { Router } from "express";
import { issueController } from "./issue.controller";
import { authorized } from "../../middleware/auth";
import { USER_ROLE } from "./issue.interface";
import { issueAccMiddleware } from "../../middleware/issueAccessMiddleware";
const router = Router();
// 
router.get('/', issueController.getAllIssue); // pending filter
router.get('/:id', issueController.getSingleIssue); // pending filter
router.post('/', authorized(USER_ROLE.contributor, USER_ROLE.maintainer), issueController.createIssue);

router.put('/:id', authorized(USER_ROLE.contributor, USER_ROLE.maintainer), issueAccMiddleware(), issueController.updateIssue);

router.delete('/:id', authorized(USER_ROLE.maintainer), issueController.deleteIssue);
export const issueRouter = router;