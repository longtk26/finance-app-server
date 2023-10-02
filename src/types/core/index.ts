export interface SuccessResponseTypes {
    message: string;
    statusCode?: number;
    reasonStatusCode?: string;
    metadata: any;
}

export interface OKResponseTypes extends SuccessResponseTypes {}

export interface CREATEDResponseTypes extends SuccessResponseTypes {
    options?: any;
}
