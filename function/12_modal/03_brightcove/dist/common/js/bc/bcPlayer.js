/*----------------------------------------------------------------------
Meiji Video Player 
auther Tadakuma Shuhei 2016/08
----------------------------------------------------------------------*/

var bcPlayer = {
  setMovie: function (
    _targetObj,
    _movieID,
    _movieWidth,
    _movieHeight,
    _autoStart,
    _miniPlayer
  ) {
    var _w = "206";
    var _h = "176";
    var _playerID = "SyoFMThw";
    var _script =
      "//players.brightcove.net/4401740915001/SyoFMThw_default/index.min.js";
    var _playerAccount = "4401740915001";

    // Not Auto Play Version
    if (
      _autoStart == "false" ||
      typeof _autoStart == "undefined" ||
      _autoStart == ""
    ) {
      var _playerID = "BJl8w6Wt";
      _script =
        "//players.brightcove.net/4401740915001/BJl8w6Wt_default/index.min.js";
    }

    if (_movieWidth == "") {
      _movieWidth = _w;
    }
    if (_movieHeight == "") {
      _movieHeight = _h;
    }
    if (_miniPlayer == "") {
      _miniPlayer = false;
    }

    //for mini player
    if (_miniPlayer == "true") {
      _playerID = "1b1b8c6b-0810-4a0c-ad46-30b700d69666";
    }

    //create video element
    document.getElementById(_targetObj).innerHTML =
      "<div style='display: block; position: relative; max-width: " +
      _movieWidth +
      "px" +
      "'>" +
      "<div style='padding-top: 56.25%;' oncontextmenu='return false'>" +
      "<video style='width: 100%; height: 100%; position: absolute; top: 0px; bottom: 0px; right: 0px; left: 0px;' " +
      "data-account='" +
      _playerAccount +
      "' " +
      "data-player='" +
      _playerID +
      "' " +
      "data-embed='default' " +
      "class='video-js' " +
      "data-video-id='ref:" +
      _movieID +
      "'" +
      "controls" +
      "></video>" +
      "</div></div>";

    //add script
    var script = document.createElement("script");
    script.src = _script;
    document.body.appendChild(script);
  },
};
