import { ToolFactory } from '#database/factories/tool_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await ToolFactory.createMany(10)
  }
}
