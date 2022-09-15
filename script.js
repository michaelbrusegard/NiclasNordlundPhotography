const FB = require('fb')

FB.api('/3381927852133032/albums?access_token=' + process.env.FACEBOOK_ACCESS_TOKEN, function(response) {
    console.log(response)
    for (var i = 0; i < response.data.length; i ++) {
      var album = response.data[i];
      if (album.id === process.env.ALBUM_ID) {
  
        FB.api('/' + album.id + '/photos?access_token=' + accesstoken, function(photos){
          if (photos && photos.data && photos.data.length){
            for (var j=0; j<photos.data.length; j++){
              var photo = photos.data[j];
              // photo.picture contain the link to picture
              var image = document.createElement('img');
              image.src = photo.picture;
              document.body.appendChild(image);
            }
          }
        });
  
        break;
      }
    }
  });