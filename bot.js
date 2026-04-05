const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'PRIVATESMPRRIAL.aternos.me',
    port: 45655,
    username: 'MR_BOT',
    version: '1.21.4',
    auth: 'offline'
  })

  bot.on('spawn', () => {
    console.log('Bot spawned!')
    
    // Login with AuthMe
    setTimeout(() => {
      bot.chat('/login 101754')
      console.log('Logged in!')
    }, 3000)

    // Auto /home command every 30 seconds
    setInterval(() => {
      bot.chat('/home')
      console.log('Sent /home')
    }, 30000)

    // Auto move
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => {
        bot.setControlState('jump', false)
      }, 500)
      bot.setControlState('forward', true)
      setTimeout(() => {
        bot.setControlState('forward', false)
      }, 1000)
    }, 5000)
  })

  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason)
    setTimeout(createBot, 30000)
  })

  bot.on('error', (err) => {
    console.log('Error:', err)
    setTimeout(createBot, 30000)
  })

  bot.on('end', () => {
    console.log('Disconnected! Reconnecting in 30 seconds...')
    setTimeout(createBot, 30000)
  })
}

createBot()
