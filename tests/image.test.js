// FILEPATH: /c:/Users/crazi/Desktop/Blog_Projectss/GenAi/tests/image.test.js
const image_utils = require('../utils/image_utils');
const fileType = require('file-type');

describe('Image Utils', () => {
    
    it('Testing', async () => {
        const data = await image_utils.loadImageFromStorage('assets/test.jpg');
        const buffer = Buffer.from(data);
        const mime_type = 'image/jpeg';
        const geminiData = image_utils.bufferToGeminiData(buffer, mime_type);
        expect(geminiData).toBeDefined();
        expect(geminiData).toEqual({ inlineData: { data: buffer.toString("base64"), mime_type: mime_type } });
    });

    it('File From URL Test', async () => {
        const data = await image_utils.fetchImageFromUrl('https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png');
       
        const type = await fileType.fromBuffer(data);
        expect(type).toBeDefined();
        //expect to be of type image
        expect(type.mime).toContain('image'); // image/png or image/jpeg
    });

    it('File From URL Test Wrong Image Url', async () => {
        const data = await image_utils.fetchImageFromUrl('https://www.google.com');
        
        const type = await fileType.fromBuffer(data);
        //expect to not contain image
        expect(type).toBeUndefined();
    });

    it('File From URL Test PDF', async () => {
        const data = await image_utils.fetchImageFromUrl('https://example.com/file.pdf');
        
        const type = await fileType.fromBuffer(data);
        //expect to not contain image
        expect(type).toBeUndefined();
    });

    it('File From URL Test Video', async () => {
        const data = await image_utils.fetchImageFromUrl('https://example.com/video.mp4');
        
        const type = await fileType.fromBuffer(data);
        //expect to not contain image
        expect(type).toBeUndefined();
    });

    

    
    
});