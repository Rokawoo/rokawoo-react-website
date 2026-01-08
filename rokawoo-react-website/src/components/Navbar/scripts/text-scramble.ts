type QueueItem = {
    from: string;
    to: string;
    start: number;
    end: number;
    char?: string;
};

class TextScramble {
    private readonly el: HTMLElement;
    private readonly strings: string[];
    private readonly chars = "!<>-_\\/[]{}—=+*^?#________";
    private readonly animationDelay = 4500;

    private queue: QueueItem[] = [];
    private currentStringIndex = 0;
    private frame = 0;
    private frameRequest = 0;
    private timeoutId = 0;
    private resolve: (() => void) | null = null;
    private stopped = false;

    constructor(el: HTMLElement, strings: string[]) {
        this.el = el;
        this.strings = strings;
        this.update = this.update.bind(this);
    }

    start(initialTitle: string): void {
        this.stopped = false;
        this.setText(initialTitle).then(() => {
            if (this.stopped) return;
            this.timeoutId = window.setTimeout(() => {
                if (!this.stopped) this.setText(this.strings[1]);
            }, this.animationDelay);
        });
    }

    stop(): void {
        this.stopped = true;
        cancelAnimationFrame(this.frameRequest);
        clearTimeout(this.timeoutId);
        this.resolve?.();
    }

    setText(newText: string): Promise<void> {
        const oldText = this.el.textContent || "";
        const length = Math.max(oldText.length, newText.length);
        this.queue = new Array(length);

        for (let i = 0; i < length; i++) {
            const start = (Math.random() * 40) | 0;
            this.queue[i] = {
                from: oldText[i] || "",
                to: newText[i] || "",
                start,
                end: start + ((Math.random() * 40) | 0),
            };
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();

        return new Promise<void>(resolve => (this.resolve = resolve));
    }

    private update(): void {
        if (this.stopped) return;

        const output: string[] = [];
        let complete = 0;
        const len = this.queue.length;

        for (let i = 0; i < len; i++) {
            const item = this.queue[i];
            const { from, to, start, end } = item;

            if (this.frame >= end) {
                complete++;
                output.push(to);
            } else if (this.frame >= start) {
                if (!item.char || Math.random() < 0.28) {
                    item.char = this.chars[(Math.random() * this.chars.length) | 0];
                }
                output.push(`<span class="dud">${item.char}</span>`);
            } else {
                output.push(from);
            }
        }

        this.el.innerHTML = output.join("");

        if (complete !== len) {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        } else {
            this.resolve?.();
            this.currentStringIndex = (this.currentStringIndex + 1) % this.strings.length;
            this.scheduleNext();
        }
    }

    private scheduleNext(): void {
        if (this.stopped) return;
        this.timeoutId = window.setTimeout(() => {
            if (!this.stopped) this.setText(this.strings[this.currentStringIndex]);
        }, this.animationDelay);
    }
}

export default TextScramble;