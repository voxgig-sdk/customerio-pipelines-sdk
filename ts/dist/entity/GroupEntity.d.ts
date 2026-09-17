import { CustomerioPipelinesEntityBase } from '../CustomerioPipelinesEntityBase';
import type { CustomerioPipelinesSDK } from '../CustomerioPipelinesSDK';
import type { Control } from '../types';
import type { Group, GroupCreateData } from '../CustomerioPipelinesTypes';
declare class GroupEntity extends CustomerioPipelinesEntityBase<Group> {
    constructor(client: CustomerioPipelinesSDK, entopts: any);
    make(this: GroupEntity): GroupEntity;
    create(this: any, reqdata?: GroupCreateData, ctrl?: Control): Promise<GroupEntity>;
}
export { GroupEntity };
