import { getRandomColor } from "../common";

class Text {
  private x: number;
  private y: number;
  private timer: any;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  create(el: HTMLSpanElement, text: string) {
    const body = document.body;
    el.style.position = "absolute";
    el.style.zIndex = "9999999";
    el.style.userSelect = "none";
    el.style.fontWeight = "bold";
    el.style.fontSize = "12px"
    el.innerHTML = text;
    el.style.left = this.x - 40 + "px";
    el.style.top = this.y - 20 + "px";
    el.style.color = getRandomColor();
    el.style.animation = "remove 2s";
    body.appendChild(el);

    let i = 0;
    this.timer = setInterval(() => {
      el.style.top = this.y - 20 - i + "px";
      i++;
    }, 10);
  }

  out(el: HTMLSpanElement) {
    el.remove();
    clearInterval(this.timer);
   
  }
}

export function loveAnimate(e: MouseEvent) {
  const x = e.pageX;
  const y = e.pageY;

  const text = new Text(x, y);
  const span = document.createElement("span");
  text.create(span, "♥沈莹萍lovely");
  setTimeout(() => {
    text.out(span);
  }, 1900);
}
