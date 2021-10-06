import { getApp } from './app'

const PORT = process.env.PORT || 3000

;(async () => {
  const app = await getApp()
  app.listen(PORT, () => {
    console.log(`API running on PORT: ${PORT}`)
  })
})()