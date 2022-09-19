window.fbAsyncInit = function() {
  FB.init({
    appId            : 1112651016296583,
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v15.0'
  });

  FB.api('/2298950123764149?access_token=EAAPz80CV2IcBAMY0xkn4pMoD5tTT4RmhcKpOoYPoXmZCVIiK6trEykcyrrEZAR8ibssw7aCZBOIuLC4o0PhiorxKzzXYCQPvho7zE4gtlfyZC8sKo8yMO2wzQbEhL0e1TCSRxKa77ZCyYdEqE9BM5vfv8zEymE0ZBt5os1XOF1ZAja6kige3QewZB8tBhzzZBXR45711OCUXzMMJjKZCtZB8IOonlmCZAv0ajrPYrdj2G4e6GAN5s2HpiwtDt5pRPrBvcqYZD', function(response) {
    console.log(response)
    console.log(n)
    n = response.picture
    let image = document.createElement('img');
            image.src = n
            document.body.appendChild(image);
  });
};