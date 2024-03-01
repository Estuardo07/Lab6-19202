import express from 'express'
import { getAllPosts, createPost, getPostById, updatePost, deletePost } from './db.js'

const app = express()
app.use(express.json())
const port = 3000

app.get('/posts', async (req, res) => {
    const posts = await getAllPosts()
    res.json(posts)
})

app.post('/posts', async (req, res) => {
    const { title, content, image, author } = req.body
    const result = await createPost(title, content, image, author)
    res.json(result)
})

app.get('/posts/:id', async (req, res) => {
    const post = await getPostById(req.params.id)
    res.json(post)
})

app.put('/posts/:id', async (req, res) => {
    const { title, content, image, author } = req.body
    const result = await updatePost(title, content, image, author, req.params.id)
    res.json(result)
})

app.delete('/posts/:id', async (req, res) => {
    const result = await deletePost(req.params.id)
    res.json(result)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
