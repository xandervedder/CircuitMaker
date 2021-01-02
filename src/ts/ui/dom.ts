export const $ = (selector: string): HTMLElement => {
  return document.querySelector(selector);
};

export const all = (selector: string): NodeListOf<HTMLElement> => {
  return document.querySelectorAll(selector);
};
