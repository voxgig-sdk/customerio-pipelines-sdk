# API definition provenance

## customerio-pipelines-openapi.json

- **Source:** https://docs.customer.io/files/pipelines.json
- **Publisher:** Customer.io (the definition its own API reference is rendered from)
- **Retrieved:** 2026-09-17
- **Format:** OpenAPI 3.1.0
- **Size:** 1540966 bytes
- **Coverage:** 7 paths — the whole Customer.io Pipelines API (CDP) as published.

Unmodified vendor file. Do not hand-edit it: refresh it from the source URL
above and re-record the retrieval date.

## Why this is its own SDK

Customer.io publishes **three** separate APIs on three hosts, with three
different authentication schemes: the Track API (`track.customer.io`, HTTP
Basic with site id and api key), the App API (`api.customer.io`, bearer
token) and the Pipelines / CDP API (`cdp.customer.io`, bearer token). They are
separate API surfaces, so each is its own SDK rather than one client claiming
"the Customer.io API".
