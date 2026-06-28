# @vmvarela/semantic-release-apt

Dispatch a `repository_dispatch` event to trigger APT repository publishing during semantic-release.

## Install

```bash
npm install --save-dev @vmvarela/semantic-release-apt
```

## Usage

```yml
# .releaserc.yml
plugins:
  - '@semantic-release/commit-analyzer'
  - '@semantic-release/release-notes-generator'
  - '@semantic-release/github'
  - '@semantic-release/npm'
  - '@semantic-release/git'
  - '@vmvarela/semantic-release-apt'
```

## Environment

| Variable | Required | Description |
|---|---|---|
| `GH_TOKEN` or `GITHUB_TOKEN` | Yes | GitHub token with repo scope |
| `APT_DISPATCH_REPO` | Yes | Target repo in `owner/repo` format |

## What it does

1. Verifies `GH_TOKEN` / `GITHUB_TOKEN` and `APT_DISPATCH_REPO` are set
2. On `publish` step: sends `repository_dispatch` event with event type `apt-publish`
3. Payload includes `version` and `source_repo`
