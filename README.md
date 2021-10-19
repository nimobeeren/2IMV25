# 🔎 2IMV25 Interactive Virtual Environments

## Generate Rounds

To generate rounds:

```bash
cd src
node generate-rounds.mjs
```

There will be a `rounds.json` file with the metadata needed for the rounds and a `rounds.txt` with the summary of targets and their locations per round.

## Pinata.cloud Logging

To enable logging, you have to pass the `apiKey` and `secretApiKey` via the URL query.

```
https://experiment.website?apiKey=[Api Key]&secretApiKey=[Secret Api Key]
```
