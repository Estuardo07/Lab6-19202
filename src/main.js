import express from 'express'
import { getAllPosts, createPost, getPostById, updatePost, deletePost } from './db.js'

const app = express()
app.use(express.json())
const port = 3000

app.get('/posts', async (req, res) => {
    try {
        const posts = await getAllPosts()
        res.status(200).json(posts)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.post('/posts', async (req, res) => {
    const { title, content, image, author } = req.body
    if (!title || !content || !image || !author) {
        res.status(400).json({ error: 'title, content, image and author are required' })
        return
    }
    try {
        const imageBuffer = fs.readFileSync(image)
        const imageBase64 = imageBuffer.toString('base64')
        const result = await createPost(title, content, imageBase64, author)
        res.status(200).json(result)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.get('/posts/:id', async (req, res) => {
    try {
        const post = await getPostById(req.params.id)
        if (post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ error: 'Post not found' })
        }
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.put('/posts/:id', async (req, res) => {
    const { title, content, image, author } = req.body
    if (!title || !content || !image || !author) {
        res.status(400).json({ error: 'title, content, image and author are required' })
        return
    }
    try {
        const imageBuffer = fs.readFileSync(image)
        const imageBase64 = imageBuffer.toString('base64')
        const result = await updatePost(title, content, imageBase64, author, req.params.id)
        res.status(200).json(result)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.delete('/posts/:id', async (req, res) => {
    try {
        const post = await getPostById(req.params.id)
        if (!post) {
            res.status(404).json({ error: 'Post not found' })
            return
        } else {
            const result = await deletePost(req.params.id)
            res.status(204).json(result)
        }
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.get('/', (req, res) => {
  res.send('Home page. Server is running okay.')
})

app.listen(port, () => {
  console.log(`Server listening at http://arpanetos.lol:${port}`)
})
