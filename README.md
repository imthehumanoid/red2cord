# red2cord

**red2cord** uses [node-reddit-js](https://www.npmjs.com/package/node-reddit-js) and [discord.js](https://www.npmjs.com/package/discord.js) webhooks to bring posts from reddit to discord!

```
npm install red2cord
```

### Setting up:

Make sure you require the right modules.
```js
const Reddit = require('node-reddit-js');
const Discord = require('discord.js');
const red2cord = require('red2cord');
```

Make sure you have a client made for Reddit...
```js
const client = new Reddit.Client({
  id: 'APP-ID',
  secret: 'APP-SECRET',
  username: 'REDDIT-USERNAME',
  password: 'REDDIT-PASSWORD'
});
//See documentation for node-reddit-js for more info.
```
and the webhook client for Discord.
```js
const webhook = new Discord.WebhookClient({
  token: 'WEBHOOK-TOKEN',
});
//See documentation for discord.js for more info.
```

Make the red2cord poster.
```js
  const poster = new red2cord.Poster({
   redditClient: client,
   webhook: webhook,
   subreddits: ['reddit.com'],
   range: 10
  });
   /*
  "range" is not required and defaults to 10.
  It picks how many Reddit posts ago you can pick randomly from.
  
  "subreddits" is an array of subreddits that it will randomly choose from.
  Only put one if you don't want it to pick from a list.
  */
  ```
  
  Make a post.
  ```js
  poster.post();
  ```
 ## Examples
 Post from 2 sets:
 ```js
const Reddit = require('node-reddit-js');
const Discord = require('discord.js');
const red2cord = require('red2cord');

const client = new Reddit.Client({
  id: 'APP-ID',
  secret: 'APP-SECRET',
  username: 'REDDIT-USERNAME',
  password: 'REDDIT-PASSWORD'
});

const webhook = new Discord.WebhookClient({
  token: 'WEBHOOK-TOKEN',
});

const poster = new red2cord.Poster({
   redditClient: client,
   webhook: webhook,
   subreddits: ['askreddit', 'showerthoughts']
  });
  
const poster2 = new red2cord.Poster({
   redditClient: client,
   webhook: webhook,
   subreddits: ['eyebleach']
  });
  
 poster.post();
 poster2.post();
```

 Autoposter:
  ```js
const Reddit = require('node-reddit-js');
const Discord = require('discord.js');
const red2cord = require('red2cord');

const client = new Reddit.Client({
  id: 'APP-ID',
  secret: 'APP-SECRET',
  username: 'REDDIT-USERNAME',
  password: 'REDDIT-PASSWORD'
});

const webhook = new Discord.WebhookClient({
  token: 'WEBHOOK-TOKEN',
});

function repeatPost() {
  const poster = new red2cord.Poster({
   redditClient: client,
   webhook: webhook,
   subreddits: ['meme', 'memes', 'dankmemes']
  });
  poster.post();
};

repeatPost();
setInterval(repeatPost, 300000);
//Posts from one of the subs every 5 minutes.
```
