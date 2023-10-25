const clientId = "53e82f790219a90";
var defaultAlbumId = "Jfni3";

function requestAlbum() {
  let albumId = document.getElementById("albumIdField").innerText;
  if (!albumId) {
    albumId = defaultAlbumId;
  }
  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
      processAlbumRequest(req.responseText);
    } else if (req.readyState == 4 && req.status != 200) {
      console.log(req.status + " Error with the imgur API: ", req.responseText);
    }
  };
  req.open("GET", "https://api.imgur.com/3/album/" + albumId + "/images", true); // true for asynchronous
  req.setRequestHeader("Authorization", "Client-ID " + clientId);
  req.send();
}

function processAlbumRequest(response_text) {
  var respObj = JSON.parse(response_text);
  for (item of respObj.data.slice(0, 10)) {
    console.log(item);
    requestImage(item.id);
  }
}

function requestImage(imageHash) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
      processImageRequest(req.responseText);
    } else if (req.readyState == 4 && req.status != 200) {
      console.log("Error with the imgur API");
    }
  };
  req.open("GET", "https://api.imgur.com/3/image/" + imageHash, true); // true for asynchronous
  req.setRequestHeader("Authorization", "Client-ID " + clientId);
  req.send();
}

function processImageRequest(response_text) {
  var respObj = JSON.parse(response_text);
  let imgElem = document.createElement("img");
  imgElem.src = respObj.data.link;
  //imgElem.referrerpolicy="no-referrer";
  document.body.appendChild(imgElem);
}
function fetchPromises() {
  let albumId = document.getElementById("albumIdField").innerText;
  if (!albumId) {
    albumId = defaultAlbumId;
  }
  var url = "https://api.imgur.com/3/album/" + albumId + "/images";
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Client-ID " + clientId,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error API");
      }
      return response.text();
    })
    .then((data) => {
      processAlbumRequest(data);
    })
    .catch((e) => {
      console.error(e);
    });
}
async function Fetchasyncawait() {
    let albumId = document.getElementById("albumIdField").value || defaultAlbumId;
    const url = 'https://api.imgur.com/3/album/' + albumId + '/images';
  
    
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Client-ID ' + clientId
        }
      });
  
      if (!response.ok) {
        throw new Error('Error API');
      }
  
      const data = await response.text();
      processAlbumRequest(data);
    
  }


