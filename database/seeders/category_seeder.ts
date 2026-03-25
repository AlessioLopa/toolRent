import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Category.createMany([
      { name: 'Outillage' },
      { name: 'Electronique' },
      { name: 'Mobilier' },
    ])
  }
}
