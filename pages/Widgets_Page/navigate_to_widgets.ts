import {Page} from '@playwright/test';

class Widgets{
    private page:Page;
    private widgets:string;
    private accordian:string;
    private autocomplete:string;
    private datepicker:string;
    private slider:string;
    private progressbar:string;
    private tabs:string;
    private tooltip:string;
    private menu:string;
    private selectmenu:string;
    constructor(page:Page){
        this.page = page;
        this.autocomplete='//*[@class="element-group"][4]//li[2]';
        this.accordian='//*[@class="element-group"][4]//li[1]';
        this.widgets='//*[@class="category-cards"]/div[4]';
        this.datepicker='//*[@class="element-group"][4]//li[3]';
        this.slider='//*[@class="element-group"][4]//li[4]';
        this.progressbar='//*[@class="element-group"][4]//li[5]';
        this.tabs='//*[@class="element-group"][4]//li[6]';
        this.tooltip='//*[@class="element-group"][4]//li[7]';
        this.menu='//*[@class="element-group"][4]//li[8]';
        this.selectmenu='//*[@class="element-group"][4]//li[9]';
    }

    async naivigateToWidgetsPage(){
        try{
            await this.page.locator(this.widgets).click();
            const url = await this.page.url();
            if(url.includes('widgets')){
                console.log('Navigation to Widgets page, successfull!');
            }else{
                throw new Error('Navigation to Widgets page, unsuccessfull!')
            }
        }catch(err){
            console.log(err);
        }
    }

    async navigateToAccordian(){
        try{
            const flag = await this.page.locator(this.accordian).isVisible();
            if(flag){
                await this.page.locator(this.accordian).click();
                console.log('Navigation to accordian page, successfull!');
            }else{
                throw new Error('Accordian not visible');
            }
        }catch(err){
            console.log('Navigation to accordian page, unsuccessfull!',err);
        }
    }

    async navigateToAutoComplete(){
        try{
            const flag = await this.page.locator(this.autocomplete).isVisible();
            if(flag){
                await this.page.locator(this.autocomplete).click();
                console.log('Navigation to auto complete page, successfull!');
            }else{
                throw new Error('Auto complete not visible');
            }
        }catch(err){
            console.log('Navigation to auto complete page, unsuccessfull!',err);
        }
    }

    async navigateToDatePicker(){
        try{
            const flag = await this.page.locator(this.datepicker).isVisible();
            if(flag){
                await this.page.locator(this.datepicker).click();
                console.log('Navigation to date picker page, successfull!');
            }else{
                throw new Error('date picker not visible');
            }
        }catch(err){
            console.log('Navigation to date picker page, unsuccessfull!',err);
        }
    }

    async navigateToSlider(){
        try{
            const flag = await this.page.locator(this.slider).isVisible();
            if(flag){
                await this.page.locator(this.slider).click();
                console.log('Navigation to slider page, successfull!');
            }else{
                throw new Error('slider page not visible');
            }
        }catch(err){
            console.log('Navigation to slider page, unsuccessfull!',err);
        }
    }

    async navigateToPorgressBar(){
        try{
            const flag = await this.page.locator(this.progressbar).isVisible();
            if(flag){
                await this.page.locator(this.progressbar).click();
                console.log('Navigation to progress bar page, successfull!');
            }else{
                throw new Error('progress bar page not visible');
            }
        }catch(err){
            console.log('Navigation to progress bar page, unsuccessfull!',err);
        }
    }

    async navigateToTabs(){
        try{
            const flag = await this.page.locator(this.tabs).isVisible();
            if(flag){
                await this.page.locator(this.tabs).click();
                console.log('Navigation to tabs page, successfull!');
            }else{
                throw new Error('tabs page not visible');
            }
        }catch(err){
            console.log('Navigation to tabs page, unsuccessfull!',err);
        }
    }

    async navigateToToolTip(){
        try{
            const flag = await this.page.locator(this.tooltip).isVisible();
            if(flag){
                await this.page.locator(this.tooltip).click();
                console.log('Navigation to tool tip page, successfull!');
            }else{
                throw new Error('tool tip page not visible');
            }
        }catch(err){
            console.log('Navigation to tool tip page, unsuccessfull!',err);
        }
    }

    async navigateToMenu(){
        try{
            const flag = await this.page.locator(this.menu).isVisible();
            if(flag){
                await this.page.locator(this.menu).click();
                console.log('Navigation to menu page, successfull!');
            }else{
                throw new Error('menu page not visible');
            }
        }catch(err){
            console.log('Navigation to menu page, unsuccessfull!',err);
        }
    }

    async navigateToSelectMenu(){
        try{
            const flag = await this.page.locator(this.selectmenu).isVisible();
            if(flag){
                await this.page.locator(this.selectmenu).click();
                console.log('Navigation to select menu page, successfull!');
            }else{
                throw new Error('select menu page not visible');
            }
        }catch(err){
            console.log('Navigation to select menu page, unsuccessfull!',err);
        }
    }

    

}export{Widgets}