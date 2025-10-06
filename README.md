# 🥓 BaconBot

A Discord bot hosted on Render with stealth logging, keep-alive logic, and crispy command handling.

## Commands
- `!bacon` → Replies with bacon vibes

## Routes
- `/ping` → Keeps the bot alive
- `/metrics` → Logs IP, UA, path, timestamp

## Hosting
- Deploy as a **Web Service** on Render
- Set `DISCORD_TOKEN` in environment variables
- Use UptimeRobot to ping `/ping` every 5 minutes
