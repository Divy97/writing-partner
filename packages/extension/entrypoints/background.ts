export default defineBackground(() => {
  console.log('Aura background service worker initialized');

  // Listen for installation
  browser.runtime.onInstalled.addListener(details => {
    if (details.reason === 'install') {
      console.log('Aura extension installed');
      // Open onboarding page or show welcome message
      browser.tabs.create({
        url: browser.runtime.getURL('/dashboard/index.html'),
      });
    }
  });

  // Handle messages from content scripts
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Received message:', message);
    
    if (message.type === 'CHECK_TEXT') {
      // This will eventually call our backend API
      handleTextCheck(message.text)
        .then(sendResponse)
        .catch(error => {
          console.error('Error checking text:', error);
          sendResponse({ error: error.message });
        });
      return true; // Indicates async response
    }
  });
});

async function handleTextCheck(text: string) {
  // TODO: Implement API call to backend
  // For now, return mock data
  return {
    corrections: [],
  };
}

