# CustomerioPipelines SDK utility: make_context

from customeriopipelines_sdk.core.context import CustomerioPipelinesContext


def make_context_util(ctxmap, basectx):
    return CustomerioPipelinesContext(ctxmap, basectx)
