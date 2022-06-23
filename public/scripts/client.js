/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Generate an error message for the new tweet form
const errorMessage = (text) => {
  let error = `<div id='error'>${text}</div>`
  $('main.container').prepend(error).hide().slideDown("fast");
};
// Creates safe text to stop code injection
const escapeHTML = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
// Load the data from tweets and pass them to the render function
const loadTweets = () => {
  $.get("/tweets")
    .then((data) => {
      renderTweets(data);
    });
};
// Loop through tweets data and put the data in the createTweetElement function
const renderTweets = (data) => {
  $('#tweets-container').empty();
  for (let d of data) {
    let $tweet = createTweetElement(d);
    $("#tweets-container").prepend($tweet); // Put the tweet in the container on the page
  }
};
// Create HTML element and inject tweet data so it renders on the page
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
      ${escapeHTML(tweetData.content.text)}
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

  $form.hide();
  // On submit, check tweet length and submit form or display error message based on it's content
  $($form).submit((event) => {
    event.preventDefault();
    $('#error').slideUp("fast"); // Hide error message after submit if visible
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
      $("#tweet-text").focus();
      let $counter = $("#tweet-text").siblings("div").children("output");
      $counter.text(140); // reset character counter to 140 on submit
      }
  })

  const $writeButton = $('nav').children('.container');

  // Change cursor style to the pointer when mouseover the nav button
  $($writeButton).on('mouseover', () => {
    $($writeButton).css('cursor', 'pointer');
  });

  // Hide/show the submit new tweet form
  $($writeButton).on('click', () => {
      if ($form.is(':visible')) {
        $('#tweet-text').blur();
        $form.slideUp();
      } else {
        $form.slideDown()
        $('#tweet-text').focus();
      }
  });

});
