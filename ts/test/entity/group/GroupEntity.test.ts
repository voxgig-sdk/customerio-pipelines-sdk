

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CustomerioPipelinesSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('GroupEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CUSTOMERIO_PIPELINES_TEST_LIVE=TRUE.
  afterEach(liveDelay('CUSTOMERIO_PIPELINES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CustomerioPipelinesSDK.test()
    const ent = testsdk.Group()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CUSTOMERIO_PIPELINES_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'group.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"group","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"header":[{"active":true,"example":"1","kind":"header","name":"x_strict_mode","orig":"x_strict_mode","reqd":false,"type":"`$STRING`"}]},"contract":{"id":"POST /group","json":"{\"operationId\":\"group\",\"parameters\":[{\"description\":\"When set to `1`, enables strict validation that returns proper HTTP error codes (400/401) for validation failures. When not set or set to any other value, the API operates in permissive mode, logging errors but returning HTTP 200. [Learn more](/integrations/api/track-vs-cdp-api/#pipelines-strict-mode)\\n\",\"example\":\"1\",\"in\":\"header\",\"name\":\"X-Strict-Mode\",\"required\":false,\"schema\":{\"enum\":[\"1\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"example\":{\"anonymousId\":\"507f191e810c19729de860ea,\",\"channel\":\"browser,\",\"context\":{\"ip\":\"8.8.8.8\",\"userAgent\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36\"},\"groupId\":\"0e8c78ea9d97a7b8185e8632,\",\"integrations\":{\"All\":true,\"Mixpanel\":false,\"Salesforce\":false},\"messageId\":\"022bb90c-bbac-11e4-8dfc-aa07a5b093db,\",\"sentAt\":\"2015-02-23T22:28:55.111Z,\",\"timestamp\":\"2015-02-23T22:28:55.111Z,\",\"traits\":{\"employees\":329,\"industry\":\"Technology\",\"name\":\"ACME, Inc.\",\"plan\":\"enterprise\",\"total billed\":830},\"userId\":\"97980cfea0067\"},\"oneOf\":[{\"properties\":{\"context\":{\"description\":\"A dictionary of context about a source call/event, like the user’s IP address or locale. Context is automatically collected by our source libraries.\",\"oneOf\":[{\"description\":\"A dictionary of context about a source call/event, like the user’s IP address or locale. Context is automatically collected by our source libraries.\",\"properties\":{\"active\":{\"description\":\"Whether a user is active.\\n\\nThis is usually used when you send an .identify() call to update the traits independently of when you've “last seen” a user.\\n\",\"type\":\"boolean\"},\"campaign\":{\"additionalProperties\":{\"type\":\"string\"},\"description\":\"Contains information about the campaign that resulted in the API call, gathered from, or mapping to, UTM parameters (e.g. `utm_source`).\\n\",\"properties\":{\"content\":{\"type\":\"string\"},\"medium\":{\"description\":\"The type of traffic a person/event originates from, like `email`, or `referral`.\",\"type\":\"string\"},\"name\":{\"description\":\"The campaign name.\",\"type\":\"string\"},\"source\":{\"description\":\"The source of traffic—like the name of your email list, Facebook, Google, etc.\",\"type\":\"string\"},\"term\":{\"description\":\"The keyword term(s) a user came from.\",\"type\":\"string\"}},\"type\":\"object\"},\"channel\":{\"description\":\"The channel the event originated from.\",\"enum\":[\"browser\",\"server\",\"mobile\"],\"type\":\"string\"},\"ip\":{\"description\":\"The user's IP address. This isn't captured by our libraries, but by our servers when we receive client-side events (like from our JavaScript source).\",\"type\":\"string\"},\"locale\":{\"description\":\"The locale string for the current user, e.g. `en-US`.\",\"type\":\"string\"},\"page\":{\"description\":\"Contains information about the current page in the browser. This is automatically collected by our JavaScript source.\",\"properties\":{\"keywords\":{\"description\":\"A list/array of keywords describing the page's content. The keywords are likely the same as, or similar to, the keywords you would find in an HTML `meta` tag for SEO purposes. This property is mainly used by content publishers that rely heavily on pageview tracking. This isn't automatically collected.\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"name\":{\"description\":\"The name of the page. Reserved for future use.\\n\",\"type\":\"string\"},\"path\":{\"description\":\"The path portion of the page's URL. Equivalent to the canonical `path` which defaults to `location.pathname` from the DOM API.\",\"type\":\"string\"},\"referrer\":{\"description\":\"The previous page's full URL. Equivalent to `document.referrer` from the DOM API.\",\"type\":\"string\"},\"search\":{\"description\":\"The query string portion of the page's URL. Equivalent to `location.search` from the DOM API.\",\"type\":\"string\"},\"title\":{\"description\":\"The page's title. Equivalent to `document.title` from the DOM API.\",\"type\":\"string\"},\"url\":{\"description\":\"A page's full URL. We first look for the canonical URL. If the canonical URL is not provided, we'll use `location.href` from the DOM API.\",\"type\":\"string\"}},\"type\":\"object\"},\"userAgent\":{\"description\":\"The user agent of the device making the request\",\"type\":\"string\"}},\"title\":\"Non-mobile\"},{\"description\":\"A dictionary of context about a source call/event, like the user’s IP address or locale. Context is automatically collected by our source libraries.\",\"properties\":{\"active\":{\"description\":\"Whether a user is active.\\n\\nThis is usually used when you send an .identify() call to update the traits independently of when you've “last seen” a user.\\n\",\"type\":\"boolean\"},\"app\":{\"description\":\"Contains information about the mobile app the event originated from, automatically collected by our mobile libraries when possible.\\n\",\"properties\":{\"build\":{\"description\":\"The specific build number in the app.\",\"type\":\"string\"},\"name\":{\"description\":\"The name of the app.\",\"type\":\"string\"},\"namespace\":{\"description\":\"The app's namespace.\",\"type\":\"string\"},\"version\":{\"description\":\"The version of the app the call originated from.\",\"type\":\"string\"}},\"type\":\"object\"},\"channel\":{\"description\":\"The channel the event originated from.\",\"enum\":[\"browser\",\"server\",\"mobile\"],\"type\":\"string\"},\"device\":{\"description\":\"Contains information about the device the event originated from.\\n\",\"properties\":{\"advertisingId\":{\"description\":\"The advertising ID is a unique, anonymous ID for advertising.\",\"type\":\"string\"},\"id\":{\"description\":\"The device ID.\",\"type\":\"string\"},\"manufacturer\":{\"description\":\"The device manufacturer.\",\"type\":\"string\"},\"model\":{\"description\":\"The device model.\",\"type\":\"string\"},\"name\":{\"description\":\"The device name.\",\"type\":\"string\"},\"type\":{\"description\":\"The device type—android, iOS, etc.\",\"enum\":[\"android\",\"ios\"],\"type\":\"string\"},\"version\":{\"description\":\"The firmware version for the device.\",\"type\":\"string\"}},\"type\":\"object\"},\"ip\":{\"description\":\"The user's IP address. This isn't captured by our libraries, but by our servers when we receive client-side events (like from our JavaScript source).\",\"type\":\"string\"},\"locale\":{\"description\":\"The locale string for the current user, e.g. `en-US`.\",\"type\":\"string\"},\"network\":{\"description\":\"Information about the current network connection, containing `bluetooth`, `carrier`, `cellular`, and `wifi`. If the `context.network.cellular` and `context.network.wifi` fields are empty, then the user is offline.\",\"properties\":{\"bluetooth\":{\"description\":\"Lets you know if bluetooth is enabled on a device.\",\"type\":\"boolean\"},\"carrier\":{\"description\":\"The cellular carrier the phone uses.\",\"type\":\"string\"},\"cellular\":{\"description\":\"Indicates whether the device's cellular connection is enabled or not.\",\"type\":\"boolean\"},\"wifi\":{\"description\":\"Indicates whether a device's wifi connection is enabled or not.\",\"type\":\"boolean\"}},\"type\":\"object\"},\"os\":{\"description\":\"Dictionary of information about the operating system, containing `name` and `version`.\\n\",\"properties\":{\"name\":{\"description\":\"The operating system running on the device.\",\"type\":\"string\"},\"version\":{\"description\":\"The version of the OS running on the device.\",\"type\":\"string\"}},\"type\":\"object\"},\"userAgent\":{\"description\":\"The user agent of the device making the request\",\"type\":\"string\"}},\"title\":\"Mobile\"}]},\"groupId\":{\"description\":\"ID of the group\",\"example\":\"0e8c78ea9d97a7b8185e8632\",\"type\":\"string\"},\"integrations\":{\"additionalProperties\":{\"type\":\"boolean\"},\"description\":\"Contains a list of booleans indicating the integrations that are enabled (true) or disabled (false). By default, all integrations are enabled (returning an empty object). Set `\\\"All\\\": false` to reverse this behavior.\\n\",\"example\":{\"All\":true,\"Salesforce\":false},\"type\":\"object\"},\"messageId\":{\"description\":\"A unique identifier for a Data Pipelines call, ensuring that each individual event is unique. This is set by Customer.io\",\"type\":\"string\"},\"originalTimestamp\":{\"description\":\"In general, you can use `timestamp` rather than this field if you want to back-date events. This is the timestamp on the client device you invoke a call or the timestamp value you manually passed in a server-side library call.\",\"format\":\"date-time\",\"type\":\"string\"},\"receivedAt\":{\"description\":\"The ISO-8601 timestamp when Data Pipelines receives an event.\",\"format\":\"date-time\",\"readOnly\":true,\"type\":\"string\"},\"sentAt\":{\"description\":\"The ISO-8601 timestamp when a library sends an event to Data Pipelines.\",\"format\":\"date-time\",\"type\":\"string\"},\"timestamp\":{\"description\":\"The ISO-8601 timestamp when the event originally took place. This is mostly useful when you backfill past events. If you're not backfilling data, you can leave this field empty and we'll use the current time or server time.\",\"format\":\"date-time\",\"type\":\"string\"},\"traits\":{\"additionalProperties\":{\"example\":{\"industry\":\"Technology\",\"name\":\"Acme\",\"plan\":\"enterprise,\",\"road_runner_accidents\":\"329,\",\"total_billed\":830}},\"description\":\"Additional information about the group.\",\"properties\":{\"objectTypeId\":{\"description\":\"If you use Customer.io Journeys as a destination, this value is the type of group/object your group belongs to; object type IDs are stringified integers. If you don't include this value, we assume the object type ID is `1`. See [objects in Customer.io Journeys](/journeys/objects-data/objects/types/) for more information.\",\"example\":\"1\",\"type\":\"string\"},\"relationshipAttributes\":{\"description\":\"Attributes that you want to set for the relationship between the person and the group.\",\"example\":{\"role\":\"primary_contact\"},\"type\":\"object\"}},\"type\":\"object\"},\"userId\":{\"description\":\"The unique identifier for a person. This value should be unique across systems, so you recognize the same person in your sources _and_ destinations.\",\"example\":\"241ma8mf4a\",\"type\":\"string\"},\"version\":{\"description\":\"The version of the API that received the event, automatically set by Customer.io.\",\"readOnly\":true,\"type\":\"number\"}},\"required\":[\"groupId\"],\"title\":\"Known User\"},{\"properties\":{\"anonymousId\":{\"description\":\"A unique substitute for a User ID in cases when you don’t have an absolutely unique identifier. Our libraries generate this value automatically to help you track people before they sign up, log in, provide their email, etc.\",\"example\":\"c0e5cae6-6f04-46e4-97a8-25076e8bdc0b\",\"type\":\"string\"},\"context\":{\"description\":\"A dictionary of context about a source call/event, like the user’s IP address or locale. Context is automatically collected by our source libraries.\",\"oneOf\":[{\"description\":\"A dictionary of context about a source call/event, like the user’s IP address or locale. Context is automatically collected by our source libraries.\",\"properties\":{\"active\":{\"description\":\"Whether a user is active.\\n\\nThis is usually used when you send an .identify() call to update the traits independently of when you've “last seen” a user.\\n\",\"type\":\"boolean\"},\"campaign\":{\"additionalProperties\":{\"type\":\"string\"},\"description\":\"Contains information about the campaign that resulted in the API call, gathered from, or mapping to, UTM parameters (e.g. `utm_source`).\\n\",\"properties\":{\"content\":{\"type\":\"string\"},\"medium\":{\"description\":\"The type of traffic a person/event originates from, like `email`, or `referral`.\",\"type\":\"string\"},\"name\":{\"description\":\"The campaign name.\",\"type\":\"string\"},\"source\":{\"description\":\"The source of traffic—like the name of your email list, Facebook, Google, etc.\",\"type\":\"string\"},\"term\":{\"description\":\"The keyword term(s) a user came from.\",\"type\":\"string\"}},\"type\":\"object\"},\"channel\":{\"description\":\"The channel the event originated from.\",\"enum\":[\"browser\",\"server\",\"mobile\"],\"type\":\"string\"},\"ip\":{\"description\":\"The user's IP address. This isn't captured by our libraries, but by our servers when we receive client-side events (like from our JavaScript source).\",\"type\":\"string\"},\"locale\":{\"description\":\"The locale string for the current user, e.g. `en-US`.\",\"type\":\"string\"},\"page\":{\"description\":\"Contains information about the current page in the browser. This is automatically collected by our JavaScript source.\",\"properties\":{\"keywords\":{\"description\":\"A list/array of keywords describing the page's content. The keywords are likely the same as, or similar to, the keywords you would find in an HTML `meta` tag for SEO purposes. This property is mainly used by content publishers that rely heavily on pageview tracking. This isn't automatically collected.\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"name\":{\"description\":\"The name of the page. Reserved for future use.\\n\",\"type\":\"string\"},\"path\":{\"description\":\"The path portion of the page's URL. Equivalent to the canonical `path` which defaults to `location.pathname` from the DOM API.\",\"type\":\"string\"},\"referrer\":{\"description\":\"The previous page's full URL. Equivalent to `document.referrer` from the DOM API.\",\"type\":\"string\"},\"search\":{\"description\":\"The query string portion of the page's URL. Equivalent to `location.search` from the DOM API.\",\"type\":\"string\"},\"title\":{\"description\":\"The page's title. Equivalent to `document.title` from the DOM API.\",\"type\":\"string\"},\"url\":{\"description\":\"A page's full URL. We first look for the canonical URL. If the canonical URL is not provided, we'll use `location.href` from the DOM API.\",\"type\":\"string\"}},\"type\":\"object\"},\"userAgent\":{\"description\":\"The user agent of the device making the request\",\"type\":\"string\"}},\"title\":\"Non-mobile\"},{\"description\":\"A dictionary of context about a source call/event, like the user’s IP address or locale. Context is automatically collected by our source libraries.\",\"properties\":{\"active\":{\"description\":\"Whether a user is active.\\n\\nThis is usually used when you send an .identify() call to update the traits independently of when you've “last seen” a user.\\n\",\"type\":\"boolean\"},\"app\":{\"description\":\"Contains information about the mobile app the event originated from, automatically collected by our mobile libraries when possible.\\n\",\"properties\":{\"build\":{\"description\":\"The specific build number in the app.\",\"type\":\"string\"},\"name\":{\"description\":\"The name of the app.\",\"type\":\"string\"},\"namespace\":{\"description\":\"The app's namespace.\",\"type\":\"string\"},\"version\":{\"description\":\"The version of the app the call originated from.\",\"type\":\"string\"}},\"type\":\"object\"},\"channel\":{\"description\":\"The channel the event originated from.\",\"enum\":[\"browser\",\"server\",\"mobile\"],\"type\":\"string\"},\"device\":{\"description\":\"Contains information about the device the event originated from.\\n\",\"properties\":{\"advertisingId\":{\"description\":\"The advertising ID is a unique, anonymous ID for advertising.\",\"type\":\"string\"},\"id\":{\"description\":\"The device ID.\",\"type\":\"string\"},\"manufacturer\":{\"description\":\"The device manufacturer.\",\"type\":\"string\"},\"model\":{\"description\":\"The device model.\",\"type\":\"string\"},\"name\":{\"description\":\"The device name.\",\"type\":\"string\"},\"type\":{\"description\":\"The device type—android, iOS, etc.\",\"enum\":[\"android\",\"ios\"],\"type\":\"string\"},\"version\":{\"description\":\"The firmware version for the device.\",\"type\":\"string\"}},\"type\":\"object\"},\"ip\":{\"description\":\"The user's IP address. This isn't captured by our libraries, but by our servers when we receive client-side events (like from our JavaScript source).\",\"type\":\"string\"},\"locale\":{\"description\":\"The locale string for the current user, e.g. `en-US`.\",\"type\":\"string\"},\"network\":{\"description\":\"Information about the current network connection, containing `bluetooth`, `carrier`, `cellular`, and `wifi`. If the `context.network.cellular` and `context.network.wifi` fields are empty, then the user is offline.\",\"properties\":{\"bluetooth\":{\"description\":\"Lets you know if bluetooth is enabled on a device.\",\"type\":\"boolean\"},\"carrier\":{\"description\":\"The cellular carrier the phone uses.\",\"type\":\"string\"},\"cellular\":{\"description\":\"Indicates whether the device's cellular connection is enabled or not.\",\"type\":\"boolean\"},\"wifi\":{\"description\":\"Indicates whether a device's wifi connection is enabled or not.\",\"type\":\"boolean\"}},\"type\":\"object\"},\"os\":{\"description\":\"Dictionary of information about the operating system, containing `name` and `version`.\\n\",\"properties\":{\"name\":{\"description\":\"The operating system running on the device.\",\"type\":\"string\"},\"version\":{\"description\":\"The version of the OS running on the device.\",\"type\":\"string\"}},\"type\":\"object\"},\"userAgent\":{\"description\":\"The user agent of the device making the request\",\"type\":\"string\"}},\"title\":\"Mobile\"}]},\"groupId\":{\"description\":\"ID of the group\",\"example\":\"0e8c78ea9d97a7b8185e8632\",\"type\":\"string\"},\"integrations\":{\"additionalProperties\":{\"type\":\"boolean\"},\"description\":\"Contains a list of booleans indicating the integrations that are enabled (true) or disabled (false). By default, all integrations are enabled (returning an empty object). Set `\\\"All\\\": false` to reverse this behavior.\\n\",\"example\":{\"All\":true,\"Salesforce\":false},\"type\":\"object\"},\"messageId\":{\"description\":\"A unique identifier for a Data Pipelines call, ensuring that each individual event is unique. This is set by Customer.io\",\"type\":\"string\"},\"originalTimestamp\":{\"description\":\"In general, you can use `timestamp` rather than this field if you want to back-date events. This is the timestamp on the client device you invoke a call or the timestamp value you manually passed in a server-side library call.\",\"format\":\"date-time\",\"type\":\"string\"},\"receivedAt\":{\"description\":\"The ISO-8601 timestamp when Data Pipelines receives an event.\",\"format\":\"date-time\",\"readOnly\":true,\"type\":\"string\"},\"sentAt\":{\"description\":\"The ISO-8601 timestamp when a library sends an event to Data Pipelines.\",\"format\":\"date-time\",\"type\":\"string\"},\"timestamp\":{\"description\":\"The ISO-8601 timestamp when the event originally took place. This is mostly useful when you backfill past events. If you're not backfilling data, you can leave this field empty and we'll use the current time or server time.\",\"format\":\"date-time\",\"type\":\"string\"},\"traits\":{\"additionalProperties\":{\"description\":\"Attributes that you want to associate with the group.\",\"example\":{\"industry\":\"Technology\",\"name\":\"Acme\",\"plan\":\"enterprise,\",\"road_runner_accidents\":\"329,\",\"total_billed\":830}},\"description\":\"Additional information about the group.\",\"properties\":{\"objectTypeId\":{\"description\":\"If you use Customer.io Journeys as a destination, this value is the type of group/object your group belongs to; object type IDs are stringified integers. If you don't include this value, we assume the object type ID is `1`. See [objects in Customer.io Journeys](/journeys/objects-data/objects/types/) for more information.\",\"example\":\"1\",\"type\":\"string\"},\"relationshipAttributes\":{\"description\":\"Attributes that you want to set for the relationship between the person and the group.\",\"example\":{\"role\":\"primary_contact\"},\"type\":\"object\"}},\"type\":\"object\"},\"version\":{\"description\":\"The version of the API that received the event, automatically set by Customer.io.\",\"readOnly\":true,\"type\":\"number\"}},\"required\":[\"groupId\"],\"title\":\"Anonymous User\"}]}}}},\"responses\":{\"200\":{\"description\":\"A successful request returns an empty object response.\"}},\"security\":[{\"Basic-Auth\":[]}],\"securitySchemes\":{\"Basic-Auth\":{\"description\":\"The Data Pipelines API uses a basic authentication scheme with your API key. Because basic authorization typically expects a username and password combination, you'll use the API Key as the username and leave the password blank—base64 encoding your credentials in the format `API_key:`.\\n\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/group","segments":[{"lit":"group"}],"select":{"exist":["x_strict_mode"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"group","name__orig":"group","Name":"Group","name_":"group","name-":"group","NAME":"GROUP","index$":2}, {"active":true,"entity":"group","key$":"BasicGroupFlow","kind":"basic","name":"BasicGroupFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"group_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Group')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const group_ref01_ent = client.Group()
    let group_ref01_data = setup.data.new.group['group_ref01']

    group_ref01_data = (await group_ref01_ent.create(group_ref01_data)).data()
    assert(null != group_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/group/GroupTestData.json')

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
    ['group01','group02','group03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CUSTOMERIO_PIPELINES_TEST_GROUP_ENTID': idmap,
    'CUSTOMERIO_PIPELINES_TEST_LIVE': 'FALSE',
    'CUSTOMERIO_PIPELINES_TEST_EXPLAIN': 'FALSE',
    'CUSTOMERIO_PIPELINES_APIKEY': '',
    'CUSTOMERIO_PIPELINES_SECRET': '',
  })

  idmap = env['CUSTOMERIO_PIPELINES_TEST_GROUP_ENTID']

  const live = 'TRUE' === env.CUSTOMERIO_PIPELINES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CUSTOMERIO_PIPELINES_TEST_GROUP_ENTID']
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
        secret: env.CUSTOMERIO_PIPELINES_SECRET,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
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
  
