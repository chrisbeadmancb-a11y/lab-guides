'use strict';

for (const code of document.querySelectorAll('.guide-content pre > code')) {
  const toolbar = document.createElement('div');
  toolbar.className = 'copy-toolbar';

  const status = document.createElement('span');
  status.setAttribute('role', 'status');

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Copy';
  button.setAttribute('aria-label', 'Copy text from this block');
  toolbar.append(status, button);
  code.parentElement.before(toolbar);

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.textContent.replace(/\n$/, ''));
      status.textContent = 'Copied';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(code);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Text selected. Use your device’s copy command.';
    }
  });
}
