const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'titancraftsmp.mcsh.io',
    port: 25565,
    username: 'MR_BOT2',
    version: '1.21.4',
    auth: 'offline'
  })

  bot.on('spawn', () => {
    console.log('Bot spawned!')
    
    setInterval(() => {
      bot.chat('/home')
      console.log('Sent /home')
    }, 30000)

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
    console.log('Reconnecting in 5 seconds...')
    setTimeout(createBot, 5000)
  })

  bot.on('error', (err) => {
    console.log('Error:', err)
    console.log('Reconnecting in 5 seconds...')
    setTimeout(createBot, 5000)
  })

  bot.on('end', () => {
    console.log('Disconnected! Reconnecting in 5 seconds...')
    setTimeout(createBot, 5000)
  })
}

createBot()
