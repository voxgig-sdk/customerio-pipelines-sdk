import { AliaEntity } from './entity/AliaEntity';
import { BatchEntity } from './entity/BatchEntity';
import { GroupEntity } from './entity/GroupEntity';
import { IdentifyEntity } from './entity/IdentifyEntity';
import { PageEntity } from './entity/PageEntity';
import { ScreenEntity } from './entity/ScreenEntity';
import { TrackEntity } from './entity/TrackEntity';
export type * from './CustomerioPipelinesTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { CustomerioPipelinesEntityBase } from './CustomerioPipelinesEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class CustomerioPipelinesSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Alia(entopts?: Record<string, any>): AliaEntity;
    Batch(entopts?: Record<string, any>): BatchEntity;
    Group(entopts?: Record<string, any>): GroupEntity;
    Identify(entopts?: Record<string, any>): IdentifyEntity;
    Page(entopts?: Record<string, any>): PageEntity;
    Screen(entopts?: Record<string, any>): ScreenEntity;
    Track(entopts?: Record<string, any>): TrackEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): CustomerioPipelinesSDK;
    tester(testopts?: any, sdkopts?: any): CustomerioPipelinesSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof CustomerioPipelinesSDK;
export { stdutil, config, BaseFeature, CustomerioPipelinesEntityBase, CustomerioPipelinesSDK, SDK, };
