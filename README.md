[Pre-built Cfx server artifacts](https://github.com/Firou91/cfx-artifact/branches/active), automatically published and kept up-to-date via GitHub Actions *(This creation is featured to the Havoc Store, join the [Discord server](https://dsc.gg/havoc-store) to visit other creations)*.

---

## Branches

Each branch contains a ready-to-use Cfx server artifact for a specific platform and release channel:

| Branch | Platform | Channel | Description |
|--------|----------|---------|-------------|
| `stable-windows` | Windows | Stable | Latest recommended build |
| `stable-linux` | Linux | Stable | Latest recommended build |
| `latest-windows` | Windows | Latest | Bleeding-edge build |
| `latest-linux` | Linux | Latest | Bleeding-edge build |

---

## Usage

### 1. Clone the branch you need

```bash
# Example: stable or latest Windows artifact
git clone -b stable-windows https://github.com/Firou91/cfx-artifact.git
git clone -b latest-windows https://github.com/Firou91/cfx-artifact.git

# Example: stable or latest Linux artifact
git clone -b stable-linux https://github.com/Firou91/cfx-artifact.git
git clone -b latest-linux https://github.com/Firou91/cfx-artifact.git
```

### 2. Update when a new version is available

When the workflow publishes a newer artifact, simply pull to get it:

```bash
git pull
```

> #### If you manage your server from an IDE or editor, pull from your ***Source code control*** interface.

> #### ⚠️ Never schedule automatic `git fetch` or `git pull` operations, as this may cause file lock errors if the `FXServer.exe` is running. Always pull updates manually via your IDE or from the command line after stopping the server.

---

## Maintainers

The root `.gitignore` is synced from `main` to artifact branches to protect repository maintainers from accidentally pushing local sensitive files (`server-monitor-token.key`, `server-tls.crt`, `server-tls.key`).

**This is a maintainer-side safety measure; users without push permissions cannot publish changes to this repository.**

---

## How it works

`publish-stable.yml` and `publish-latest.yml` run on schedule and via **workflow_dispatch**. Each run checks the official Cfx changelog API for the current version, compares it with the version stored in the branch (`artifact-version.txt`), and publishes a new commit only when the artifact has changed.

`sync-gitignore.yml` runs when `.gitignore` changes on `main` (and via **workflow_dispatch**) to propagate only the root `.gitignore` to artifact branches.

---

## License

This repository's tooling (workflows, scripts, documentation) is licensed under the [MIT License](LICENSE).

Cfx server artifacts are the property of [Cfx.re](https://cfx.re) / [Rockstar Games](https://www.rockstargames.com) and are subject to their respective terms of use.
