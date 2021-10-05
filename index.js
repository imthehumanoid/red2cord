const Reddit = require('node-reddit-js');
const Discord = require('discord.js');

class Poster {
  constructor(config) {
  if (config!==undefined) {
    if (config.redditClient!==undefined) {
      this.redditClient = config.redditClient;
    } else {
      console.info('Error: "redditClient" is a required argument.')
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
 }

post() {
  let rand = Math.floor(Math.random() * this.subreddits.length);
  let range = Math.floor(Math.random() * this.range);
  let subreddit = this.subreddits[rand];
  this.redditClient.reddit.r(subreddit, 'new.json').get().then(async post => {
  let newest = await post.data.children[range].data
  if (newest.selftext.length>2000) {
    newest.selftext = newest.selftext.slice(0, 1997);
  }
  if (newest.title.length>256) {
    newest.title = `${newest.title.slice(0, 253)}...`;
  }
  let embed = new Discord.MessageEmbed()
   .setAuthor(`u/${newest.author}`, null, `https://www.reddit.com/u/${newest.author}`)
   .setTitle(newest.title)
   .setDescription(`${newest.selftext.slice(0, 1997)}...`)
   .setURL(`https://www.reddit.com${newest.permalink}`)
   .setFooter(`⇧ ${newest.ups} | 🗨 ${newest.num_comments}`)
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
  }
  })
 }

}

module.exports.Poster = Poster;
