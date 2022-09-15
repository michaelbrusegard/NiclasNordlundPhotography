const FB = require('fb')

const albumid = '1396394877353016'
const accesstoken = 'EAAFxWyOz61YBAJB2KQe7g8RxR3zxJQ91HZB1qtbFfdBo1VzhAUbhBD16d9nSPT8TIVNvg1flfPe26IwrbjFPjn7znijIYZB4y6eu5CTT8S0rpS0C0uVaLmA71pu8wtDtv0o2Swt8NgsMyCIvgoYITYiMVNpNPrKeuEw3xKzHj8FECCOn46ucuXsjdZB4EhYpWm3x13oGZCPpnDy1YvxTxI0xZA4OUrAGxxPn7ZA69q1PpZA9sBJz0ljrZCRZBI56w2P8ZD'

FB.api('/3381927852133032/albums?access_token=' + accesstoken, function(response) {
    console.log(response)
    for (var i = 0; i < response.data.length; i ++) {
      var album = response.data[i];
      if (album.id === albumid) {
  
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