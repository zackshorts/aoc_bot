// Our Twitter library
const Twit = require('twit');
const TwitterBot = require('node-twitterbot').TwitterBot;
const config = require('./config.js');
const Bot = new TwitterBot(config);
const T = new Twit(require('./config.js'));

function jumbleText(tweet) {
    let text = tweet.split('');
    let newTweet = []
    for(let letter of text) {
        if(Math.random() > .5) newTweet.push(letter.toUpperCase())
        else newTweet.push(letter.toLowerCase());
    }
    return newTweet.join('')
}

function listen() {
    let userID = '138203134';
// open a stream following events from that user ID
    let stream = T.stream('statuses/filter', {follow: (userID)});

    stream.on('tweet', function (tweet) {
        if (tweet.user.id_str === userID) {
            // console.log("this was sent by the user we want to track")
            let phrase = jumbleText(tweet.text);// + ' ' + '@' + tweet.user.screen_name;
            console.log('Found this lil guy: ' + phrase);
            Bot.tweet(phrase)
        } else {
            console.log("This is a retweet :) \n" + phrase);
        }
    });
}

listen();