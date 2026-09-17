<?php
declare(strict_types=1);

// CustomerioPipelines SDK utility: result_body

class CustomerioPipelinesResultBody
{
    public static function call(CustomerioPipelinesContext $ctx): ?CustomerioPipelinesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
