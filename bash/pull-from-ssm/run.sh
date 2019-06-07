# Requires AWS CLI and jq
# run this to update local env:
# source ./run.sh

items=(
  "my-test:MY_TEST"
  "my-test2:MY_TEST2"
)

for item in "${items[@]}" ; do
    SSM_KEY="${item%%:*}"
    ENV_KEY="${item##*:}"
    echo "Downloading parameter: ${SSM_KEY}…"
    SSM_VALUE=$(aws ssm get-parameter --with-decryption --name $SSM_KEY | jq --raw-output '.Parameter.Value')
    export $ENV_KEY=$SSM_VALUE
done

echo "Done!"
