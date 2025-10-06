const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();

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

app.get('/', (req, res) => {
  res.send('🥓 BaconBot is alive');
});

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Web server running');
});

client.login(process.env.DISCORD_TOKEN).catch(err => {
  console.error('Login failed:', err);
  process.exit(1);
});


client.on('messageCreate', msg => {
  if (msg.content === '!bacon') {
    msg.reply('Crispy and operational!');
  }
});
