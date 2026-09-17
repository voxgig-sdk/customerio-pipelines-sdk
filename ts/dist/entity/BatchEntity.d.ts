import { CustomerioPipelinesEntityBase } from '../CustomerioPipelinesEntityBase';
import type { CustomerioPipelinesSDK } from '../CustomerioPipelinesSDK';
import type { Control } from '../types';
import type { Batch, BatchCreateData } from '../CustomerioPipelinesTypes';
declare class BatchEntity extends CustomerioPipelinesEntityBase<Batch> {
    constructor(client: CustomerioPipelinesSDK, entopts: any);
    make(this: BatchEntity): BatchEntity;
    create(this: any, reqdata?: BatchCreateData, ctrl?: Control): Promise<BatchEntity>;
}
export { BatchEntity };
