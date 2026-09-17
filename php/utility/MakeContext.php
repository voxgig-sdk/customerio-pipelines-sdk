<?php
declare(strict_types=1);

// CustomerioPipelines SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class CustomerioPipelinesMakeContext
{
    public static function call(array $ctxmap, ?CustomerioPipelinesContext $basectx): CustomerioPipelinesContext
    {
        return new CustomerioPipelinesContext($ctxmap, $basectx);
    }
}
