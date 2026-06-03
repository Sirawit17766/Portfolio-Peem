const json = (response, status, payload) => {
  response.status(status).json(payload)
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    json(response, 405, { error: 'Method not allowed' })
    return
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL

  if (!webhookUrl) {
    json(response, 500, { error: 'Discord webhook is not configured' })
    return
  }

  try {
    const name = request.body?.name?.trim().slice(0, 80) || 'Portfolio visitor'
    const email = request.body?.email?.trim().slice(0, 120) || 'Not provided'
    const message = request.body?.message?.trim().slice(0, 1200)

    if (!message) {
      json(response, 400, { error: 'Message is required' })
      return
    }

    const discordResponse = await fetch(webhookUrl, {
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

    if (!discordResponse.ok) {
      throw new Error(`Discord responded with ${discordResponse.status}`)
    }

    json(response, 200, { ok: true })
  } catch (error) {
    json(response, 500, { error: error instanceof Error ? error.message : 'Failed to send message' })
  }
}
