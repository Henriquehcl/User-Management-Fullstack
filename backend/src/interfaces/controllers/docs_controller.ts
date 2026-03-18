import type { HttpContext } from '@adonisjs/core/http'
import { openapi } from '#src/infrastructure/http/openapi'

export class DocsController {
  async openapi({ response }: HttpContext) {
    return response.ok(openapi)
  }

  async ui({ response }: HttpContext) {
    const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.ui = SwaggerUIBundle({
        url: '/docs/openapi.json',
        dom_id: '#swagger-ui',
        deepLinking: true
      })
    </script>
  </body>
</html>`
    response.header('content-type', 'text/html; charset=utf-8')
    return response.send(html)
  }
}

