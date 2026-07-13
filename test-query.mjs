import db from './db.js'

try {
  const total = db.prepare('SELECT COUNT(*) as total FROM recipes').get().total
  console.log('Total recipes:', total)
  
  const rows = db.prepare('SELECT id, name, category_id, data FROM recipes ORDER BY name LIMIT ? OFFSET ?').all(50, 0)
  console.log('Rows:', rows.length)
  
  if (rows.length > 0) {
    const items = rows.map(r => ({ ...JSON.parse(r.data), id: r.id, name: r.name, categoryId: r.category_id }))
    console.log('First item keys:', Object.keys(items[0]))
    console.log('First item name:', items[0].name)
  }
} catch (e) {
  console.error('ERROR:', e.message)
  console.error('STACK:', e.stack)
}

try {
  const total = db.prepare('SELECT COUNT(*) as total FROM products').get().total
  console.log('Total products:', total)
  
  const rows = db.prepare('SELECT id, name, category, icon, data FROM products ORDER BY name LIMIT ? OFFSET ?').all(50, 0)
  console.log('Rows:', rows.length)
} catch (e) {
  console.error('ERROR:', e.message)
  console.error('STACK:', e.stack)
}

process.exit(0)
