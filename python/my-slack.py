import os
from slack import WebClient

slack_token = os.environ["SLACK_API_TOKEN"]
client = WebClient(token=slack_token)

client.chat_postMessage(
    channel="#general",
    text="Hello from your app! :tada:"
)
