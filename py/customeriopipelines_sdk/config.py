# CustomerioPipelines SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "CustomerioPipelines",
            "slug": "customerio-pipelines",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://cdp.customer.io/v1",
            "auth": {
                "prefix": "Basic",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "alia": {},
                "batch": {},
                "group": {},
                "identify": {},
                "page": {},
                "screen": {},
                "track": {},
            },
        },
        "entity": {
      "alia": {
        "fields": [
          {
            "name": "previousId",
            "req": True,
            "short": "The anonymousId or userId value that you want to merge into the canonical profile.",
            "type": "`$STRING`",
          },
          {
            "name": "userId",
            "req": True,
            "short": "The userId that you want to keep.",
            "type": "`$STRING`",
          },
        ],
        "name": "alia",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "example": "1",
                      "kind": "header",
                      "name": "x_strict_mode",
                      "orig": "x_strict_mode",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/alias",
                "segments": [
                  {
                    "lit": "alias",
                  },
                ],
                "select": {
                  "exist": [
                    "x_strict_mode",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "alias",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "batch": {
        "fields": [
          {
            "name": "batch",
            "short": "A group of requests you want to send to Data Pipelines in the call.",
            "type": "`$ARRAY`",
            "union": {
              "branches": 6,
              "count": 13,
              "depth": 7,
            },
          },
          {
            "name": "context",
            "short": "The default context for every call in the batch.",
            "type": "`$ANY`",
            "union": {
              "branches": 2,
              "count": 1,
              "depth": 0,
            },
          },
        ],
        "name": "batch",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "example": "1",
                      "kind": "header",
                      "name": "x_strict_mode",
                      "orig": "x_strict_mode",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/batch",
                "segments": [
                  {
                    "lit": "batch",
                  },
                ],
                "select": {
                  "exist": [
                    "x_strict_mode",
                  ],
                },
                "transform": {
                  "req": {
                    "batch": "`reqdata`",
                  },
                  "res": "`body`",
                },
                "parts": [
                  "batch",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "group": {
        "fields": [],
        "name": "group",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "example": "1",
                      "kind": "header",
                      "name": "x_strict_mode",
                      "orig": "x_strict_mode",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/group",
                "segments": [
                  {
                    "lit": "group",
                  },
                ],
                "select": {
                  "exist": [
                    "x_strict_mode",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "group",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "identify": {
        "fields": [],
        "name": "identify",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "example": "1",
                      "kind": "header",
                      "name": "x_strict_mode",
                      "orig": "x_strict_mode",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/identify",
                "segments": [
                  {
                    "lit": "identify",
                  },
                ],
                "select": {
                  "exist": [
                    "x_strict_mode",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "identify",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "page": {
        "fields": [],
        "name": "page",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "example": "1",
                      "kind": "header",
                      "name": "x_strict_mode",
                      "orig": "x_strict_mode",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/page",
                "segments": [
                  {
                    "lit": "page",
                  },
                ],
                "select": {
                  "exist": [
                    "x_strict_mode",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "page",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "screen": {
        "fields": [],
        "name": "screen",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "example": "1",
                      "kind": "header",
                      "name": "x_strict_mode",
                      "orig": "x_strict_mode",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/screen",
                "segments": [
                  {
                    "lit": "screen",
                  },
                ],
                "select": {
                  "exist": [
                    "x_strict_mode",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "screen",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "track": {
        "fields": [],
        "name": "track",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "example": "1",
                      "kind": "header",
                      "name": "x_strict_mode",
                      "orig": "x_strict_mode",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/track",
                "segments": [
                  {
                    "lit": "track",
                  },
                ],
                "select": {
                  "exist": [
                    "x_strict_mode",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "track",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
