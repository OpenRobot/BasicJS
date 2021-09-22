const discord = require('discord.js')
const client = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES] });
var prefix = "."
var config = require('./config.json')
// const yt = require('ytdl-core')

client.on('connect', () => {
    console.log("Connected to Discord but not yet ready.")
});

client.on('ready', async () => {
    console.log("Logged in.")
    await deploy_slash()
    console.log("Deployed slash commands.")
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

client.on('interactionCreate', async interaction => {
    if (interaction.commandName === 'ping') await interaction.reply('Pong!');
    if (interaction.commandName === 'pong') await interaction.reply('Ping!');
    if (interaction.commandName === 'join') {
        if (interaction.message.member.voice.channel) {
            const connection = interaction.message.member.voice.channel.join()
            interaction.reply(`Joined ${message.member.voice.channel}`);
        } else {
            interaction.reply("Connect to a VC First!");
        }
    } 
})

async function deploy_slash() {
    slash_commands = [
        {
            name: "ping",
            description: "Replies with Pong!"
        },
        {
            name: "pong",
            description: "Replies with Ping!"
        },
        {
            name: "join",
            description: "Joins your current voice channel!"
        }
    ]
    const commands = await client.application?.commands.set(slash_commands);
}

client.login(config.token)
