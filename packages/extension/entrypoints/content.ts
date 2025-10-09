import { createShadowRootUi } from 'wxt/client';

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    console.log('Aura content script loaded');

    // Create UI for tooltips and corrections
    const ui = await createShadowRootUi(ctx, {
      name: 'aura-correction-ui',
      position: 'inline',
      onMount: container => {
        // Initialize React app for tooltips
        console.log('Aura UI mounted', container);
      },
    });

    // Attach to the document
    ui.mount();

    // Monitor text input fields
    observeTextFields();
  },
});

function observeTextFields() {
  const textFields = document.querySelectorAll(
    'input[type="text"], textarea, [contenteditable="true"]'
  );

  textFields.forEach(field => {
    let debounceTimer: number;

    field.addEventListener('input', (e: Event) => {
      clearTimeout(debounceTimer);
      
      debounceTimer = window.setTimeout(() => {
        const target = e.target as HTMLInputElement | HTMLTextAreaElement;
        const text = 'value' in target ? target.value : target.textContent || '';
        
        if (text.length > 10) {
          checkText(text);
        }
      }, 1500); // 1.5s debounce
    });
  });

  // Use MutationObserver for dynamically added fields
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          const element = node as Element;
          if (
            element.matches('input[type="text"], textarea, [contenteditable="true"]')
          ) {
            // Attach listener to new field
          }
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

async function checkText(text: string) {
  try {
    const response = await browser.runtime.sendMessage({
      type: 'CHECK_TEXT',
      text,
    });
    
    if (response.corrections?.length > 0) {
      // TODO: Display corrections in UI
      console.log('Corrections found:', response.corrections);
    }
  } catch (error) {
    console.error('Error checking text:', error);
  }
}

