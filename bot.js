// Load up the discord.js library. Else throw an error.
try {
  var Discord = require('discord.js')
  if (process.version.slice(1).split('.')[0] < 8) {
    throw new Error('Node 8.0.0 or higher is required. Please upgrade / update Node.js on your computer / server.')
  }
} catch (e) {
  console.error(e.stack)
  console.error('Current Node.js version: ' + process.version)
  console.error("In case you´ve not installed any required module: \nPlease run 'npm install' and ensure it passes with no errors!")
  process.exit()
}
const client = new Discord.Client({disableEveryone: true})

const radio = require('./modules/radio')

// Create a config file like the example-config.json
// Put EXPERIMENTAL to 1 if you are developing!
var {TOKEN, PREFIX, VERSION, EXPERIMENTAL} = require('./config.json')

let clientStatus

if (EXPERIMENTAL === '1') {
  clientStatus = 'idle'
} else {
  clientStatus = 'online'
}

client.on('warn', console.warn)

client.on('error', console.error)

client.on('ready', async () => {
  console.log('Starting Bot...\nNode version: ' + process.version + '\nDiscord.js version: ' + Discord.version + '\n')
  console.log('This Bot is online! Running on version ' + VERSION)
  client.user.setPresence({
    status: clientStatus,
    game: {
      name: `on ${client.guilds.size} servers! ${PREFIX}help`
    }
  }).catch(e => {
    console.error(e)
  })
  console.log(`Ready to serve on ${client.guilds.size} servers for a total of ${client.users.size} users.`)

  // This is only for development purposes, you can write everything you want here
  if (EXPERIMENTAL === '1') {
    // console.log("\nOnline on these servers:")
    // client.guilds.map(g => {
    //   console.log(g.name);
    // })
  }
})

client.on('disconnect', () => console.log('I disconnected currently but I will try to reconnect!'))

client.on('reconnecting', () => console.log('Reconnecting...'))

// This event triggers only when the bot joins a guild.
client.on('guildCreate', guild => {
  console.log(`Joined a new guild -> ${guild.name}. (id: ${guild.id}) This guild has ${guild.memberCount} members!`)
  client.user.setPresence({
    game: {
      name: `on ${client.guilds.size} servers! ${PREFIX}help`
    }
  }).catch(e => {
    console.error(e)
  })
})

// This event triggers only when the bot is removed from a guild.
client.on('guildDelete', guild => {
  console.log(`I have been removed from -> ${guild.name}. (id: ${guild.id})`)
  client.user.setPresence({
    game: {
      name: `on ${client.guilds.size} servers! ${PREFIX}help`
    }
  }).catch(e => {
    console.error(e)
  })
})

