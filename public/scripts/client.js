/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
        .then(() => loadTweets());
      $("#tweet-text").val(""); // Clear the form after submit
      $("#tweet-text").focus(); // Focus cursor in form
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
