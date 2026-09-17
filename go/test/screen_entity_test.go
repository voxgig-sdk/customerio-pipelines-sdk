package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/customerio-pipelines-sdk/go"
	"github.com/voxgig-sdk/customerio-pipelines-sdk/go/core"

	vs "github.com/voxgig-sdk/customerio-pipelines-sdk/go/utility/struct"
)

func TestScreenEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Screen(nil)
		if ent == nil {
			t.Fatal("expected non-nil ScreenEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := screenBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "screen." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set CUSTOMERIO_PIPELINES_TEST_SCREEN_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		screenRef01Ent := client.Screen(nil)
		screenRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "screen"}), "screen_ref01"))

		screenRef01DataResult, err := screenRef01Ent.Create(screenRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		screenRef01Data = core.ToMapAny(entityData(screenRef01DataResult))
		if screenRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func screenBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "screen", "ScreenTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read screen test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse screen test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"screen01", "screen02", "screen03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("CUSTOMERIO_PIPELINES_TEST_SCREEN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CUSTOMERIO_PIPELINES_TEST_SCREEN_ENTID": idmap,
		"CUSTOMERIO_PIPELINES_TEST_LIVE":      "FALSE",
		"CUSTOMERIO_PIPELINES_TEST_EXPLAIN":   "FALSE",
		"CUSTOMERIO_PIPELINES_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["CUSTOMERIO_PIPELINES_TEST_SCREEN_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["CUSTOMERIO_PIPELINES_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["CUSTOMERIO_PIPELINES_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewCustomerioPipelinesSDK(core.ToMapAny(mergedOpts))
	}

	live := env["CUSTOMERIO_PIPELINES_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["CUSTOMERIO_PIPELINES_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
