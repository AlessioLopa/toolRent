import { defineConfig } from '@adonisjs/cors'
import env from '#start/env'

/**
 * Configuration options to tweak the CORS policy. The following
 * options are documented on the official documentation website.
 *
 * https://docs.adonisjs.com/guides/security/cors
 */

let corsConfig = defineConfig({})

if (env.get('NODE_ENV') === 'production') {
  corsConfig = defineConfig({
    enabled: true,
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    headers: true,
    credentials: true,
    maxAge: 90,
  })
}

if (env.get('NODE_ENV') === 'development') {
  corsConfig = defineConfig({
    enabled: true,
    origin: true,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
    headers: true,
    exposeHeaders: [],
    credentials: true,
    maxAge: 90,
  })
}

export default corsConfig
