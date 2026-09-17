# Pipelines API

# Overview In general, you&#39;ll consume this API through one of our source libraries, our JavaScript client library or any of our server packages. But you can also integrate directly with our REST API if you don&#39;t want to install one of our libraries or you want to support a source that we don&#39;t have a native integration with. # Server addresses: US and EU Customer.io hosts services in the United States (US) and European Union. Select the appropriate server address for your region. | Region | Server Address | | :-- | :-- | | US | https://cdp.customer.io | | EU | https://cdp-eu.customer.io | If you&#39;re in our EU region, you&#39;ll need to specify the EU URL when you initialize our server-side libraries. If you use our JavaScript client library, we&#39;ll set your region and route data/calls automatically. # Authentication &amp; rate limits Our API uses basic authorization with the API key from your **Customer.io API** integration. If you use Postman or another platform that helps you send API calls, this API key is the *Username*, and the *Password* is blank. # Get an API key You can get a Pipelines API key by [setting up the **Customer.io API** integration](/integrations/data-in/connections/http-api/) in your workspace. Now you can use the key as a username with a blank password to authenticate and send requests to our API. ## Rate and payload limits A request is limited to 32KB. A batch request is limited to 500KB total and 32KB per call in the request. If a request exceeds these limits, you will receive a 200 response, but the request will not go through. The Data Pipelines API has a rate limit of 3000 requests per 3 seconds for both active data integrations and historical backfill scripts. This limit applies to both our v1 and v2 APIs. While this rate is not strictly enforced, consistently exceeding it may lead to throttling or dropped data, especially during periods of high system load. If we detect a sustained high volume that could impact other customers, we may contact you to help adjust your integration or, in rare cases, temporarily block requests. &lt;div class=&quot;fly-panel fly-light regionUS&quot;&gt; &lt;div class=&quot;fly-panel-body us-server&quot;&gt; &lt;p class=&quot;text--bold&quot;&gt;Warning Rate limits are subject to change. We may adjust these thresholds to ensure stable performance for all customers. &lt;/div&gt;&lt;/div&gt; # Try out our postman collection We&#39;ve generated a Postman collection with all of the endpoints organized as you&#39;ll find them on this page, with a starter environment (mainly to contain your API key). For our API endpoints, **your API key is your username and your password is blank**. You&#39;ll notice that payloads on this page can contain significantly more information than the payloads that appear in our collection. We&#39;ve limited our collections to the fields that you&#39;ll _typically_ use when you send calls to our APIs and libraries, so it&#39;s easier to get started. But you can add additional fields to payloads, like `context`, `integrations`, and so on, if you want. If you fork this collection, you might want to disable the *Watch original collection* option. We automatically update our Postman collection whenever we release changes to our documentation, even if we don&#39;t change our APIs, which happens daily! Rather than being flooded with Postman notifications, you can check out our [Release Notes](/release-notes/) for updates to our APIs. [&lt;img src=&quot;https://run.pstmn.io/button.svg&quot; alt=&quot;Run In Postman&quot; style=&quot;width: 128px; height: 32px;&quot;&gt;](https://god.gw.postman.com/run-collection/23697545-287dd370-3d8b-4a71-80fe-75d6b7c7ff61?action=collection%2Ffork&amp;source=rip_markdown&amp;collection-url=entityId%3D23697545-287dd370-3d8b-4a71-80fe-75d6b7c7ff61%26entityType%3Dcollection%26workspaceId%3D35e4a70d-66bd-4b3e-8a0c-57f9e32080dc#?env%5BCustomer.io%20Data%20Pipelines%20API%20Environment%5D=W3sia2V5IjoiY2RwX2FwaV91cmwiLCJ0eXBlIjoiZGVmYXVsdCIsInZhbHVlIjoiY2RwLmN1c3RvbWVyLmlvIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJ3cml0ZV9rZXkiLCJ0eXBlIjoic2VjcmV0IiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfV0=) # Deletions, suppressions, and other semantic events You&#39;ll notice that this API only contains `POST` calls; we don&#39;t have `DELETE` operations. For delete operations, and other operations that don&#39;t have bespoke endpoints, we use *semantic events*. When you need to do things like deleting people, removing relationships, and other sorts of things, you&#39;ll send a request to the `/track` endpoint with a specific event `name` parameter. The `name` tells us what to do with the request. For example, you can send a `track` event with the name `Delete Person` to remove a person from your workspace. See [Semantic Events](/integrations/data-in/semantic-events/cio-journeys/) to see Customer.io-specific events. We also support semantic events for other kinds of destinations. See [Semantic Events for other destinations](#semantic-events-for-other-destinations) below for more information. | Event Name | Description | |------|--------| | `Device Created or Updated` | Adds or updates a mobile device (by token), and associates it with a person | | `Device Deleted` | Deletes a device | | `User Deleted` | Removes a person from your workspace | | `User Suppressed` | Removes a person from your workspace and suppresses their identifiers so you can&#39;t add them back to Customer.io. | | `User Unsuppressed` | Unsuppresses an identifier so you can add someone back to Customer.io and message them again. | | `Relationship Deleted` | Remove a relationship between a person and an object| | `Object Deleted` | Remove an object (like an account or company) from your Customer.io workspace| | `Report Delivery Event` | Report delivery events for messages| ## Semantic events for other destinations In addition to events that have special meanings [in Customer.io](#deletions-suppressions-and-other-semantic-events), we have a number of other events that we support across different kinds of destinations. These uniform events ensure that we&#39;ll map event data to destinations consistently, so you can move from one provider to another without having to change your event names or payload structures. For example, our ecommerce events work across any ecommerce platform we integrate with, even if those ecommerce platforms have different APIs or payload structures. See [Semantic Events](/integrations/data-in/semantic-events/getting-started/) to learn more. * [A/B Test](/integrations/api/cdp/ab-test/) * [Ecommerce](/integrations/api/cdp/ecommerce/) * [Email](/integrations/api/cdp/email/) * [Live Chat](/integrations/api/cdp/live-chat/) * [Mobile App](/integrations/api/cdp/mobile-app/) * [Video](/integrations/api/cdp/video/) ## Backfilling data By default, Customer.io records a `timestamp` when we receive requests. If you&#39;re sending data to Customer.io in real time, you don&#39;t need to worry about the timestamp. If you want to backfill requests, you can send a `timestamp`, an ISO 8601 date-time string, telling us when the request occurred. This provides a way to log `track` and `page` calls when the activities _actually_ took place.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 7 entities and 7 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Alia](docs/api/alia.html)

