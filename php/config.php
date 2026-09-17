<?php
declare(strict_types=1);

// CustomerioPipelines SDK configuration

class CustomerioPipelinesConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "CustomerioPipelines",
                "slug" => "customerio-pipelines",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "debug" => [
          'options' => [
            'active' => false,
            'max' => 100,
            'redact' => [
              'authorization',
              'cookie',
              'set-cookie',
              'api-key',
              'apikey',
              'x-api-key',
              'idempotency-key',
            ],
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'onEntry' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'none',
        ],
                "idempotency" => [
          'options' => [
            'active' => false,
            'header' => 'Idempotency-Key',
            'methods' => [
              'POST',
              'PUT',
              'PATCH',
              'DELETE',
            ],
            'ops' => [
              'create',
              'update',
              'remove',
            ],
          ],
          'optspec' => [
            'keygen' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'none',
        ],
                "metrics" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'none',
        ],
                "paging" => [
          'options' => [
            'active' => false,
            'afterVar' => 'after',
            'cursorParam' => 'cursor',
            'firstVar' => 'first',
            'limitParam' => 'limit',
            'pageParam' => 'page',
            'startPage' => 1,
          ],
          'optspec' => [
            'limit' => '`$NUMBER`',
            'ops' => '`$LIST`',
          ],
          'strict' => false,
          'transport' => 'none',
        ],
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://cdp.customer.io/v1",
                "auth" => [
                    "prefix" => "Basic",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "alia" => [],
                    "batch" => [],
                    "group" => [],
                    "identify" => [],
                    "page" => [],
                    "screen" => [],
                    "track" => [],
                ],
            ],
            "entity" => [
        'alia' => [
          'fields' => [
            [
              'name' => 'previousId',
              'req' => true,
              'short' => 'The anonymousId or userId value that you want to merge into the canonical profile.',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'userId',
              'req' => true,
              'short' => 'The userId that you want to keep.',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'alia',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'header' => [
                      [
                        'example' => '1',
                        'kind' => 'header',
                        'name' => 'x_strict_mode',
                        'orig' => 'x_strict_mode',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/alias',
                  'segments' => [
                    [
                      'lit' => 'alias',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'x_strict_mode',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'alias',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'batch' => [
          'fields' => [
            [
              'name' => 'batch',
              'short' => 'A group of requests you want to send to Data Pipelines in the call.',
              'type' => '`$ARRAY`',
              'union' => [
                'branches' => 6,
                'count' => 13,
                'depth' => 7,
              ],
            ],
            [
              'name' => 'context',
              'short' => 'The default context for every call in the batch.',
              'type' => '`$ANY`',
              'union' => [
                'branches' => 2,
                'count' => 1,
                'depth' => 0,
              ],
            ],
          ],
          'name' => 'batch',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'header' => [
                      [
                        'example' => '1',
                        'kind' => 'header',
                        'name' => 'x_strict_mode',
                        'orig' => 'x_strict_mode',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/batch',
                  'segments' => [
                    [
                      'lit' => 'batch',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'x_strict_mode',
                    ],
                  ],
                  'transform' => [
                    'req' => [
                      'batch' => '`reqdata`',
                    ],
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'batch',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'group' => [
          'fields' => [],
          'name' => 'group',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'header' => [
                      [
                        'example' => '1',
                        'kind' => 'header',
                        'name' => 'x_strict_mode',
                        'orig' => 'x_strict_mode',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/group',
                  'segments' => [
                    [
                      'lit' => 'group',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'x_strict_mode',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'group',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'identify' => [
          'fields' => [],
          'name' => 'identify',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'header' => [
                      [
                        'example' => '1',
                        'kind' => 'header',
                        'name' => 'x_strict_mode',
                        'orig' => 'x_strict_mode',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/identify',
                  'segments' => [
                    [
                      'lit' => 'identify',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'x_strict_mode',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'identify',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'page' => [
          'fields' => [],
          'name' => 'page',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'header' => [
                      [
                        'example' => '1',
                        'kind' => 'header',
                        'name' => 'x_strict_mode',
                        'orig' => 'x_strict_mode',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/page',
                  'segments' => [
                    [
                      'lit' => 'page',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'x_strict_mode',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'page',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'screen' => [
          'fields' => [],
          'name' => 'screen',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'header' => [
                      [
                        'example' => '1',
                        'kind' => 'header',
                        'name' => 'x_strict_mode',
                        'orig' => 'x_strict_mode',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/screen',
                  'segments' => [
                    [
                      'lit' => 'screen',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'x_strict_mode',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'screen',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'track' => [
          'fields' => [],
          'name' => 'track',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [
                    'header' => [
                      [
                        'example' => '1',
                        'kind' => 'header',
                        'name' => 'x_strict_mode',
                        'orig' => 'x_strict_mode',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/track',
                  'segments' => [
                    [
                      'lit' => 'track',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'x_strict_mode',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'track',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return CustomerioPipelinesFeatures::make_feature($name);
    }
}
