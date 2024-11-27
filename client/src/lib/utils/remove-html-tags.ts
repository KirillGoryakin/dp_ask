export function removeHtmlTags(html: string) {
  const el = document.createElement('div');
  el.innerHTML = html;
  return el.textContent || el.innerText || '';
}
