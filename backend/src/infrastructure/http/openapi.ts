export const openapi = {
  openapi: '3.0.3',
  info: {
    title: 'User Management API',
    version: '1.0.0',
    description: 'API de gerenciamento de usuários com JWT e Clean Architecture/DDD.',
  },
  servers: [{ url: '/' }],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
    schemas: {
      Error: {
        type: 'object',
        properties: { message: { type: 'string' }, code: { type: 'string' } },
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        required: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      },
      RegisterInput: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
        },
        required: ['name', 'email', 'password'],
      },
      LoginInput: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
        },
        required: ['email', 'password'],
      },
      AuthResponse: {
        type: 'object',
        properties: {
          token: { type: 'string' },
          user: { $ref: '#/components/schemas/User' },
        },
        required: ['token', 'user'],
      },
    },
  },
  tags: [{ name: 'Health' }, { name: 'Auth' }, { name: 'Users' }],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check',
        responses: { '200': { description: 'OK' } },
      },
    },
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register user',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/RegisterInput' } } },
        },
        responses: {
          '201': {
            description: 'Created',
            content: { 'application/json': { schema: { type: 'object', properties: { user: { $ref: '#/components/schemas/User' } } } } },
          },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginInput' } } },
        },
        responses: {
          '200': {
            description: 'OK',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } },
          },
        },
      },
    },
    '/users': {
      get: {
        tags: ['Users'],
        summary: 'List users',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { users: { type: 'array', items: { $ref: '#/components/schemas/User' } } },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Users'],
        summary: 'Create user',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/RegisterInput' } } },
        },
        responses: {
          '201': {
            description: 'Created',
            content: { 'application/json': { schema: { type: 'object', properties: { user: { $ref: '#/components/schemas/User' } } } } },
          },
        },
      },
    },
    '/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Get user by id',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: {
          '200': {
            description: 'OK',
            content: { 'application/json': { schema: { type: 'object', properties: { user: { $ref: '#/components/schemas/User' } } } } },
          },
        },
      },
      put: {
        tags: ['Users'],
        summary: 'Update user',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/RegisterInput' } } },
        },
        responses: {
          '200': {
            description: 'OK',
            content: { 'application/json': { schema: { type: 'object', properties: { user: { $ref: '#/components/schemas/User' } } } } },
          },
        },
      },
      delete: {
        tags: ['Users'],
        summary: 'Delete user',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: { '204': { description: 'No content' } },
      },
    },
  },
} as const

