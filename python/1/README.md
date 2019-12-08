# Slack Python sdk example

(Don't name your file `slack.py`)

1. `pip3 install slackclient`
1. Go here: https://api.slack.com/apps
1. Click `Create New App` and add App
1. Go to your slack app page (e.g. https://api.slack.com/apps/AM6NWCQ1Z)
1. Click `Add features and functionality`
1. Click `Permissions`
1. Go down to scopes and add this scope: `chat:write:user`
1. Go here: https://api.slack.com/apps/AM6NWCQ1Z/oauth?
1. Copy the `OAuth Access Token`
1. `export SLACK_API_TOKEN=your-token-here`
1. `python3 ./my-slack.py`
