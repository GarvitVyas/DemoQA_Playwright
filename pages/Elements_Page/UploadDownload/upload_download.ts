import {Page} from '@playwright/test';
import { ElementActions } from '../../data/utils/action_utils';
import path from 'path';


class UploadDownload{
    private page:Page;
    private elementActions : ElementActions;
    private uploadFile:string;
    private uploadedPath:string;
    private downloadCTA:string;
    constructor(page:Page){
        this.page = page;
        this.elementActions=new ElementActions;
        this.uploadedPath='p#uploadedFilePath';
        this.uploadFile='input#uploadFile';
        this.downloadCTA='a#downloadButton';
    }

    async verifyUploadDownload(){
        return await this.page.url();
    }

    async noUpload(){
        const path = await this.page.locator(this.uploadedPath);
        const flag = await this.elementActions.visibilityCheck(path);
        return flag ? true : false;
    }

    async uploadPath(){
        return await this.page.locator(this.uploadedPath).innerText();
    }

    async uploadImage(){
        const uploadcta = await this.page.locator(this.uploadFile);
        const visibility = await this.elementActions.visibilityCheck(uploadcta);
        if(visibility){
           try{
            const image = path.resolve('pages/data/Image/download.png');
            await uploadcta.setInputFiles(image);
           } catch(err){
            console.log('Error while uploading image',err);
           }
        }else{
            throw new Error('Upload unsuccessfull, button not found');
        }
    }

    async verifyDownloadCTA(){
        const cta = await this.page.locator(this.downloadCTA,{hasText:'Download'});
        return await this.elementActions.visibilityCheck(cta) ? true : false;
    }
    async downloading(){
        const download = await this.page.locator(this.downloadCTA);
        const [downloaded] = await Promise.all([
            this.page.waitForEvent('download'),
            download.click()
        ])
        //get it saved so when the context closes the file is not removed
        const filename = await downloaded.suggestedFilename();
        await downloaded.saveAs(filename);
        return filename;
    }

}
export {UploadDownload};

