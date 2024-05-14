function setupTypewriter(t: HTMLElement, text: string): { type: () => void } {
  t.textContent = "";

  const typeSpeeds: number[] = [];
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.textContent = text[i];
      fragment.appendChild(span);
      if (text[i] === " ") {
          typeSpeeds.push(0);
      } else {
          typeSpeeds.push((Math.random() * 100) + 50); // Typing Speed
      }
  }

  t.appendChild(fragment);

  const type = (): void => {
      const spans = t.querySelectorAll('span');
      spans[cursorPosition].classList.add('typed');
      cursorPosition += 1;

      if (cursorPosition < text.length) {
          setTimeout(type, typeSpeeds[cursorPosition]);
      }
  };

  let cursorPosition: number = 0;

  return {
      type: type
  };
}

const typewriterElement: HTMLElement | null = document.getElementById('typewriter');

if (typewriterElement !== null && typewriterElement instanceof HTMLElement) {
  const text = typewriterElement.textContent || "";
  const typewriterInstance = setupTypewriter(typewriterElement, text);
  typewriterInstance.type();
} else {
  console.error("Typewriter element not found or not an HTMLElement.");
}
