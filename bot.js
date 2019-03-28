// Our Twitter library
var Twit = require('twit');
var TwitterBot = require('node-twitterbot').TwitterBot;
var config = require('./config.js');
var Bot = new TwitterBot(config);
// We need to include our configuration file
var T = new Twit(require('./config.js'));

// This is the URL of a search for the latest tweets on the '#MeetMaye' hashtag.
var mediaArtsSearch = {q: "#MeetMaye", count: 100, result_type: "recent"};

// This function finds the latest tweet with the #mediaarts hashtag, and retweets it.
function retweetLatest() {
    T.get('search/tweets', mediaArtsSearch, function (error, data) {
        // log out any errors and responses
        console.log(error, data);
        // If our search request to the server had no errors...
        if (!error) {
            // ...then we grab the ID of the tweet we want to retweet...
            var retweetId = data.statuses[0].id_str;
            // ...and then we tell Twitter we want to retweet it!
            T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
                if (response) {
                    console.log('Success! Check your bot, it should have retweeted something.')
                }
                // If there was an error with our Twitter call, we print it out here.
                if (error) {
                    console.log('There was an error with Twitter:', error);
                }
            })
        }
        // However, if our original search request had an error, we want to print it out here.
        else {
            console.log('There was an error with your hashtag search:', error);
        }
    });
}

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
    var userID = '138203134';
// open a stream following events from that user ID
    var stream = T.stream('statuses/filter', {follow: (userID)});

    stream.on('tweet', function (tweet) {
        if (tweet.user.id_str === userID) {
            // console.log("this was sent by the user we want to track")
            let phrase = jumbleText(tweet.text);// + ' ' + '@' + tweet.user.screen_name;
            console.log('Found this lil guy: ' + phrase);
            Bot.tweet(phrase)
        } else {
            //This is a retweet :)
        }
    });
}

listen();
// Try to retweet something as soon as we run the program...
// retweetLatest();
// ...and then every hour/half after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
// setInterval(retweetLatest, 1000 * 60 * 30);