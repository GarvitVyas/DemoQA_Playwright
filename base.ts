import {test as base} from '@playwright/test';
import { UploadDownload } from './pages/Elements_Page/UploadDownload/upload_download';
import { Element } from './pages/Elements_Page/navigate_to_element';
type myfixture={
    elementPage:Element;
    uploadDownloadPage:UploadDownload;
}

export const test = base.extend<myfixture>({
    elementPage: async({page},use)=>{
        const elementPage = new Element(page);
        use(elementPage);
    },
    uploadDownloadPage: async({page},use)=>{
        const uploadDownloadPage = new UploadDownload(page);
        use(uploadDownloadPage);
    }
})

export {expect} from '@playwright/test';