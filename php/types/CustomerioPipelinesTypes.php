<?php
declare(strict_types=1);

// Typed models for the CustomerioPipelines SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Alia entity data model. */
class Alia
{
    public string $previousId;
    public string $userId;
}

/** Request payload for Alia#create. */
class AliaCreateData
{
    public string $previousId;
    public string $userId;
}

/** Batch entity data model. */
class Batch
{
    public ?array $batch = null;
    public mixed $context = null;
}

/** Request payload for Batch#create. */
class BatchCreateData
{
    public ?array $batch = null;
    public mixed $context = null;
}

/** Group entity data model. */
class Group
{
}

/** Request payload for Group#create. */
class GroupCreateData
{
}

/** Identify entity data model. */
class Identify
{
}

/** Request payload for Identify#create. */
class IdentifyCreateData
{
}

/** Page entity data model. */
class Page
{
}

/** Request payload for Page#create. */
class PageCreateData
{
}

/** Screen entity data model. */
class Screen
{
}

/** Request payload for Screen#create. */
class ScreenCreateData
{
}

/** Track entity data model. */
class Track
{
}

/** Request payload for Track#create. */
class TrackCreateData
{
}

