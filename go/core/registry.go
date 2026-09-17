package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAliaEntityFunc func(client *CustomerioPipelinesSDK, entopts map[string]any) CustomerioPipelinesEntity

var NewBatchEntityFunc func(client *CustomerioPipelinesSDK, entopts map[string]any) CustomerioPipelinesEntity

var NewGroupEntityFunc func(client *CustomerioPipelinesSDK, entopts map[string]any) CustomerioPipelinesEntity

var NewIdentifyEntityFunc func(client *CustomerioPipelinesSDK, entopts map[string]any) CustomerioPipelinesEntity

var NewPageEntityFunc func(client *CustomerioPipelinesSDK, entopts map[string]any) CustomerioPipelinesEntity

var NewScreenEntityFunc func(client *CustomerioPipelinesSDK, entopts map[string]any) CustomerioPipelinesEntity

var NewTrackEntityFunc func(client *CustomerioPipelinesSDK, entopts map[string]any) CustomerioPipelinesEntity

