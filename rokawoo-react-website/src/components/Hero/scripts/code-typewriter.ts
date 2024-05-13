function setupTypewriter(t: HTMLElement): { type: () => void } {
    const text: string = t.textContent || "";
    t.textContent = "";
    let cursorPosition: number = 0;
    let typeSpeeds: number[] = [];
  
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        typeSpeeds.push(0);
      } else {
        typeSpeeds.push((Math.random() * 100) + 50); // Type speed
      }
    }
  
    const type = (): void => {
      t.textContent += text[cursorPosition];
      cursorPosition += 1;
  
      if (cursorPosition < text.length) {
        setTimeout(type, typeSpeeds[cursorPosition]);
      }
    };
  
    return {
      type: type
    };
  }
  
  const typewriter: HTMLElement | null = document.getElementById('typewriter');
  
  if (typewriter !== null) {
    const typewriterInstance = setupTypewriter(typewriter);
    typewriterInstance.type();
  }
  