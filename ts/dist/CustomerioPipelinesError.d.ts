import { Context } from './Context';
declare class CustomerioPipelinesError extends Error {
    isCustomerioPipelinesError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { CustomerioPipelinesError };
