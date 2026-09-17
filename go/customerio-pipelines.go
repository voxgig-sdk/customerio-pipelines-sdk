package voxgigcustomeriopipelinessdk

import (
	"github.com/voxgig-sdk/customerio-pipelines-sdk/go/core"
	"github.com/voxgig-sdk/customerio-pipelines-sdk/go/entity"
	"github.com/voxgig-sdk/customerio-pipelines-sdk/go/feature"
	_ "github.com/voxgig-sdk/customerio-pipelines-sdk/go/utility"
)

// Type aliases preserve external API.
type CustomerioPipelinesSDK = core.CustomerioPipelinesSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type CustomerioPipelinesEntity = core.CustomerioPipelinesEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type CustomerioPipelinesError = core.CustomerioPipelinesError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewDebugFeatureFunc = func() core.Feature {
		return feature.NewDebugFeature()
	}
	core.NewIdempotencyFeatureFunc = func() core.Feature {
		return feature.NewIdempotencyFeature()
	}
	core.NewMetricsFeatureFunc = func() core.Feature {
		return feature.NewMetricsFeature()
	}
	core.NewPagingFeatureFunc = func() core.Feature {
		return feature.NewPagingFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewAliaEntityFunc = func(client *core.CustomerioPipelinesSDK, entopts map[string]any) core.CustomerioPipelinesEntity {
		return entity.NewAliaEntity(client, entopts)
	}
	core.NewBatchEntityFunc = func(client *core.CustomerioPipelinesSDK, entopts map[string]any) core.CustomerioPipelinesEntity {
		return entity.NewBatchEntity(client, entopts)
	}
	core.NewGroupEntityFunc = func(client *core.CustomerioPipelinesSDK, entopts map[string]any) core.CustomerioPipelinesEntity {
		return entity.NewGroupEntity(client, entopts)
	}
	core.NewIdentifyEntityFunc = func(client *core.CustomerioPipelinesSDK, entopts map[string]any) core.CustomerioPipelinesEntity {
		return entity.NewIdentifyEntity(client, entopts)
	}
	core.NewPageEntityFunc = func(client *core.CustomerioPipelinesSDK, entopts map[string]any) core.CustomerioPipelinesEntity {
		return entity.NewPageEntity(client, entopts)
	}
	core.NewScreenEntityFunc = func(client *core.CustomerioPipelinesSDK, entopts map[string]any) core.CustomerioPipelinesEntity {
		return entity.NewScreenEntity(client, entopts)
	}
	core.NewTrackEntityFunc = func(client *core.CustomerioPipelinesSDK, entopts map[string]any) core.CustomerioPipelinesEntity {
		return entity.NewTrackEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewCustomerioPipelinesSDK = core.NewCustomerioPipelinesSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewCustomerioPipelinesSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *CustomerioPipelinesSDK  { return NewCustomerioPipelinesSDK(nil) }
func Test() *CustomerioPipelinesSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewDebugFeature = feature.NewDebugFeature
var NewIdempotencyFeature = feature.NewIdempotencyFeature
var NewMetricsFeature = feature.NewMetricsFeature
var NewPagingFeature = feature.NewPagingFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
