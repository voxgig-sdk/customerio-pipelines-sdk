<?php
declare(strict_types=1);

// CustomerioPipelines SDK utility: result_headers

class CustomerioPipelinesResultHeaders
{
    public static function call(CustomerioPipelinesContext $ctx): ?CustomerioPipelinesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
