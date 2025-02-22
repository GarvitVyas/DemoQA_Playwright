import {test,expect} from '../base';
import { data} from '../pages/data/data';

test.describe('@uploaddownload - tests for upload and download page',()=>{

    test.beforeEach(async({page})=>{
        try{
            await page.goto('/');
        }catch(err){
            console.info('Issue with before each hook for upload download page');
            throw err;
        }
    })

    test('@uploadImage - upload and verify uploaded',async({elementPage, uploadDownloadPage})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToUploadDownload();
        expect(await uploadDownloadPage.verifyUploadDownload()).toContain(data['upload download']);

        //verify not uploaded initially
        expect(await uploadDownloadPage.noUpload()).toBeFalsy();
        //Upload the image
        await uploadDownloadPage.uploadImage();
        //verify a image is uploaded
        expect(await uploadDownloadPage.noUpload()).toBeTruthy();   
        //verify the name of the image is in the path
        expect(await uploadDownloadPage.uploadPath()).toContain('download.png');     
    })

    test('@downloadImage - download image and verify downloaded',async({elementPage,uploadDownloadPage})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToUploadDownload();
        expect(await uploadDownloadPage.verifyUploadDownload()).toContain(data['upload download']);
        //verify download cta visible and has text download
        expect(await uploadDownloadPage.verifyDownloadCTA()).toBeTruthy();
        const fileDownload = await uploadDownloadPage.downloading();
        expect(fileDownload).toBe('sampleFile.jpeg');
    })
})