/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import CategoriesController from '#controllers/categories_controller'
import ToolsController from '#controllers/tools_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('categories', CategoriesController).apiOnly()

router.resource('tools', ToolsController).apiOnly()
