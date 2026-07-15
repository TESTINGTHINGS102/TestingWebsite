import app from './app'

const PORT = parseInt(process.env.PORT || '5000', 10)
const HOST = process.env.HOST || '0.0.0.0'

const server = app.listen(PORT, HOST, () => {
  console.log(`[server] Beauty API running on http://${HOST}:${PORT}`)
  console.log(`[server] Environment: ${process.env.NODE_ENV || 'development'}`)
})

process.on('SIGTERM', () => {
  console.log('[server] SIGTERM received. Shutting down gracefully...')
  server.close(() => {
    console.log('[server] Server closed')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('[server] SIGINT received. Shutting down gracefully...')
  server.close(() => {
    console.log('[server] Server closed')
    process.exit(0)
  })
})
