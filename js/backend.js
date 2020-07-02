'use strict';

(function () {
  var URL_TO_GET = 'https://javascript.pages.academy/code-and-magick/data';
  var URL_TO_POST = 'https://javascript.pages.academy/code-and-magick';
  var TIMEOUT_IN_MS = 10000;

  var request = function (url, method, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status < 400) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);
    xhr.send(data);
  };

  var load = function (onSuccess, onError) {
    request(URL_TO_GET, 'GET', undefined, onSuccess, onError);
  };

  var save = function (data, onSuccess, onError) {
    request(URL_TO_POST, 'POST', data, onSuccess, onError);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
