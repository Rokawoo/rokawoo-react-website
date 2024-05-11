function setupTypewriter(t: HTMLElement): { type: () => void } {
  const HTML: string = t.innerHTML;
  t.innerHTML = "";
  let cursorPosition: number = 0;
  let tag: string = "";
  let writingTag: boolean = false;
  let tagOpen: boolean = false;
  let typeSpeed: number = 100;
  let tempTypeSpeed: number = 0;

  const type = (): void => {
      if (writingTag === true) {
          tag += HTML[cursorPosition];
      }

      if (HTML[cursorPosition] === "<") {
          tempTypeSpeed = 0;
          if (tagOpen) {
              tagOpen = false;
              writingTag = true;
          } else {
              tag = "";
              tagOpen = true;
              writingTag = true;
              tag += HTML[cursorPosition];
          }
      }
      if (!writingTag && tagOpen) {
          (t as HTMLElement).innerHTML += HTML[cursorPosition];
      }
      if (!writingTag && !tagOpen) {
          if (HTML[cursorPosition] === " ") {
              tempTypeSpeed = 0;
          } else {
              tempTypeSpeed = (Math.random() * typeSpeed) + 50;
          }
          t.innerHTML += HTML[cursorPosition];
      }
      if (writingTag === true && HTML[cursorPosition] === ">") {
          tempTypeSpeed = (Math.random() * typeSpeed) + 50;
          writingTag = false;
          if (tagOpen) {
            const newSpan: HTMLElement = document.createElement("span");
            t.appendChild(newSpan);
            newSpan.innerHTML = tag;
            tag = (newSpan.firstChild as HTMLElement).innerHTML;
          }
      }

      cursorPosition += 1;
      if (cursorPosition < HTML.length - 1) {
          setTimeout(type, tempTypeSpeed);
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
