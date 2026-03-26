/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import CategoriesController from '#controllers/categories_controller'
import RentalsController from '#controllers/rentals_controller'
import ToolsController from '#controllers/tools_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import AuthController from '#controllers/auth_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.resource('categories', CategoriesController).apiOnly()

    router.get('tools/overdue', [ToolsController, 'overdue'])
    router.resource('tools', ToolsController).apiOnly()

    router.post('tools/:tool_id/rent', [RentalsController, 'rent'])
    router.post('tools/:tool_id/return', [RentalsController, 'return'])

    if (process.env.NODE_ENV === 'development') {
      router.get('tools/overdue/simulate', [ToolsController, 'overdueSimulate'])
    }
  })
  .use(middleware.auth())

router
  .group(() => {
    router.post('login', [AuthController, 'login'])
    router.post('logout', [AuthController, 'logout'])
    router.post('register', [AuthController, 'register'])
  })
  .prefix('user')
