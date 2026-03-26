import Tool from '#models/tool'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class RentalsController {
  async rent({ params, response }: HttpContext) {
    const tool = await Tool.findOrFail(params.tool_id)

    if (tool.status !== 'available') {
      return response.conflict({ message: 'Tool is not available for rent' })
    }

    tool.status = 'rented'
    tool.due_date = DateTime.now().plus({ hours: 48 })
    await tool.save()

    return response.ok(tool)
  }

  async return({ params, response }: HttpContext) {
    const tool = await Tool.findOrFail(params.tool_id)

    if (tool.status !== 'rented') {
      return response.conflict({ message: 'Tool is not currently rented' })
    }

    tool.status = 'available'
    tool.due_date = null
    await tool.save()

    return response.ok(tool)
  }
}
