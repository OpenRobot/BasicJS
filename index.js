const discord = require('discord.js')
const client = new discord.Client()
var prefix = "."
const yt = require('ytdl-core')

client.on('connect', () => {
    console.log("Connected to Discord but not yet ready.")
});

client.on('ready'), () => {
    console.log("Logged in.")
});

client.on('message', message => {
    if (message.content === `${client.user.tag}`) {
        message.reply(`Hello ${message.author.tag}`);
    }
    if (!message.guild) return;

    if (message.content === `${prefix}join`) {
        if (message.author.voice.channel) {
            const connection = await message.author.voice.channel.connect()
            message.channel.send('Joined VC.');
        } else {
            message.reply("Connect to a VC First!");
        }
    }
)};

client.login('token')