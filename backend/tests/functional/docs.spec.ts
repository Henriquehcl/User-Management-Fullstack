import { test } from '@japa/runner'

test.group('Docs', () => {
  test('serves swagger ui html', async ({ client }) => {
    const res = await client.get('/docs')
    res.assertStatus(200)
  })

  test('serves openapi json', async ({ client }) => {
    const res = await client.get('/docs/openapi.json')
    res.assertStatus(200)
    res.assertBodyContains({ openapi: '3.0.3' })
  })
})

