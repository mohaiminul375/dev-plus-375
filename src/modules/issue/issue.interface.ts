// issues type
export interface IIssue {
    reporter_id?: number,
    title: string;
    description: string;
    type: "bug" | "feature_request";
    status?: "open" | "in_progress" | "resolved";
}
// validate issue without status
export type UPIssue = Omit<IIssue, "status">
// as constant user role
export const USER_ROLE = {
    contributor: 'contributor',
    maintainer: 'maintainer',
} as const
// url query parameter
export interface IQParams {
    sort?: string;
    type?: string;
    status?: string;
}