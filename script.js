(function () {
  const status = document.querySelector('#status-bar');
  const success = document.createElement('li');
  success.textContent = 'Script loaded successfully';
  success.className = 'succeeded';
  status.appendChild(success);
  const failed = document.getElementById('script-failed');
  failed.parentNode.removeChild(failed);
})();
