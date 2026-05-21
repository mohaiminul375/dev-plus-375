import type { Request, Response } from "express";
import { issueService } from "./issue.service";

const createIssue = async (req: Request, res: Response) => {
    console.log('step_1')
    try {
        const result = await issueService.issueCreateIntoDB(req.body);
        console.log(result,'step_4');
        res.status(201).json({
            "success": true,
            "message": "Issue created successfully",
            data: result.rows[0]
        })
    } catch (error) {

    }
}

export const issueController = {
    createIssue
}