import vine from '@vinejs/vine'

const CategoryValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
  })
)

export { CategoryValidator }
