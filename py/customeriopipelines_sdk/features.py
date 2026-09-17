# CustomerioPipelines SDK feature factory

from customeriopipelines_sdk.feature.base_feature import CustomerioPipelinesBaseFeature
from customeriopipelines_sdk.feature.debug_feature import CustomerioPipelinesDebugFeature
from customeriopipelines_sdk.feature.idempotency_feature import CustomerioPipelinesIdempotencyFeature
from customeriopipelines_sdk.feature.metrics_feature import CustomerioPipelinesMetricsFeature
from customeriopipelines_sdk.feature.paging_feature import CustomerioPipelinesPagingFeature
from customeriopipelines_sdk.feature.ratelimit_feature import CustomerioPipelinesRatelimitFeature
from customeriopipelines_sdk.feature.retry_feature import CustomerioPipelinesRetryFeature
from customeriopipelines_sdk.feature.test_feature import CustomerioPipelinesTestFeature
from customeriopipelines_sdk.feature.timeout_feature import CustomerioPipelinesTimeoutFeature


_FEATURES = {
    "base": lambda: CustomerioPipelinesBaseFeature(),
    "debug": lambda: CustomerioPipelinesDebugFeature(),
    "idempotency": lambda: CustomerioPipelinesIdempotencyFeature(),
    "metrics": lambda: CustomerioPipelinesMetricsFeature(),
    "paging": lambda: CustomerioPipelinesPagingFeature(),
    "ratelimit": lambda: CustomerioPipelinesRatelimitFeature(),
    "retry": lambda: CustomerioPipelinesRetryFeature(),
    "test": lambda: CustomerioPipelinesTestFeature(),
    "timeout": lambda: CustomerioPipelinesTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
