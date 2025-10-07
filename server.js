const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const express = require('express');
const app = express();
require('dotenv').config();

// Serve static frontend from /public
app.use(express.static('public'));

// Discord client setup
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// Bot ready
client.once('ready', () => {
  console.log(`🥓 BaconBot is online as ${client.user.tag}`);
  client.user.setPresence({
    activities: [{ name: 'Bacon Cooking!', type: 2 }],
    status: 'online'
  });
});

// Welcome embed
client.on('guildMemberAdd', member => {
  const { user, displayName, guild } = member;

  const welcomeEmbed = new EmbedBuilder()
    .setColor(0xffc107)
    .setTitle(`Welcome to ${guild.name}!`)
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setDescription(`Hey ${displayName}, glad you joined!`)
    .addFields(
      { name: 'Username', value: user.tag, inline: true },
      { name: 'Display Name', value: displayName, inline: true },
      { name: 'Server', value: guild.name, inline: true }
    )
    .setFooter({ text: `User ID: ${user.id}` })
    .setTimestamp();

  const channel = guild.systemChannel;
  if (channel) {
    channel.send({ embeds: [welcomeEmbed] });
  }
});

// Bot command
client.on('messageCreate', msg => {
  if (msg.content === '!bacon') {
    msg.reply('Crispy and operational!');
  }
});

// Web routes
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Start web server
app.listen(process.env.PORT || 3000, () => {
  console.log('Web server running');
});

// Login bot
client.login(process.env.DISCORD_TOKEN).catch(err => {
  console.error('Login failed:', err);
  process.exit(1);
});
