import { CustomerioPipelinesEntityBase } from '../CustomerioPipelinesEntityBase';
import type { CustomerioPipelinesSDK } from '../CustomerioPipelinesSDK';
import type { Control } from '../types';
import type { Page, PageCreateData } from '../CustomerioPipelinesTypes';
declare class PageEntity extends CustomerioPipelinesEntityBase<Page> {
    constructor(client: CustomerioPipelinesSDK, entopts: any);
    make(this: PageEntity): PageEntity;
    create(this: any, reqdata?: PageCreateData, ctrl?: Control): Promise<PageEntity>;
}
export { PageEntity };
