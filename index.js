const discord = require('discord.js')
const client = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES] });
var prefix = "."
var config = require('./config.json')
// const yt = require('ytdl-core')

client.on('connect', () => {
    console.log("Connected to Discord but not yet ready.")
});

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.name}#${client.user.discriminator}.`)
    await deploy_slash()
    console.log("Deployed slash commands.")
});

client.on('messageCreate', async message => {
    if (message.content === `${client.user.tag}`) await message.reply(`Hello ${message.author.tag}, my prefix is ${prefix}`);
    if (message.content === `${prefix}ping`) await message.reply("Pong!")
    if (message.content === `${prefix}pong`) await message.reply("Ping!")
    if (!message.guild) return;

    if (message.content === `${prefix}help`) await help(message)
    if (message.content === `${prefix}join`) {
        if (message.member.voice.channel) {
            const connection = await message.member.voice.channel.connect();
            await message.reply(`Joined ${message.member.voice.channel}`);
        } else {
            await message.reply("Connect to a VC First!");
        }
    }
});

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) { // isnt isCommand a method?
        if (interaction.commandName === 'ping') {
            await interaction.reply('Pong!');
        } else if (interaction.commandName === 'pong') {
            await interaction.reply('Ping!');
        } else if (interaction.commandName === 'join') {
            if (interaction.message.member.voice.channel) {
                const connection = interaction.message.member.voice.channel.join();
                interaction.reply(`Joined ${interaction.message.member.voice.channel}`);
            } else {
                interaction.reply("Connect to a VC First!");
            }   
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
    await client.application?.commands.set(slash_commands);
}

async function help(message) {
    var misc = new discord.MessageEmbed()
        .setColor('#f7df1e')
        .setTitle('WhyBot.js Help Menu')
        .setDescription('Here are all the miscellaneous commands!')
        .setFields(
            {name: "ping", value: "Replies with Pong!"},
            {name: "pong", value: "Replies with Ping!"}
        )
        .setFooter("Hope you enjoy the bot!")

    var music = new discord.MessageEmbed()
        .setColor('#f7d1e')
        .setTitle('WhyBot.js Help Menu')
        .setDescription('Here are all the music commands!')
        .setFields(
            {name: "join", value: "Joins your current voice channel!"}
        )

    // add button stuff
    var buttons = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageButton()
                .setCustomId('misc')
                .setLabel('Miscellaneous')
                .setStyle('PRIMARY'),
            new discord.MessageButton()
                .setCustomId('music')
                .setLabel("Music")
                .setStyle("PRIMARY")
        )

    message.reply({content: "Click the button that corresponds to the category you need help with!", components: [buttons]})

    const filter = i => i.user.id === message.author.id;
    const collector = message.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async i => {
        if (i.customId === 'misc') {
            await i.update({embeds: [misc]});
        }

        if (i.customId === 'music') {
            await i.update({embeds: [music]})
        }
    });

    collector.on('end', i => {
        const disabled_row = new discord.MessageActionRow().addComponents(
            buttons.components[0].setDisabled(true),
            buttons.components[1].setDisabled(true)
        )
        i.update({components: [disabled_row]})
    })
}

client.login(config.token)
