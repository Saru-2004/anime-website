// FAVORITES TABLE
db.prepare(`
  CREATE TABLE IF NOT EXISTS favorites (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER,

    anime_id INTEGER,

    title TEXT,

    image TEXT

  )
`).run();