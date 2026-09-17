
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { CustomerioPipelinesSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('AliaEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CUSTOMERIO_PIPELINES_TEST_LIVE=TRUE.
  afterEach(liveDelay('CUSTOMERIO_PIPELINES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CustomerioPipelinesSDK.test()
    const ent = testsdk.Alia()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"previousId","req":true,"short":"The anonymousId or userId value that you want to merge into the canonical profile.","type":"`$STRING`","index$":0},{"active":true,"name":"userId","req":true,"short":"The userId that you want to keep.","type":"`$STRING`","index$":1}],"name":"alia","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"header":[{"active":true,"example":"1","kind":"header","name":"x_strict_mode","orig":"x_strict_mode","reqd":false,"type":"`$STRING`"}]},"contract":{"id":"POST /alias","json":"{\"operationId\":\"alias\",\"parameters\":[{\"description\":\"When set to `1`, enables strict validation that returns proper HTTP error codes (400/401) for validation failures. When not set or set to any other value, the API operates in permissive mode, logging errors but returning HTTP 200. [Learn more](/integrations/api/track-vs-cdp-api/#pipelines-strict-mode)\\n\",\"example\":\"1\",\"in\":\"header\",\"name\":\"X-Strict-Mode\",\"required\":false,\"schema\":{\"enum\":[\"1\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"previousId\":{\"description\":\"The anonymousId or userId value that you want to merge into the canonical profile.\",\"type\":\"string\"},\"userId\":{\"description\":\"The userId that you want to keep. This is required if you haven't already identified someone with one of our web or server-side libraries.\\n\",\"type\":\"string\"}},\"required\":[\"previousId\",\"userId\"],\"type\":\"object\"}}}},\"responses\":{\"200\":{\"description\":\"A successful request returns an empty object response.\"}},\"security\":[{\"Basic-Auth\":[]}],\"securitySchemes\":{\"Basic-Auth\":{\"description\":\"The Data Pipelines API uses a basic authentication scheme with your API key. Because basic authorization typically expects a username and password combination, you'll use the API Key as the username and leave the password blank—base64 encoding your credentials in the format `API_key:`.\\n\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/alias","segments":[{"lit":"alias"}],"select":{"exist":["x_strict_mode"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"alia","name__orig":"alia","Name":"Alia","name_":"alia","name-":"alia","NAME":"ALIA","index$":0}, {"active":true,"entity":"alia","key$":"BasicAliaFlow","kind":"basic","name":"BasicAliaFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"alia_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Alia')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const alia_ref01_ent = client.Alia()
    let alia_ref01_data = setup.data.new.alia['alia_ref01']

    alia_ref01_data = (await alia_ref01_ent.create(alia_ref01_data)).data()
    assert(null != alia_ref01_data)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/alia/AliaTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CustomerioPipelinesSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['alia01','alia02','alia03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CUSTOMERIO_PIPELINES_TEST_ALIA_ENTID': idmap,
    'CUSTOMERIO_PIPELINES_TEST_LIVE': 'FALSE',
    'CUSTOMERIO_PIPELINES_TEST_EXPLAIN': 'FALSE',
    'CUSTOMERIO_PIPELINES_APIKEY': '',
  })

  idmap = env['CUSTOMERIO_PIPELINES_TEST_ALIA_ENTID']

  const live = 'TRUE' === env.CUSTOMERIO_PIPELINES_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CUSTOMERIO_PIPELINES_TEST_ALIA_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CustomerioPipelinesSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.CUSTOMERIO_PIPELINES_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
