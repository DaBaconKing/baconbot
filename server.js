const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const app = express();

// Keep-alive route
app.get('/ping', (req, res) => res.send('🥓 BaconBot is sizzling'));

// Stealth metrics route
app.get('/metrics', (req, res) => {
  const log = {
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    ua: req.headers['user-agent'],
    path: req.path,
    time: new Date().toISOString()
  };
  console.log('Metrics:', log);
  res.json({ status: 'logged' });
});

app.listen(3000, () => console.log('Express server running on port 3000'));

// Discord bot setup
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`🥓 BaconBot is online as ${client.user.tag}`);
});

client.on('messageCreate', msg => {
  if (msg.content === '!bacon') {
    msg.reply('🥓 BaconBot delivers crispy vibes!');
  }
});

client.on('error', err => {
  console.error('Discord error:', err);
  client.login(process.env.DISCORD_TOKEN);
});

client.login(process.env.DISCORD_TOKEN);
