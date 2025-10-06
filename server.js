const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => {
  console.log(`🥓 BaconBot is online as ${client.user.tag}`);
  client.user.setPresence({
  activities: [{ name: 'Bacon Cooking!', type: 2 }],
  status: 'online'
});
});

client.on('messageCreate', msg => {
  if (msg.content === '!bacon') {
    msg.reply('Crispy and operational!');
  }
});

client.login(process.env.DISCORD_TOKEN);
