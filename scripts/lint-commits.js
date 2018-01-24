const getConfig = require('semantic-release/lib/get-config');
const getCommits = require('semantic-release/lib/get-commits');
const logger = require('semantic-release/lib/logger');

const verifyCommits = require('./verify-commits-plugin');

async function runCommitLint(opts) {
  const config = await getConfig(opts, logger);
  const {plugins, options} = config;

  await plugins.verifyConditions({options, logger});
  const {commits, lastRelease} = await getCommits(
    await plugins.getLastRelease({options, logger}),
    options.branch,
    logger
  );

  await verifyCommits({}, {commits});
};

runCommitLint().catch(error => {
  console.error(error);
  process.exit(1);
});
