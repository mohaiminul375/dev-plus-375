export interface IIssue {
    reporter_id?: number,
    title: string;
    description: string;
    type: "bug" | "feature_request";
    status?: "open" | "in_progress" | "resolved";
}
export type UPIssue = Omit<IIssue, "status">
export const USER_ROLE = {
    contributor: 'contributor',
    maintainer: 'maintainer',
} as const

export interface IQParams {
    sort?: string;
    type?: string;
    status?: string;
}