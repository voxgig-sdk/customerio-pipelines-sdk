
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { CustomerioPipelinesSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await CustomerioPipelinesSDK.test()
    equal(null !== testsdk, true)
  })

})
