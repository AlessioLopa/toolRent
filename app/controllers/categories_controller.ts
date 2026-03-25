import Category from '#models/category'
import { CategoryValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const categories = await Category.query().orderBy('name', 'asc')
    return categories
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { name } = await request.validateUsing(CategoryValidator)

    const category = await Category.create({ name })

    return response.created(category)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    return category
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const { name } = await request.validateUsing(CategoryValidator)

    const category = await Category.findOrFail(params.id)

    const updatedCategory = await category.merge({ name })

    await updatedCategory.save()

    return response.ok(updatedCategory)
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    await category.delete()
  }
}