Results: A successful request returns an empty object response.

SDK operations: `create`.

Key fields to recognise:

- `previousId`: The anonymousId or userId value that you want to merge into the canonical profile.
- `userId`: The userId that you want to keep.

### [Batch](docs/api/batch.html)

Results: A successful request returns an empty object response.

SDK operations: `create`.

Key fields to recognise:

- `batch`: A group of requests you want to send to Data Pipelines in the call.
- `context`: The default context for every call in the batch.

### [Group](docs/api/group.html)

Results: A successful request returns an empty object response.

SDK operations: `create`.

### [Identify](docs/api/identify.html)

Results: A successful request returns an empty object response.

SDK operations: `create`.

### [Page](docs/api/page.html)

Results: A successful request returns an empty object response.

SDK operations: `create`.

### [Screen](docs/api/screen.html)

Results: A successful request returns an empty object response.

SDK operations: `create`.

### [Track](docs/api/track.html)

Results: A successful request returns an empty object response.

SDK operations: `create`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Alia](docs/api/alia.html) | `create` | `POST /alias` | Required |
| [Batch](docs/api/batch.html) | `create` | `POST /batch` | Required |
| [Group](docs/api/group.html) | `create` | `POST /group` | Required |
| [Identify](docs/api/identify.html) | `create` | `POST /identify` | Required |
| [Page](docs/api/page.html) | `create` | `POST /page` | Required |
| [Screen](docs/api/screen.html) | `create` | `POST /screen` | Required |
| [Track](docs/api/track.html) | `create` | `POST /track` | Required |

## Connect to the API

- The base URL for all Data Pipelines calls in our United States (US) region.: `https://cdp.customer.io/v1`
- The base URL for all Data Pipelines calls in our European Union (EU) region.: `https://cdp-eu.customer.io/v1`

The default credential is sent in the `Authorization` header with the `Basic` prefix.

The Data Pipelines API uses a basic authentication scheme with your API key. Because basic authorization typically expects a username and password combination, you&#39;ll use the API Key as the username and leave the password blank, base64 encoding your credentials in the format `API_key:`.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [JavaScript](docs/sdks/js.html) | `js/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `customerio-pipelines_list`: List records for an entity. No active entity supports this operation.
- `customerio-pipelines_load`: Load one record for an entity. No active entity supports this operation.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

