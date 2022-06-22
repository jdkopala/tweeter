/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(() => {

  renderTweets = (data) => {
    for (let d of data) {
      let $tweet = createTweetElement(d);
      $("#tweets-container").append($tweet);
    }
  };

  createTweetElement = (tweetData) => {
    let $tweet = (
    `<article class="tweet">
      <header>
        <div>
          <img class="avatar" src=${tweetData.user.avatars}>
          <span class="username">${tweetData.user.name}</span>
        </div>
        <span>
          ${tweetData.user.handle}
        </span>
      </header>
      <text>
        ${tweetData.content.text}
      </text>
      <footer>
        <span>
          ${tweetData.created_at}
        </span>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart-circle-plus"></i>
        </div>
      </footer>
    </article>`)
    return $tweet;
  };

  renderTweets(data);

  const $form = $(".new-tweet").children('form');
  $($form).on('submit',(event) => {
    event.preventDefault();
    const $newTweet = $(this).serialize;
    console.log($newTweet);
    $.post("/tweets", $newTweet);
  })
})
