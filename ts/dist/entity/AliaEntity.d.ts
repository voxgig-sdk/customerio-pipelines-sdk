import { CustomerioPipelinesEntityBase } from '../CustomerioPipelinesEntityBase';
import type { CustomerioPipelinesSDK } from '../CustomerioPipelinesSDK';
import type { Control } from '../types';
import type { Alia, AliaCreateData } from '../CustomerioPipelinesTypes';
declare class AliaEntity extends CustomerioPipelinesEntityBase<Alia> {
    constructor(client: CustomerioPipelinesSDK, entopts: any);
    make(this: AliaEntity): AliaEntity;
    create(this: any, reqdata?: AliaCreateData, ctrl?: Control): Promise<AliaEntity>;
}
export { AliaEntity };
