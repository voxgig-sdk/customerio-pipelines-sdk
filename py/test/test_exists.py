# CustomerioPipelines SDK exists test

import pytest
from customeriopipelines_sdk import CustomerioPipelinesSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = CustomerioPipelinesSDK.test(None, None)
        assert testsdk is not None
