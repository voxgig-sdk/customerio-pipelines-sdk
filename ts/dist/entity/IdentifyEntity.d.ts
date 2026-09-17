import { CustomerioPipelinesEntityBase } from '../CustomerioPipelinesEntityBase';
import type { CustomerioPipelinesSDK } from '../CustomerioPipelinesSDK';
import type { Control } from '../types';
import type { Identify, IdentifyCreateData } from '../CustomerioPipelinesTypes';
declare class IdentifyEntity extends CustomerioPipelinesEntityBase<Identify> {
    constructor(client: CustomerioPipelinesSDK, entopts: any);
    make(this: IdentifyEntity): IdentifyEntity;
    create(this: any, reqdata?: IdentifyCreateData, ctrl?: Control): Promise<IdentifyEntity>;
}
export { IdentifyEntity };
