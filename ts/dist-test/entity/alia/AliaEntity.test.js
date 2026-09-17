"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('AliaEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CUSTOMERIO_PIPELINES_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CUSTOMERIO_PIPELINES_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CustomerioPipelinesSDK.test();
        const ent = testsdk.Alia();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CUSTOMERIO_PIPELINES_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'alia.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "previousId", "req": true, "short": "The anonymousId or userId value that you want to merge into the canonical profile.", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "userId", "req": true, "short": "The userId that you want to keep.", "type": "`$STRING`", "index$": 1 }], "name": "alia", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": { "header": [{ "active": true, "example": "1", "kind": "header", "name": "x_strict_mode", "orig": "x_strict_mode", "reqd": false, "type": "`$STRING`" }] }, "contract": { "id": "POST /alias", "json": "{\"operationId\":\"alias\",\"parameters\":[{\"description\":\"When set to `1`, enables strict validation that returns proper HTTP error codes (400/401) for validation failures. When not set or set to any other value, the API operates in permissive mode, logging errors but returning HTTP 200. [Learn more](/integrations/api/track-vs-cdp-api/#pipelines-strict-mode)\\n\",\"example\":\"1\",\"in\":\"header\",\"name\":\"X-Strict-Mode\",\"required\":false,\"schema\":{\"enum\":[\"1\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"previousId\":{\"description\":\"The anonymousId or userId value that you want to merge into the canonical profile.\",\"type\":\"string\"},\"userId\":{\"description\":\"The userId that you want to keep. This is required if you haven't already identified someone with one of our web or server-side libraries.\\n\",\"type\":\"string\"}},\"required\":[\"previousId\",\"userId\"],\"type\":\"object\"}}}},\"responses\":{\"200\":{\"description\":\"A successful request returns an empty object response.\"}},\"security\":[{\"Basic-Auth\":[]}],\"securitySchemes\":{\"Basic-Auth\":{\"description\":\"The Data Pipelines API uses a basic authentication scheme with your API key. Because basic authorization typically expects a username and password combination, you'll use the API Key as the username and leave the password blank—base64 encoding your credentials in the format `API_key:`.\\n\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/alias", "segments": [{ "lit": "alias" }], "select": { "exist": ["x_strict_mode"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "alia", "name__orig": "alia", "Name": "Alia", "name_": "alia", "name-": "alia", "NAME": "ALIA", "index$": 0 }, { "active": true, "entity": "alia", "key$": "BasicAliaFlow", "kind": "basic", "name": "BasicAliaFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "alia_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'Alia');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const alia_ref01_ent = client.Alia();
        let alia_ref01_data = setup.data.new.alia['alia_ref01'];
        alia_ref01_data = (await alia_ref01_ent.create(alia_ref01_data)).data();
        (0, node_assert_1.default)(null != alia_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/alia/AliaTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CustomerioPipelinesSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['alia01', 'alia02', 'alia03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CUSTOMERIO_PIPELINES_TEST_ALIA_ENTID': idmap,
        'CUSTOMERIO_PIPELINES_TEST_LIVE': 'FALSE',
        'CUSTOMERIO_PIPELINES_TEST_EXPLAIN': 'FALSE',
        'CUSTOMERIO_PIPELINES_APIKEY': '',
        'CUSTOMERIO_PIPELINES_SECRET': '',
    });
    idmap = env['CUSTOMERIO_PIPELINES_TEST_ALIA_ENTID'];
    const live = 'TRUE' === env.CUSTOMERIO_PIPELINES_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CUSTOMERIO_PIPELINES_TEST_ALIA_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.CustomerioPipelinesSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.CUSTOMERIO_PIPELINES_APIKEY,
                secret: env.CUSTOMERIO_PIPELINES_SECRET,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.CUSTOMERIO_PIPELINES_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=AliaEntity.test.js.map