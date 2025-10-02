from flask import Flask, request
import requests
import discord
import os
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("DISCORD_TOKEN")
CHANNEL_ID = int(os.getenv("DISCORD_CHANNEL_ID"))

app = Flask(__name__)
intents = discord.Intents.default()
client = discord.Client(intents=intents)

def get_roblox_info(user_id):
    user_info = requests.get(f"https://users.roblox.com/v1/users/{user_id}").json()
    username = user_info.get("name")
    display_name = user_info.get("displayName")

    thumb_info = requests.get(
        f"https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds={user_id}&size=420x420&format=Png&isCircular=false"
    ).json()
    avatar_url = thumb_info["data"][0]["imageUrl"]

    return username, display_name, avatar_url

@app.route("/roblox", methods=["POST"])
def roblox_webhook():
    data = request.json
    user_id = data.get("userId")
    if not user_id:
        return "Missing userId", 400

    username, display_name, avatar_url = get_roblox_info(user_id)

    embed = discord.Embed(title=f"{display_name} (@{username})", color=0x00ff00)
    embed.set_thumbnail(url=avatar_url)
    embed.set_footer(text=f"Roblox ID: {user_id}")

    async def send_embed():
        channel = client.get_channel(CHANNEL_ID)
        if channel:
            await channel.send(embed=embed)
        else:
            print("Channel not found!")

    client.loop.create_task(send_embed())
    return "Embed sent", 200

@client.event
async def on_ready():
    print(f"Webhook bot online as {client.user}")
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))

client.run(TOKEN)
from flask import Flask, request
import requests
import discord
import os
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("DISCORD_TOKEN")
CHANNEL_ID = int(os.getenv("DISCORD_CHANNEL_ID"))

app = Flask(__name__)
intents = discord.Intents.default()
client = discord.Client(intents=intents)

def get_roblox_info(user_id):
    user_info = requests.get(f"https://users.roblox.com/v1/users/{user_id}").json()
    username = user_info.get("name")
    display_name = user_info.get("displayName")

    thumb_info = requests.get(
        f"https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds={user_id}&size=420x420&format=Png&isCircular=false"
    ).json()
    avatar_url = thumb_info["data"][0]["imageUrl"]

    return username, display_name, avatar_url

@app.route("/roblox", methods=["POST"])
def roblox_webhook():
    data = request.json
    user_id = data.get("userId")
    if not user_id:
        return "Missing userId", 400

    username, display_name, avatar_url = get_roblox_info(user_id)

    embed = discord.Embed(title=f"{display_name} (@{username})", color=0x00ff00)
    embed.set_thumbnail(url=avatar_url)
    embed.set_footer(text=f"Roblox ID: {user_id}")

    async def send_embed():
        channel = client.get_channel(CHANNEL_ID)
        if channel:
            await channel.send(embed=embed)
        else:
            print("Channel not found!")

    client.loop.create_task(send_embed())
    return "Embed sent", 200

@client.event
async def on_ready():
    print(f"Webhook bot online as {client.user}")
    app.run(host="0.0.0.0", port=5000)

client.run(TOKEN)
