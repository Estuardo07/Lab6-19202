import conn from './conn.js'

export async function getAllPosts() {
 const [rows] = await conn.query('SELECT * FROM blog_posts')
 return rows
}

export async function createPost(id, title, content, image, author) {
    const [result] = await db.query('INSERT INTO blog_posts (id, title, content, image, author) VALUES (?, ?, ?, ?, ?)', [id, title, content, image, author])
    return result
 }

export async function getPostById(id) {
    const [rows] = await db.query('SELECT * FROM blog_posts WHERE id = ?', [id])
    return rows[0]
}

export async function updatePost(title, content, image, author) {
    const [result] = await db.query('UPDATE blog_posts SET title = ?, content = ?, image = ?, author = ? WHERE id = ?', [title, content, image, author])
    return result
}

export async function deletePost(id) {
    const [result] = await db.query('DELETE FROM blog_posts WHERE id = ?', [id])
    return result
}
