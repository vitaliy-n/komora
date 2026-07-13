export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      const errors = result.error.issues.map((i) => ({
        field: i.path.join('.'),
        message: i.message,
      }))
      return res.status(400).json({ error: 'Помилка валідації', details: errors })
    }
    req.body = result.data
    next()
  }
}

export function validateQuery(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.query || {})
    if (!result.success) {
      const errors = result.error.issues.map((i) => ({
        field: i.path.join('.'),
        message: i.message,
      }))
      return res.status(400).json({ error: 'Помилка валідації', details: errors })
    }
    res.locals.query = result.data
    next()
  }
}
