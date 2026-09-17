import { CustomerioPipelinesEntityBase } from '../CustomerioPipelinesEntityBase';
import type { CustomerioPipelinesSDK } from '../CustomerioPipelinesSDK';
import type { Control } from '../types';
import type { Track, TrackCreateData } from '../CustomerioPipelinesTypes';
declare class TrackEntity extends CustomerioPipelinesEntityBase<Track> {
    constructor(client: CustomerioPipelinesSDK, entopts: any);
    make(this: TrackEntity): TrackEntity;
    create(this: any, reqdata?: TrackCreateData, ctrl?: Control): Promise<TrackEntity>;
}
export { TrackEntity };
