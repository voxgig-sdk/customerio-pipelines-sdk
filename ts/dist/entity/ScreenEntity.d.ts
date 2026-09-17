import { CustomerioPipelinesEntityBase } from '../CustomerioPipelinesEntityBase';
import type { CustomerioPipelinesSDK } from '../CustomerioPipelinesSDK';
import type { Control } from '../types';
import type { Screen, ScreenCreateData } from '../CustomerioPipelinesTypes';
declare class ScreenEntity extends CustomerioPipelinesEntityBase<Screen> {
    constructor(client: CustomerioPipelinesSDK, entopts: any);
    make(this: ScreenEntity): ScreenEntity;
    create(this: any, reqdata?: ScreenCreateData, ctrl?: Control): Promise<ScreenEntity>;
}
export { ScreenEntity };
