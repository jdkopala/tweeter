$(document).ready(() => {
  let countStart = 140

  $("#tweet-text").on('input', function() {
    let counter = $(this).siblings("div").children("output");
    let tweetLength = this.value.length;
    let charCount = countStart - tweetLength
    counter.text(`${charCount}`);

    if (charCount < 0) {
      counter.addClass("counter-negative");
    } 
    if (charCount > 0) {
      counter.removeClass("counter-negative");
    }
  });

});

