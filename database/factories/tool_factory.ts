import factory from '@adonisjs/lucid/factories'
import Tool from '#models/tool'

export const ToolFactory = factory
  .define(Tool, async ({ faker }) => {
    return {
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
      status: 'available' as const,
      due_date: null,
      category_id: faker.helpers.arrayElement([1, 2, 3]),
    }
  })
  .build()
