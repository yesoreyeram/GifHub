import { getAuthenticityToken, getPreviewUri } from './gh-page';

function getMarkdownPreview(text) {
    // Upgrade jQuery deferred to an ES6 Promise
    return Promise.resolve($.ajax({
        method: 'POST',
        url: getPreviewUri(),
        data: {
            authenticity_token: getAuthenticityToken(),
            text
        }
    }));
}

export function bypassCSPForImages(images = []) {
    const markdown = images.map(image => (
        `![${image.name}](${image.uri})`
    )).join('');

    return getMarkdownPreview(markdown).then(res => {
        const $res = $(res);
        return Array.from($res.find('img')).map(img => ({
            uri: img.src,
            name: img.alt
        }));
    });
}
