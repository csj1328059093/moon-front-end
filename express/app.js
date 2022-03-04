import express from 'express'

const app = new express()
app.use(express.json())
app.use(express.static('wwwroot'))
app.listen(3000, () => {
  console.log('服务器启动')
})
