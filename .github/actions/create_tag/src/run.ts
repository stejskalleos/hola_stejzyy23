import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
  const { Octokit } = require('@octokit/rest');

  const token = core.getInput("repo-token", { required: true });
  const tag = core.getInput("tag", { required: true });
  const sha = github.context.sha;
  const owner = github.context.repo.owner;
  const repo = github.context.repo.repo;

  const octokit = new Octokit({
    auth: token
  });
  octokit.repos.createTag({
    owner,
    repo,
    tag,
    // message: 'Tag message',
    object: sha,
    // type: 'commit'
  })
  .then(response => {
    console.log(`Tag ${response.data.tag} created successfully!`);
  })
  .catch(error => {
    console.error('Error creating tag:', error);
  });
}

run();
