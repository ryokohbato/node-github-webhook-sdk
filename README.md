# node-github-webhook-sdk
GitHub Webhooks API Developer Kit for Node.js

## Usage

```bash
npm install node-github-webhook-sdk
```

```js
import { WebhookApp } from "node-github-webhook-sdk";

const app = new WebhookApp({ secret: "" });

app.watch("*", (data) => {
  console.log(data);
});

app.start(30123);
```
