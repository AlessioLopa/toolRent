import vine from '@vinejs/vine'

const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().minLength(3).maxLength(255),
    password: vine.string().minLength(8).maxLength(255),
  })
)

const registerValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .minLength(3)
      .maxLength(255)
      .unique(async (query, field) => {
        const user = await query.from('users').where('email', field).first()
        return !user
      }),
    password: vine.string().minLength(8).maxLength(255),
  })
)

export { loginValidator, registerValidator }
