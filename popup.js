// Initialize button with user's preferred color
let startTimerButton = document.getElementById("startTimer");

chrome.storage.sync.get("color", ({ color }) => {
    startTimerButton.style.backgroundColor = color;
});

startTimerButton.addEventListener("click", async() => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
    });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}