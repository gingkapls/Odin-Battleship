import "./style.css";

function component(text: string): HTMLDivElement {
  const element = document.createElement('div');
  element.textContent = text;
  return element;
}

document.body.appendChild(component("hello webpack"));
