import {test,expect} from '@playwright/test';
import { Element } from '../pages/Elements_Page/navigate_to_element';
import { UploadDownload } from '../pages/Elements_Page/UploadDownload/upload_download';
import { data} from '../pages/data/data';

test.describe('@uploaddownload - tests for upload and download page',()=>{
    let elementPage:Element;
    let uploadDownloadPage: UploadDownload;

    test.beforeEach(async({page})=>{
        try{
            await page.goto('/');
            elementPage = new Element(page);
            uploadDownloadPage = new UploadDownload(page);
        }catch(err){
            console.info('Issue with before each hook for upload download page');
            throw err;
        }
    })

    test('@uploadImage - upload and verify uploaded',async({})=>{
        await elementPage.navigateToElementPage();
        await elementPage.navigateToUploadDownload();
        await expect(uploadDownloadPage.verifyUploadDownload()).toContain(data['upload download']);

        await uploadDownloadPage.uploadImage();
        await uploadDownloadPage.noUpload();
    })
})