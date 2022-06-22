/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  const loadTweets = () => {
    $.get("/tweets")
      .then((data) => {
        renderTweets(data);
      })
  };
  
  const renderTweets = (data) => {
    for (let d of data) {
      let $tweet = createTweetElement(d);
      $("#tweets-container").append($tweet);
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

  loadTweets();

  const $form = $(".new-tweet").children('form');
  $($form).on('submit',(event) => {
    event.preventDefault();
    const $newTweet = $form.serialize();
    $.post("/tweets", $newTweet);
  })
})
