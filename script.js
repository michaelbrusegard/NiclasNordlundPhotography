window.fbAsyncInit = function() {
    FB.init({
        appId      : '1112651016296583',
        cookie     : true,
        xfbml      : true,
        version    : 'v14.0'
    });
    let accessToken = 0
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          accessToken = response.authResponse.accessToken;
        } 
      } );

    FB.api('/3381927852133032/albums' + '?access_token=' + accessToken, function(response) {
        console.log(response.error)
        for (var i=0; i<response.data.length; i++) {
            var album = response.data[i];
            if (album.id == '1396394877353016'){
        
              FB.api('/'+album.id+'/photos', function(photos){
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
        
    };

    (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));