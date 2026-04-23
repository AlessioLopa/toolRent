import Tool from '#models/tool'
import { ToolValidator } from '#validators/tool'
import type { HttpContext } from '@adonisjs/core/http'
import Status from '@adonisjs/lucid/commands/migration/status'
import { DateTime } from 'luxon'

export default class ToolsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const tools = await Tool.query().orderBy('id', 'asc').preload('category')
    return tools
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const {
      name,
      description,
      category_id: categoryId,
    } = await request.validateUsing(ToolValidator)

    const tool = await Tool.create({
      name,
      description,
      status: 'available' as const,
      due_date: null,
      category_id: categoryId,
    })
    response.created(tool)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const tool = await Tool.findOrFail(params.id)
    return tool
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const {
      name,
      description,
      category_id: categoryId,
    } = await request.validateUsing(ToolValidator)

    const tool = await Tool.findOrFail(params.id)

    const updatedTool = tool.merge({
      name,
      description,
      category_id: categoryId,
    })

    await updatedTool.save()

    return response.ok(updatedTool)
  }

  async overdue({}: HttpContext) {
    const tools = await Tool.query()
      .where('status', 'rented')
      .where('due_date', '<', DateTime.now().toSQL()!)
      .orderBy('due_date', 'asc')
      .preload('category')

    return tools
  }

  async overdueSimulate({}: HttpContext) {
    const tools = await Tool.query()
      .where('status', 'rented')
      .where('due_date', '<', DateTime.now().plus({ hours: 72 }).toSQL()!)
      .preload('category')
    return tools
  }
  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const tool = await Tool.findOrFail(params.id)
    await tool.delete()
    return response.ok({ message: 'Tool deleted successfully' })
  }
}
