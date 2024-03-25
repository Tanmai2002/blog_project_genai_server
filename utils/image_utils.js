const fs= require('fs').promises;

let loadImageFromStorage = async (path) => {
    let data = await fs.readFile(path);
    return data;
}


let bufferToGeminiData = (buffer, mime_type = 'image/jpeg') => {

    const data = {
        inlineData: {
            data: buffer.toString("base64"),
            mime_type: mime_type,
        }
    }

    return data;
}
let fetchImageFromUrl = async (url) => {
    let data = await fetch(url).then((response) => response.arrayBuffer()).then((buffer) => Buffer.from(buffer));
    return data;
}

module.exports = {
    loadImageFromStorage,
    bufferToGeminiData,
    fetchImageFromUrl
}