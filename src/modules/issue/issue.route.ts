import { Router } from "express";
import { issueController } from "./issue.controller";
import { authorized } from "../../middleware/auth";

const router = Router();
router.post('/', authorized("maintainer"), issueController.createIssue);
router.get('/', issueController.getAllIssue); // pending filter
router.get('/:id', issueController.getSingleIssue); // pending filter
router.put('/:id', issueController.updateUser);
router.delete('/:id', issueController.deleteUser);
export const issueRouter = router;