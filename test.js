function jumbleText(tweet) {
    let text = tweet.split('');
    let newTweet = []
    for(let letter of text) {
        if(Math.random() > .5) newTweet.push(letter.toUpperCase())
        else newTweet.push(letter.toLowerCase());
    }
    return newTweet.join('')
}

console.log(jumbleText("tweaking her tweets just a little to show how little she makes sense :)"));
console.log(jumbleText("Alexandria Ocasio-Cortez"));