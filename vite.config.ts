import { cloudflare } from '@cloudflare/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

const readBody = async (req: import('node:http').IncomingMessage) => {
  let body = ''

  for await (const chunk of req) {
    body += chunk
  }

  return body
}

const contactApiPlugin = (webhookUrl?: string): Plugin => ({
  name: 'portfolio-contact-api',
  configureServer(server) {
    server.middlewares.use('/api/contact', async (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Method not allowed' }))
        return
      }

      if (!webhookUrl) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Discord webhook is not configured' }))
        return
      }

      try {
        const body = JSON.parse(await readBody(req)) as {
          name?: string
          email?: string
          message?: string
        }

        const name = body.name?.trim().slice(0, 80) || 'Portfolio visitor'
        const email = body.email?.trim().slice(0, 120) || 'Not provided'
        const message = body.message?.trim().slice(0, 1200)

        if (!message) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Message is required' }))
          return
        }

        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'Portfolio Contact',
            allowed_mentions: { parse: [] },
            embeds: [
              {
                title: 'New portfolio contact',
                color: 0x61dafb,
                fields: [
                  { name: 'Name', value: name, inline: true },
                  { name: 'Email', value: email, inline: true },
                  { name: 'Message', value: message },
                ],
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        })

        if (!response.ok) {
          throw new Error(`Discord responded with ${response.status}`)
        }

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ ok: true }))
      } catch (error) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to send message' }))
      }
    })
  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), cloudflare(), contactApiPlugin(env.DISCORD_WEBHOOK_URL)],
  }
})
