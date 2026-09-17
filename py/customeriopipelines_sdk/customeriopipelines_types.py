# Typed models for the CustomerioPipelines SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Alia(TypedDict):
    previousId: str
    userId: str


class AliaCreateData(TypedDict):
    previousId: str
    userId: str


class Batch(TypedDict, total=False):
    batch: list
    context: Any


class BatchCreateData(TypedDict, total=False):
    batch: list
    context: Any


class Group(TypedDict):
    pass


class GroupCreateData(TypedDict):
    pass


class Identify(TypedDict):
    pass


class IdentifyCreateData(TypedDict):
    pass


class Page(TypedDict):
    pass


class PageCreateData(TypedDict):
    pass


class Screen(TypedDict):
    pass


class ScreenCreateData(TypedDict):
    pass


class Track(TypedDict):
    pass


class TrackCreateData(TypedDict):
    pass
