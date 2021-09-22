const discord = require('discord.js')
const client = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES] });
var prefix = "."
var config = require('./config.json')
// const yt = require('ytdl-core')

client.on('connect', () => {
    console.log("Connected to Discord but not yet ready.")
});

client.on('ready', () => {
    console.log("Logged in.")
});

client.on('messageCreate', message => {
    if (message.content === `${client.user.tag}`) {
        message.reply(`Hello ${message.author.tag}, my prefix is ${prefix}`);
    }
    if (!message.guild) return;

    if (message.content === `${prefix}join`) {
        if (message.member.voice.channel) {
            const connection = message.member.voice.channel.join()
            message.channel.send(`Joined ${message.member.voice.channel}`);
        } else {
            message.reply("Connect to a VC First!");
        }
    }
    if (message.content === `${prefix}ping`) {
        message.reply("Pong!")
    }
    if (message.content === `${prefix}pong`) {
        message.reply("Ping!")
    }
});

client.login(config.token)
