const Reddit = require('node-reddit-js');
const Discord = require('discord.js');

function Poster(config) {
  if (config!==undefined) {
    if (config.reddit_client!==undefined) {
      this.client = config.client;
    } else {
      console.info('Error: "reddit_client" is a required argument.')
    }
    if (config.webhook!==undefined) {
      this.webhook = config.webhook;
    } else {
      console.info('Error: "webhook" is a required argument.')
    }
    if (config.subreddits!==undefined) {
      if (Array.isArray(config.subreddits)) {
      this.subreddits = config.subreddits;
      } else {
        console.info('Error: "subreddits" must be an array.')
      }
    } else {
      console.info('Error: "subreddits" is a required argument.');
    }
    if (config.range!==undefined) {
      if (Number.isInteger(config.range)) {
        this.range = config.range;
      }
      else {
        console.info('Error: "range" must be a valid integer.')
      }
    } else {
      this.range = 10;
    }
  } else {
    console.info('Error: no arguments have been given.');
  }
};

Poster.prototype.addSubreddits = function(subs) {
  this.subreddits = subs;
};
Poster.prototype.setRedditClient = function(client) {
  this.redditClient = client;
};
Poster.prototype.setWebhook = function(wh) {
  this.webhook = wh;
};

Poster.prototype.post = function() {
  let rand = Math.floor(Math.random() * this.subreddits.length);
  let range = Math.floor(Math.random() * this.range);
  let subreddit = this.subreddits[rand];
  this.redditClient.reddit.r(subreddit, 'new.json').get().then(async post => {
  let newest = await post.data.children[range].data
  let embed = new Discord.MessageEmbed()
   .setAuthor(`u/${newest.author}`, null, `https://www.reddit.com/u/${newest.author}`)
   .setTitle(newest.title)
   .setDescription(`${newest.selftext}`)
   .setURL(`https://www.reddit.com${newest.permalink}`)
   .setFooter(`⇧ ${newest.ups} | ⇩ ${newest.downs} | 🗨 ${newest.num_comments}`)
   .setImage(newest.url)
   .setColor('WHITE')
 this.redditClient.reddit.r(subreddit, 'about.json').get().then(async info => {
   let sub = await info.data;
   this.webhook.send({
     embeds: [embed],
     username: sub.display_name_prefixed,
     avatar: sub.community_icon
   })
   console.log(`Sent a post from ${info.data.display_name_prefixed}`)
 })
})
};

Poster.prototype = Object.create(Poster.prototype);

Poster.prototype.constructor = Poster;
