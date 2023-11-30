import json
from discord_webhook import DiscordWebhook, DiscordEmbed



def lambda_handler(event, context):
    webhook = DiscordWebhook(url="replaceWithYourDiscordURL")

    embed = DiscordEmbed(title=event['clientId'],description=event['eventType'],color="03b2f8")

    #embed.set_image(url="url to pictures")
    webhook.add_embed(embed)
    webhook.execute()

    return {
        "statusCode": 200,
        "body": {"message": "Hello World"}
    }