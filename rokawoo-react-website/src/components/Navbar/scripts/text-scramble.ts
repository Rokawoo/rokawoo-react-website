class TextScramble {
    private el: HTMLElement;
    private strings: string[];
    private currentStringIndex: number = 0;
    private chars: string;
    private queue: { from: string; to: string; start: number; end: number; char?: string }[];
    private frame: number = 0;
    private frameRequest: number = 0;
    private resolve!: () => void;

    private readonly animationDelay: number = 4500;

    constructor(el: HTMLElement, strings: string[]) {
        this.el = el;
        this.strings = strings;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.queue = [];
        this.update = this.update.bind(this);
    }

    public async start(initialTitle: string): Promise<void> {
        await this.setText(initialTitle);
        await new Promise(resolve => setTimeout(resolve, this.animationDelay));
        this.setText(this.strings[1]);
    }

    public setText(newText: string): Promise<void> {
        const oldText = this.el.textContent || '';
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise<void>(resolve => (this.resolve = resolve));
        this.queue = [];

        for (let i = 0; i < length; i++) {
            let from = oldText[i] || '';
            let to = newText[i] || '';
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
        const output: string[] = [];
        let complete = 0;

        for (let i = 0, len = this.queue.length; i < len; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output.push(to);
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }

                output.push(`<span class="dud">${char}</span>`);
            } else {
                output.push(from);
            }
        }

        this.el.innerHTML = output.join('');

        if (complete !== this.queue.length) {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        } else {
            this.resolve();
            this.currentStringIndex = (this.currentStringIndex + 1) % this.strings.length;
            this.startNextTextAnimation(this.animationDelay);
        }
    }

    private startNextTextAnimation(delay: number): void {
        setTimeout(() => {
            const nextText = this.strings[this.currentStringIndex];
            this.setText(nextText);
        }, delay);
    }

    private randomChar(): string {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

export default TextScramble;
