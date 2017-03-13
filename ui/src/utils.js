export function allValuesInArray(a1, a2) {
  var bool = true;
  a1.forEach(function(item, index, array) {
    bool = bool && a2.indexOf(item) != -1;
    })
  return bool;
};

export function anyValueInArray(a1, a2) {
  var bool = false;
  a1.forEach(function(item, index, array) {
    bool = bool || a2.indexOf(item) != -1;
    })
  return bool;
};

export function post(path, obj) {
    var xhr = new XMLHttpRequest();
    xhr.open("post", "/api/games", true);
    xhr.send(JSON.stringify(obj));
};
