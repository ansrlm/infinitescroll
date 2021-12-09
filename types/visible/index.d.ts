declare module "@egjs/visible" {
  export default class Visible {
    constructor(
      element: HTMLElement | Document | Window,
      options?: {
        targetClass?: string;
        expandSize?: number;
      }
    );

    on(
      event: "change",
      eventHandler: (event: {
        visible: Array<Record<string, any>>;
        invisible: Array<Record<string, any>>;
      }) => void
    ): void;
    off(event?: string): void;
    observe(options?: { delay?: number; containment?: boolean }): void;
    unobserve(): void;
  }
}
