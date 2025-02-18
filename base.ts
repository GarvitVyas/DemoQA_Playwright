import {test as base} from '@playwright/test';
import { UploadDownload } from './pages/Elements_Page/UploadDownload/upload_download';
import { Element } from './pages/Elements_Page/navigate_to_element';
import { WebTables } from './pages/Elements_Page/WebTablePage/webTables_Page';
import { TextBox } from './pages/Elements_Page/TextBoxPage/textBox_Page';
import { RadioButton } from './pages/Elements_Page/RadioButtonPage/radioButton_Page';
import { Links } from './pages/Elements_Page/LinksPage/links_Page';
import { CheckBox } from './pages/Elements_Page/CheckBoxPage/checkBox_Page';
import { Buttons } from './pages/Elements_Page/ButtonsPage/buttons_Page';
type myfixture={
    elementPage:Element;
    uploadDownloadPage:UploadDownload;
    webtablePage:WebTables;
    textboxPage:TextBox;
    radiobuttonPage:RadioButton;
    linksPage:Links;
    checkboxPage:CheckBox;
    buttonsPage:Buttons;
}

export const test = base.extend<myfixture>({
    elementPage: async({page},use)=>{
        const elementPage = new Element(page);
        use(elementPage);
    },
    buttonsPage:async({page},use)=>{
        const buttonsPage = new Buttons(page);
        use(buttonsPage);
    },
    checkboxPage:async({page},use)=>{
        const checkboxPage = new CheckBox(page);
        use(checkboxPage);
    },
    linksPage:async({page},use)=>{
        const linksPage = new Links(page);
        use(linksPage);
    },
    uploadDownloadPage: async({page},use)=>{
        const uploadDownloadPage = new UploadDownload(page);
        use(uploadDownloadPage);
    },
    webtablePage: async({page},use)=>{
        const webtablePage = new WebTables(page);
        use(webtablePage);
    },
    textboxPage: async({page},use)=>{
        const textboxPage = new TextBox(page);
        use(textboxPage);
    },
    radiobuttonPage:async({page},use)=>{
        const radiobuttonPage = new RadioButton(page);
        use(radiobuttonPage);
    }
})

export {expect} from '@playwright/test';