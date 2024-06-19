export function typeWriterEffect(element, text, speed = 50) {
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    element.innerHTML = '';  // Clear previous content
    typeWriter();
  }
  