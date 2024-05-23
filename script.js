document.addEventListener("DOMContentLoaded", function() {
  // Retrieve font size and color from cookies if they exist
  const savedFontSize = getCookie("fontsize");
  const savedFontColor = getCookie("fontcolor");

  // Apply saved preferences or default values
  if (savedFontSize) {
    document.documentElement.style.setProperty('--fontsize', savedFontSize);
    document.getElementById('fontsize').value = savedFontSize.replace('px', '');
  }
  if (savedFontColor) {
    document.documentElement.style.setProperty('--fontcolor', savedFontColor);
    document.getElementById('fontcolor').value = savedFontColor;
  }

  // Function to handle form submission
  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fontSize = document.getElementById('fontsize').value + 'px';
    const fontColor = document.getElementById('fontcolor').value;

    // Set cookies for font size and color
    setCookie('fontsize', fontSize, 30);
    setCookie('fontcolor', fontColor, 30);

    // Apply the changes to the page
    document.documentElement.style.setProperty('--fontsize', fontSize);
    document.documentElement.style.setProperty('--fontcolor', fontColor);

    alert('Preferences saved successfully!');
  });

  // Function to set a cookie
  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }

  // Function to retrieve a cookie
  function getCookie(name) {
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null;
  }
});