client.on('message', async msg => {
  if (msg.isMentioned(client.user)) {
    msg.delete().catch(e => {
      // console.error(e)
      msg.channel.send('❌ Message to the owner of the server: **Please give the right permissions to me so I can delete this message.**')
    })
    msg.author.send({
      embed: {
        color: 3447003,
        title: 'Cookies RadioBot -> Commands',
        fields: [
          {
            name: PREFIX + 'radio',
            value: 'If you are in a channel, I will join to your channel and start playing the web radio'
          },
          {
            name: PREFIX + 'stop or ' + PREFIX + 'leave',
            value: 'Stops playing the music (if you are in a voice channel) and I will leave the channel'
          },
          {
            name: PREFIX + 'invite',
            value: 'The bot will send an invite link to you so you can invite the bot to your server'
          },
          {
            name: PREFIX + 'botinfo',
            value: 'Sends information about the bot'
          },
          {
            name: PREFIX + 'list or ' + PREFIX + 'radiolist',
            value: 'Sends a list with all radios available'
          }
        ],
        timestamp: new Date()
      }
    })
  }

  if (msg.author.bot) return
  if (!msg.content.startsWith(PREFIX)) return undefined

  const args = msg.content.split(' ')

  let command = msg.content.toLowerCase().split(' ')[0]
  command = command.slice(PREFIX.length)

  if (command === 'radio') {
    console.log(args)

    // If no other argument was given, then the bot will play the main radio
    if (args[1] === undefined) {
      radio.playRadio(msg.member.voiceChannel, msg, 'Capital FM', 'http://vis.media-ice.musicradio.com/CapitalUKMP3')
    }

    // Kiss 100 - Web radio
    if (args[1] === '1') {
      radio.playRadio(msg.member.voiceChannel, msg, 'Kiss 100', 'http://tx.planetradio.co.uk/http_live_bauer.php?i=kissnational.aac&awparams=loggedin:false&amsparams=playerid:BMUK_tunein')
    }

    // Heart FM - Web radio
    if (args[1] === '2') {
      radio.playRadio(msg.member.voiceChannel, msg, 'Heart FM', 'http://vis.media-ice.musicradio.com/HeartUKMP3')
    }

    // Drum N Bass FM - Web radio
    if (args[1] === '3') {
      radio.playRadio(msg.member.voiceChannel, msg, 'Drum N Bass FM', 'http://photek.dnbradio.com:8000/dnbradio_main.mp3')
    }

    // SynthWave FM - Web radio
    if (args[1] === '4') {
      radio.playRadio(msg.member.voiceChannel, msg, 'SynthWave FM', 'http://13.229.223.14:8000/stream')
    }
  }

  if (command === 'help') {
    msg.delete().catch(e => {
      // console.error(e)
      msg.channel.send('❌ Message to the owner of the server: **Please give the right permissions to me so I can delete this message.**')
    })
    msg.author.send({
      embed: {
        color: 3447003,
        title: 'Cookies RadioBot -> Commands',
        fields: [
          {
            name: PREFIX + 'radio',
            value: 'If you are in a channel, I will join to your channel and start playing the web radio'
          },
          {
            name: PREFIX + 'stop or ' + PREFIX + 'leave',
            value: 'Stops playing the music (if you are in a voice channel) and I will leave the channel'
          },
          {
            name: PREFIX + 'invite',
            value: 'The bot will send an invite link to you so you can invite the bot to your server'
          },
          {
            name: PREFIX + 'botinfo',
            value: 'Sends information about the bot'
          },
          {
            name: PREFIX + 'list or ' + PREFIX + 'radiolist',
            value: 'Sends a list with all radios available'
          }
        ],
        timestamp: new Date()
      }
    })
  }

  if (command === 'botinfo') {
    let mode

    if (EXPERIMENTAL === '1') {
      mode = '**EXPERIMENTAL (issues can appear)**'
    } else {
      mode = 'normal'
    }

    msg.channel.send({ embed: {
      title: 'Bot information',
      fields: [
        {
          name: 'Servers',
          value: `${client.guilds.size}`
        },
        {
          name: 'Serving for',
          value: `${client.users.size} users in total`
        },
        {
          name: 'Mode',
          value: mode
        }
      ],
      description: 'Information about the bot',
      color: '3447003'
    }})
  }

  if (command === 'invite') {
    msg.delete()
     .then(msg => console.log(`Successfully deleted the message ${msg.content} from ${msg.author} on ${msg.guild.name}.`))
     .catch(e => {
       console.error(e)
       if (e.name === 'DiscordAPIError') {
         // Check if the error message is that the message is not unknown.
         // If it is, it will not send anything because this would confuse some people. This error (Unknown message)
         // appears only, when another bot deleted the message already before this bot here (this could happen if
         // both bots are using the same command and prefix).
         if (e.message !== 'Unknown Message')
           // Sending the message to the channel with the error message
           { msg.channel.send(`❌ **Cannot delete the message.** (Error: ${e.message})`) }
       } else {
         // Sending a full error message if it´s not a DiscordAPIError
         msg.channel.send(`❌ **Cannot delete the message.** (Error: ${e})`)
       }
     })
    console.log(msg.content)
    msg.author.send('Add the bot with the following link to your server: https://discordapp.com/oauth2/authorize?client_id=398195643371356170&scope=bot&permissions=53478656')
  }

  if (command === 'list' || command === 'radiolist') {
    msg.channel.send({
      embed: {
        color: 3447003,
        title: 'Cookies RadioBot -> Radio list ',
        fields: [
          {
            name: PREFIX + 'radio',
            value: 'Radio: **Capital FM**'
          },
          {
            name: PREFIX + 'radio 1',
            value: 'Radio: **Kiss 100**'
          },
          {
            name: PREFIX + 'radio 2',
            value: 'Radio: **Heart FM**'
          },
          {
            name: PREFIX + 'radio 3',
            value: 'Radio: **Drum N Bass FM**'
          },
          {
            name: PREFIX + 'radio 4',
            value: 'Radio: **SynthWave FM**'
          }
        ],
        timestamp: new Date()
      }
    })
  }

  if (command === 'leave' || command === 'stop') {
    const voiceChannel = msg.member.voiceChannel
    if (voiceChannel && voiceChannel.id === msg.guild.voiceConnection.channel.id) {
      console.log('Leaving a channel and stopped playing iLoveRadio')
      msg.channel.send('I´m leaving the channel now!')
      voiceChannel.leave()
    } else {
      msg.reply('no')
    }
  }
})

client.login(TOKEN).catch(e => console.log(e))

process.on('unhandledRejection', (PromiseRejection) => console.error(`Promise Error -> ${PromiseRejection}`))
