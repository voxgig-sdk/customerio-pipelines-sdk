<?php
declare(strict_types=1);

// CustomerioPipelines SDK exists test

require_once __DIR__ . '/../customeriopipelines_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = CustomerioPipelinesSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
