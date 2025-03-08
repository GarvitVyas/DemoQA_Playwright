import {test as base} from '@playwright/test';
import { UploadDownload } from './pages/Elements_Page/UploadDownload/upload_download';
import { Element } from './pages/Elements_Page/navigate_to_element';
import { WebTables } from './pages/Elements_Page/WebTablePage/webTables_Page';
import { TextBox } from './pages/Elements_Page/TextBoxPage/textBox_Page';
import { RadioButton } from './pages/Elements_Page/RadioButtonPage/radioButton_Page';
import { Links } from './pages/Elements_Page/LinksPage/links_Page';
import { CheckBox } from './pages/Elements_Page/CheckBoxPage/checkBox_Page';
import { Buttons } from './pages/Elements_Page/ButtonsPage/buttons_Page';
import { DynamicProperties } from './pages/Elements_Page/DynamicProperties/dynamic_Properties';
import { Forms } from './pages/Froms_Page/navigate_to_forms';
import { PracticeForm } from './pages/Froms_Page/PracticeForms/practiceForms';
import { AlertsPage } from './pages/Alerts_Page/navigate_to_alerts';
import { BrowserWindows } from './pages/Alerts_Page/BrowserWindowsPage/browserWindows_page';
import { Alerts } from './pages/Alerts_Page/AlertsPage/alerts_page';
import { Frames } from './pages/Alerts_Page/FramesPage/frame_page';
import { NestedFrames } from './pages/Alerts_Page/NesterFramesPage/nestedFrames_page';
import { ModalDialogs } from './pages/Alerts_Page/ModalDialogsPage/modalDialogs_page';

type myfixture={
    elementPage:Element;
    formsPage:Forms;
    framesPage:Frames;
    modalDialog:ModalDialogs;
    practiceFormPage:PracticeForm;
    dynamicPropertiesPage:DynamicProperties;
    uploadDownloadPage:UploadDownload;
    webtablePage:WebTables;
    textboxPage:TextBox;
    radiobuttonPage:RadioButton;
    linksPage:Links;
    checkboxPage:CheckBox;
    buttonsPage:Buttons;
    alertsPage:AlertsPage;
    browserWindows:BrowserWindows;
    alert:Alerts;
    nestedFrames:NestedFrames;
}

export const test = base.extend<myfixture>({
    elementPage: async({page},use)=>{
        const elementPage = new Element(page);
        use(elementPage);
    },
    modalDialog:async({page},use)=>{
        const modalDialog = new ModalDialogs(page);
        use(modalDialog);
    },
    nestedFrames:async({page},use)=>{
        const nestedFrames = new NestedFrames(page);
        use(nestedFrames);
    },
    framesPage:async({page},use)=>{
        const framesPage = new Frames(page);
        use(framesPage);
    },
    browserWindows:async({page},use)=>{
        const browserWindows = new BrowserWindows(page);
        use(browserWindows);
    },
    alert:async({page},use)=>{
        const alert = new Alerts(page);
        use(alert);
    },
    alertsPage:async({page},use)=>{
        const alertPage = new AlertsPage(page);
        use(alertPage);
    },
    formsPage:async({page},use)=>{
        const formsPage = new Forms(page);
        use(formsPage);
    },
    practiceFormPage:async({page},use)=>{
        const practiceFormPage = new PracticeForm(page);
        use(practiceFormPage);
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
    },
    dynamicPropertiesPage:async({page},use)=>{
        const dynamicPropertiesPage = new DynamicProperties(page);
        use(dynamicPropertiesPage);
    }
})

export {expect} from '@playwright/test';