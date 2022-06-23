/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const errorMessage = (text) => {
  let error = `<div id='error'>${text}</div>`
  $('main.container').prepend(error).hide().slideDown("fast");
};

const escape = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const loadTweets = () => {
  $.get("/tweets")
    .then((data) => {
      renderTweets(data);
    });
};

const renderTweets = (data) => {
  for (let d of data) {
    let $tweet = createTweetElement(d);
    $("#tweets-container").prepend($tweet);
  }
};

const createTweetElement = (tweetData) => {
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
    <div class="content">
      ${escape(tweetData.content.text)}
    </div>
    <footer>
      <span>
        ${timeago.format(tweetData.created_at)}
      </span>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart-circle-plus"></i>
      </div>
    </footer>
  </article>`);

  return $tweet;
};

$(document).ready(() => {
  loadTweets();

  const $form = $(".new-tweet").children('form');
  $($form).on('submit',(event) => {
    event.preventDefault();
    $('#error').slideUp("fast");
    let $tweetText = $("#tweet-text").val().length;
    if ($tweetText > 140) {
      errorMessage("🚨 Your tweet is too long! 🚨");
      return false;
    } else if (!$tweetText) {
      errorMessage("🚨 Your tweet is empty 🚨");
      return false;
    } else if ($tweetText <= 140) {
      const $newTweet = $form.serialize();
      $.post("/tweets", $newTweet)
        .then(loadTweets());
      $("#tweet-text").val("");
    }
  });
});
