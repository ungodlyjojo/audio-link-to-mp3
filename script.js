var getMusic = function(music) {
  // format the youtube music url
  var youtubeUrl = "https://www.youtube.com/" + "/music";

  // make a request to url
  fetch(youtubeUrl).then(function (response) {
      console.log(response);
      response.json().then(function(data) {
        console.log(data);  
      });
  });
};