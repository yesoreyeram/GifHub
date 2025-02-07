const apiBase = 'https://api.giphy.com/v1';
const apiKey = 'dc6zaTOxFJmzC'; // Public API key

// We make the API request from the background page, rather
// than in the injected script, to bypass CSP restrictions
// on github.com
function giphySearch(searchTerm) {
    const encodedSearch = encodeURIComponent(searchTerm);
    const uri = `${apiBase}/gifs/search?q=${encodedSearch}&api_key=${apiKey}`;
    return fetch(uri).then(res => res.json());
}

chrome.runtime.onMessage.addListener((data, sender, cb) => {
    giphySearch(data.query).then(cb);
    // return true to indicate async response to page
    return true;
});
