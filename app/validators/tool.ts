import vine from '@vinejs/vine'

const ToolValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
    description: vine.string().minLength(3).maxLength(255),
    categoryId: vine.number(),
  })
)

export { ToolValidator }
