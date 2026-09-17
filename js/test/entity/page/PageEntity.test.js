
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


describe('PageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CUSTOMERIO_PIPELINES_TEST_LIVE=TRUE.
  afterEach(liveDelay('CUSTOMERIO_PIPELINES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CustomerioPipelinesSDK.test()
    const ent = testsdk.Page()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"page","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"header":[{"active":true,"example":"1","kind":"header","name":"x_strict_mode","orig":"x_strict_mode","reqd":false,"type":"`$STRING`"}]},"contract":{"id":"POST /page","json":"{\"operationId\":\"page\",\"parameters\":[{\"description\":\"When set to `1`, enables strict validation that returns proper HTTP error codes (400/401) for validation failures. When not set or set to any other value, the API operates in permissive mode, logging errors but returning HTTP 200. [Learn more](/integrations/api/track-vs-cdp-api/#pipelines-strict-mode)\\n\",\"example\":\"1\",\"in\":\"header\",\"name\":\"X-Strict-Mode\",\"required\":false,\"schema\":{\"enum\":[\"1\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"example\":{\"anonymousId\":\"507f191e810c19729de860ea\",\"channel\":\"browser\",\"context\":{\"ip\":\"8.8.8.8\",\"userAgent\":\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML like Gecko) Chrome/40.0.2214.115 Safari/537.36\"},\"integrations\":{\"All\":true,\"Mixpanel\":false,\"Salesforce\":false},\"messageId\":\"022bb90c-bbac-11e4-8dfc-aa07a5b093db\",\"name\":\"Home\",\"properties\":{\"title\":\"Welcome | ACME, Inc.\",\"url\":\"https://www.example.com\"},\"sentAt\":\"2015-02-23T22:28:55.111Z\",\"timestamp\":\"2015-02-23T22:28:55.111Z\",\"userId\":\"97980cfea0067\"},\"oneOf\":[{\"properties\":{\"context\":{\"description\":\"A dictionary of context about a source call/event, like the user’s IP address or locale. Context is automatically collected by our source libraries.\",\"properties\":{\"active\":{\"description\":\"Whether a user is active.\\n\\nThis is usually used when you send an .identify() call to update the traits independently of when you've “last seen” a user.\\n\",\"type\":\"boolean\"},\"campaign\":{\"additionalProperties\":{\"type\":\"string\"},\"description\":\"Contains information about the campaign that resulted in the API call, gathered from, or mapping to, UTM parameters (e.g. `utm_source`).\\n\",\"properties\":{\"content\":{\"type\":\"string\"},\"medium\":{\"description\":\"The type of traffic a person/event originates from, like `email`, or `referral`.\",\"type\":\"string\"},\"name\":{\"description\":\"The campaign name.\",\"type\":\"string\"},\"source\":{\"description\":\"The source of traffic—like the name of your email list, Facebook, Google, etc.\",\"type\":\"string\"},\"term\":{\"description\":\"The keyword term(s) a user came from.\",\"type\":\"string\"}},\"type\":\"object\"},\"channel\":{\"description\":\"The channel the event originated from.\",\"enum\":[\"browser\",\"server\",\"mobile\"],\"type\":\"string\"},\"ip\":{\"description\":\"The user's IP address. This isn't captured by our libraries, but by our servers when we receive client-side events (like from our JavaScript source).\",\"type\":\"string\"},\"locale\":{\"description\":\"The locale string for the current user, e.g. `en-US`.\",\"type\":\"string\"},\"page\":{\"description\":\"Contains information about the current page in the browser. This is automatically collected by our JavaScript source.\",\"properties\":{\"keywords\":{\"description\":\"A list/array of keywords describing the page's content. The keywords are likely the same as, or similar to, the keywords you would find in an HTML `meta` tag for SEO purposes. This property is mainly used by content publishers that rely heavily on pageview tracking. This isn't automatically collected.\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"name\":{\"description\":\"The name of the page. Reserved for future use.\\n\",\"type\":\"string\"},\"path\":{\"description\":\"The path portion of the page's URL. Equivalent to the canonical `path` which defaults to `location.pathname` from the DOM API.\",\"type\":\"string\"},\"referrer\":{\"description\":\"The previous page's full URL. Equivalent to `document.referrer` from the DOM API.\",\"type\":\"string\"},\"search\":{\"description\":\"The query string portion of the page's URL. Equivalent to `location.search` from the DOM API.\",\"type\":\"string\"},\"title\":{\"description\":\"The page's title. Equivalent to `document.title` from the DOM API.\",\"type\":\"string\"},\"url\":{\"description\":\"A page's full URL. We first look for the canonical URL. If the canonical URL is not provided, we'll use `location.href` from the DOM API.\",\"type\":\"string\"}},\"type\":\"object\"},\"userAgent\":{\"description\":\"The user agent of the device making the request\",\"type\":\"string\"}},\"title\":\"Non-mobile\"},\"integrations\":{\"additionalProperties\":{\"type\":\"boolean\"},\"description\":\"Contains a list of booleans indicating the integrations that are enabled (true) or disabled (false). By default, all integrations are enabled (returning an empty object). Set `\\\"All\\\": false` to reverse this behavior.\\n\",\"example\":{\"All\":true,\"Salesforce\":false},\"type\":\"object\"},\"messageId\":{\"description\":\"A unique identifier for a Data Pipelines call, ensuring that each individual event is unique. This is set by Customer.io\",\"type\":\"string\"},\"name\":{\"description\":\"The name of the page.\",\"example\":\"home\",\"type\":\"string\"},\"originalTimestamp\":{\"description\":\"In general, you can use `timestamp` rather than this field if you want to back-date events. This is the timestamp on the client device you invoke a call or the timestamp value you manually passed in a server-side library call.\",\"format\":\"date-time\",\"type\":\"string\"},\"properties\":{\"additionalProperties\":{},\"description\":\"Additional `page` properties. Analytics.js automatically collects `url`, `title`, `referrer`, `path`, and `search` properties. But, if you use our other sources or you write your own integration, you should consider sending these properties yourself. Destination actions that take `page` events often rely on the `url` and `title` properties.\",\"properties\":{\"category\":{\"description\":\"The category of the page. This might be useful if you have a single page routes or have a flattened URL structure.\",\"type\":\"string\"},\"path\":{\"description\":\"The path of the page. This defaults to `location.pathname`, but can be overridden.\",\"example\":\"/page\",\"type\":\"string\"},\"referrer\":{\"description\":\"The referrer of the page, if applicable. This defaults to `document.referrer`, but can be overridden.\",\"example\":\"http://www.google.com/search?q=example\",\"type\":\"string\"},\"search\":{\"description\":\"The search query in the URL, if present. This defaults to `location.search`, but can be overridden.\",\"example\":\"?q=sfgiants\",\"type\":\"string\"},\"title\":{\"description\":\"The title of the page. This defaults to `document.title`, but can be overridden.\",\"example\":\"Page | Example.com\",\"type\":\"string\"},\"url\":{\"description\":\"The URL of the page. This defaults to a canonical url if available, and falls back to `document.location.href`.\",\"example\":\"https://www.example.com/page/\",\"type\":\"string\"}},\"type\":\"object\"},\"receivedAt\":{\"description\":\"The ISO-8601 timestamp when Data Pipelines receives an event.\",\"format\":\"date-time\",\"readOnly\":true,\"type\":\"string\"},\"sentAt\":{\"description\":\"The ISO-8601 timestamp when a library sends an event to Data Pipelines.\",\"format\":\"date-time\",\"type\":\"string\"},\"timestamp\":{\"description\":\"The ISO-8601 timestamp when the event originally took place. This is mostly useful when you backfill past events. If you're not backfilling data, you can leave this field empty and we'll use the current time or server time.\",\"format\":\"date-time\",\"type\":\"string\"},\"userId\":{\"description\":\"The unique identifier for a person. This value should be unique across systems, so you recognize the same person in your sources _and_ destinations.\",\"example\":\"241ma8mf4a\",\"type\":\"string\"},\"version\":{\"description\":\"The version of the API that received the event, automatically set by Customer.io.\",\"readOnly\":true,\"type\":\"number\"}},\"required\":[\"userId\"],\"title\":\"Known User\"},{\"properties\":{\"anonymousId\":{\"description\":\"A unique substitute for a User ID in cases when you don’t have an absolutely unique identifier. Our libraries generate this value automatically to help you track people before they sign up, log in, provide their email, etc.\",\"example\":\"c0e5cae6-6f04-46e4-97a8-25076e8bdc0b\",\"type\":\"string\"},\"context\":{\"description\":\"A dictionary of context about a source call/event, like the user’s IP address or locale. Context is automatically collected by our source libraries.\",\"properties\":{\"active\":{\"description\":\"Whether a user is active.\\n\\nThis is usually used when you send an .identify() call to update the traits independently of when you've “last seen” a user.\\n\",\"type\":\"boolean\"},\"campaign\":{\"additionalProperties\":{\"type\":\"string\"},\"description\":\"Contains information about the campaign that resulted in the API call, gathered from, or mapping to, UTM parameters (e.g. `utm_source`).\\n\",\"properties\":{\"content\":{\"type\":\"string\"},\"medium\":{\"description\":\"The type of traffic a person/event originates from, like `email`, or `referral`.\",\"type\":\"string\"},\"name\":{\"description\":\"The campaign name.\",\"type\":\"string\"},\"source\":{\"description\":\"The source of traffic—like the name of your email list, Facebook, Google, etc.\",\"type\":\"string\"},\"term\":{\"description\":\"The keyword term(s) a user came from.\",\"type\":\"string\"}},\"type\":\"object\"},\"channel\":{\"description\":\"The channel the event originated from.\",\"enum\":[\"browser\",\"server\",\"mobile\"],\"type\":\"string\"},\"ip\":{\"description\":\"The user's IP address. This isn't captured by our libraries, but by our servers when we receive client-side events (like from our JavaScript source).\",\"type\":\"string\"},\"locale\":{\"description\":\"The locale string for the current user, e.g. `en-US`.\",\"type\":\"string\"},\"page\":{\"description\":\"Contains information about the current page in the browser. This is automatically collected by our JavaScript source.\",\"properties\":{\"keywords\":{\"description\":\"A list/array of keywords describing the page's content. The keywords are likely the same as, or similar to, the keywords you would find in an HTML `meta` tag for SEO purposes. This property is mainly used by content publishers that rely heavily on pageview tracking. This isn't automatically collected.\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"name\":{\"description\":\"The name of the page. Reserved for future use.\\n\",\"type\":\"string\"},\"path\":{\"description\":\"The path portion of the page's URL. Equivalent to the canonical `path` which defaults to `location.pathname` from the DOM API.\",\"type\":\"string\"},\"referrer\":{\"description\":\"The previous page's full URL. Equivalent to `document.referrer` from the DOM API.\",\"type\":\"string\"},\"search\":{\"description\":\"The query string portion of the page's URL. Equivalent to `location.search` from the DOM API.\",\"type\":\"string\"},\"title\":{\"description\":\"The page's title. Equivalent to `document.title` from the DOM API.\",\"type\":\"string\"},\"url\":{\"description\":\"A page's full URL. We first look for the canonical URL. If the canonical URL is not provided, we'll use `location.href` from the DOM API.\",\"type\":\"string\"}},\"type\":\"object\"},\"userAgent\":{\"description\":\"The user agent of the device making the request\",\"type\":\"string\"}},\"title\":\"Non-mobile\"},\"integrations\":{\"additionalProperties\":{\"type\":\"boolean\"},\"description\":\"Contains a list of booleans indicating the integrations that are enabled (true) or disabled (false). By default, all integrations are enabled (returning an empty object). Set `\\\"All\\\": false` to reverse this behavior.\\n\",\"example\":{\"All\":true,\"Salesforce\":false},\"type\":\"object\"},\"messageId\":{\"description\":\"A unique identifier for a Data Pipelines call, ensuring that each individual event is unique. This is set by Customer.io\",\"type\":\"string\"},\"name\":{\"description\":\"The name of the page.\",\"example\":\"home\",\"type\":\"string\"},\"originalTimestamp\":{\"description\":\"In general, you can use `timestamp` rather than this field if you want to back-date events. This is the timestamp on the client device you invoke a call or the timestamp value you manually passed in a server-side library call.\",\"format\":\"date-time\",\"type\":\"string\"},\"properties\":{\"additionalProperties\":{},\"description\":\"Additional properties for your event.\",\"properties\":{\"category\":{\"description\":\"The category of the page. This might be useful if you have a single page routes or have a flattened URL structure.\",\"type\":\"string\"},\"path\":{\"description\":\"The path of the page. This defaults to location.pathname, but can be overridden.\",\"example\":\"/page\",\"type\":\"string\"},\"referrer\":{\"description\":\"The referrer of the page, if applicable. This defaults to document.referrer, but can be overridden.\",\"example\":\"http://www.google.com/search?q=example\",\"type\":\"string\"},\"search\":{\"description\":\"The search query in the URL, if present. This defaults to location.search, but can be overridden.\",\"example\":\"?q=sfgiants\",\"type\":\"string\"},\"title\":{\"description\":\"The title of the page. This defaults to `document.title`, but can be overridden.\",\"example\":\"Page | Example.com\",\"type\":\"string\"},\"url\":{\"description\":\"The URL of the page.\",\"type\":\"string\"}},\"type\":\"object\"},\"receivedAt\":{\"description\":\"The ISO-8601 timestamp when Data Pipelines receives an event.\",\"format\":\"date-time\",\"readOnly\":true,\"type\":\"string\"},\"sentAt\":{\"description\":\"The ISO-8601 timestamp when a library sends an event to Data Pipelines.\",\"format\":\"date-time\",\"type\":\"string\"},\"timestamp\":{\"description\":\"The ISO-8601 timestamp when the event originally took place. This is mostly useful when you backfill past events. If you're not backfilling data, you can leave this field empty and we'll use the current time or server time.\",\"format\":\"date-time\",\"type\":\"string\"},\"version\":{\"description\":\"The version of the API that received the event, automatically set by Customer.io.\",\"readOnly\":true,\"type\":\"number\"}},\"required\":[\"anonymousId\"],\"title\":\"Anonymous User\"}]}}}},\"responses\":{\"200\":{\"description\":\"A successful request returns an empty object response.\"}},\"security\":[{\"Basic-Auth\":[]}],\"securitySchemes\":{\"Basic-Auth\":{\"description\":\"The Data Pipelines API uses a basic authentication scheme with your API key. Because basic authorization typically expects a username and password combination, you'll use the API Key as the username and leave the password blank—base64 encoding your credentials in the format `API_key:`.\\n\",\"scheme\":\"basic\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/page","segments":[{"lit":"page"}],"select":{"exist":["x_strict_mode"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"page","name__orig":"page","Name":"Page","name_":"page","name-":"page","NAME":"PAGE","index$":4}, {"active":true,"entity":"page","key$":"BasicPageFlow","kind":"basic","name":"BasicPageFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"page_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Page')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const page_ref01_ent = client.Page()
    let page_ref01_data = setup.data.new.page['page_ref01']

    page_ref01_data = (await page_ref01_ent.create(page_ref01_data)).data()
    assert(null != page_ref01_data)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/page/PageTestData.json')

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
    ['page01','page02','page03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CUSTOMERIO_PIPELINES_TEST_PAGE_ENTID': idmap,
    'CUSTOMERIO_PIPELINES_TEST_LIVE': 'FALSE',
    'CUSTOMERIO_PIPELINES_TEST_EXPLAIN': 'FALSE',
    'CUSTOMERIO_PIPELINES_APIKEY': '',
  })

  idmap = env['CUSTOMERIO_PIPELINES_TEST_PAGE_ENTID']

  const live = 'TRUE' === env.CUSTOMERIO_PIPELINES_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CUSTOMERIO_PIPELINES_TEST_PAGE_ENTID']
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
  
