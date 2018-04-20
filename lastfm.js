function getRecentTracks() {
    //api call for Last.fm, uses my Lastfm user (Waldo53) and my api key
    var xhttp = new XMLHttpRequest();

    var username = document.getElementById('inputUser').value;

    var url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + username + '&api_key=5cfdd68f00e1eb295df127936c42b86a&format=json';

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var parsedJSON = JSON.parse(xhttp.responseText);

            outputSongInfo(parsedJSON);
        }
    }

    xhttp.open("GET", url, true);
    xhttp.send();

    function outputSongInfo(songInfo) {
        var output = '';
        for (var i = 0; i < 5; i++) {
            var artist = songInfo.recenttracks.track[i].artist['#text'];
            var album = songInfo.recenttracks.track[i].album['#text'];
            var song = songInfo.recenttracks.track[i].name;
            var img = songInfo.recenttracks.track[i].image[1]['#text'];

            output += "<div class='recent-track'><img src='" + img + "'><p>'" + song + "' from '" + album + "' by " + artist + "</div>";
        }
        document.getElementById('recentTracks').innerHTML = output;
    }
}

function getTopArtists() {
    var xhttp = new XMLHttpRequest();

    var username = document.getElementById('inputUser').value;

    var url = 'http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=' + username + '&api_key=5cfdd68f00e1eb295df127936c42b86a&format=json'

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var parsedJSON = JSON.parse(xhttp.responseText);

            outputArtistInfo(parsedJSON);
        }
    }

    xhttp.open("GET", url, true);
    xhttp.send();

    function outputArtistInfo(songInfo) {
        var output = '';
        for (var i = 0; i < 5; i++) {
            var artist = songInfo.topartists.artist[i].name;
            var playCount = songInfo.topartists.artist[i].playcount;
            var img = songInfo.topartists.artist[i].image[1]['#text'];

            output += "<div class='top-artist'><img src='" + img + "'><p>" + artist + " with " + playCount + " plays</p></div>";
        }
        document.getElementById('topArtists').innerHTML = output;
    }
}
