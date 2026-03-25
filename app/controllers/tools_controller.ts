import Tool from '#models/tool'
import { ToolValidator } from '#validators/tool'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class ToolsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const tools = await Tool.query().orderBy('id', 'asc')
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
    const { name, description, status, due_date, category_id } =
      await request.validateUsing(ToolValidator)

    const tool = await Tool.create({
      name,
      description,
      status,
      due_date: due_date ? DateTime.fromJSDate(due_date) : null,
      category_id: category_id,
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
    const { name, description, status, due_date, category_id } =
      await request.validateUsing(ToolValidator)

    const tool = await Tool.findOrFail(params.id)

    const updatedTool = await tool.merge({
      name,
      description,
      status,
      due_date: due_date ? DateTime.fromJSDate(due_date) : null,
      category_id: category_id,
    })

    await updatedTool.save()

    return response.ok(updatedTool)
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
