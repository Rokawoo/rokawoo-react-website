class TextScramble {
    private el: HTMLElement;
    private strings: string[];
    private currentStringIndex: number = 0;
    private chars: string;
    private queue: { from: string; to: string; start: number; end: number; char?: string }[];
    private frame: number = 0;
    private frameRequest: number = 0;
    private resolve!: () => void;

    constructor(el: HTMLElement, strings: string[]) {
        this.el = el;
        this.strings = strings;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.queue = [];
        this.update = this.update.bind(this);
        this.setText(this.strings[0]);
    }

    public setText(newText: string): Promise<void> {
        const oldText = this.el.textContent || '';
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise<void>(resolve => (this.resolve = resolve));
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    private update(): void {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }

                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }

        const fragment = document.createDocumentFragment();
        const wrapper = document.createElement('div');
        wrapper.innerHTML = output;
        while (wrapper.firstChild) {
            fragment.appendChild(wrapper.firstChild);
        }
        this.el.textContent = '';
        this.el.appendChild(fragment);

        if (complete !== this.queue.length) {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        } else {
            this.resolve();
            this.currentStringIndex = (this.currentStringIndex + 1) % this.strings.length;
            this.startNextTextAnimation(4500); // Delay between each text change
        }
    }

    private startNextTextAnimation(delay: number): void {
        setTimeout(() => {
            this.setText(this.strings[this.currentStringIndex]);
        }, delay);
    }

    private randomChar(): string {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

export default TextScramble;

