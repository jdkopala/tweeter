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
      $('#tweets-container').empty(),
      renderTweets(data);
    });
};
// Loop through tweets data and put the data in the createTweetElement function
const renderTweets = (data) => {
  // $('#tweets-container').empty();
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