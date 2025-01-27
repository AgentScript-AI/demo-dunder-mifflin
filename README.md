<div>
  <h1>AgentScript SDK: Dunder Mifflin demo</h1>
</div>

<div >
  <a href="https://www.npmjs.com/package/agentscript-ai"><img alt="CodeCov" src="https://img.shields.io/npm/v/agentscript-ai"></a>&nbsp;
  <a href="https://github.com/AgentScript-AI/agentscript"><img src="https://img.shields.io/github/stars/agentscript-ai/agentscript?label=AgentScript-AI" alt="Website"></a><br/>
  <a href="https://agentscript.ai"><img src="https://img.shields.io/badge/website-agentscript%2Eai-blue" alt="Website"></a>&nbsp;
  <a href="https://agentscript.ai/docs"><img src="https://img.shields.io/badge/docs-learn_more-blue" alt="Docs"></a>&nbsp;<br/>
  <a href="https://discord.gg/hEYMnj62DT"><img src="https://img.shields.io/badge/Discord-Join%20Us-purple?logo=discord&logoColor=white" alt="Join our Discord community"></a>
  <br/>  <br/>
</div>

AgentScript is a unique open-source SDK for building AI agents. \
Here you can see it in action!

<img src="./assets/dunder-mifflin.png" alt="Docs" style="max-width: 640px">

## Running the project

Create an `.env` file in the root of the repo. \
Since we are using Anthropic Claude model, we need Anthropic API key:

```
ANTHROPIC_API_KEY=your-anthropic-api-key
```

Install dependencies and build the project:

```
yarn && yarn build
```

Setup database (Supabase) - you need to have Docker up and running:

```
yarn db:start
```

Push database schema:

```
yarn db:push
```

Seed database with exemplary data

```
yarn db:seed
```

Start the project

```
yarn start
```

## Watch mode

Compile TypeScript in watch mode:

```
yarn build --watch
```

Run the project in a dev mode (restarting on changes)

```
yarn dev
```
