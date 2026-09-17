<?php
declare(strict_types=1);

// CustomerioPipelines SDK base feature

class CustomerioPipelinesBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(CustomerioPipelinesContext $ctx, array $options): void {}
    public function PostConstruct(CustomerioPipelinesContext $ctx): void {}
    public function PostConstructEntity(CustomerioPipelinesContext $ctx): void {}
    public function SetData(CustomerioPipelinesContext $ctx): void {}
    public function GetData(CustomerioPipelinesContext $ctx): void {}
    public function GetMatch(CustomerioPipelinesContext $ctx): void {}
    public function SetMatch(CustomerioPipelinesContext $ctx): void {}
    public function PrePoint(CustomerioPipelinesContext $ctx): void {}
    public function PreSpec(CustomerioPipelinesContext $ctx): void {}
    public function PreRequest(CustomerioPipelinesContext $ctx): void {}
    public function PreResponse(CustomerioPipelinesContext $ctx): void {}
    public function PreResult(CustomerioPipelinesContext $ctx): void {}
    public function PreDone(CustomerioPipelinesContext $ctx): void {}
    public function PreUnexpected(CustomerioPipelinesContext $ctx): void {}
}
