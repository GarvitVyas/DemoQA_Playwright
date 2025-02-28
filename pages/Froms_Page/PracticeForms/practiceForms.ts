import {Page} from '@playwright/test';
import { ElementActions } from '../../data/utils/action_utils';
import path from 'path';
import { data } from '../../data/data';
class PracticeForm{

    private page:Page;
    private elementActions:ElementActions;
    private formsTitle:string;
    private firstName : string;
    private lastName:string;
    private email:string;
    private genderLabels:string;
    private genderMale:string;
    private genderFemale:string;
    private genderOther:string;
    private mobileNumber:string;
    private dob:string;
    private subjects:string;
    private hobbiesLabel:string;
    private sportHobbie:string;
    private readingHobbie:string;
    private musicHobbie:string;
    private pictureUpload:string;
    private currentAddress:string;
    private selectState:string;
    private selectCity:string;
    private submitBTN:string;
    private statelist:string;
    private citylist:string;
    private calender:string;
    private resultScreen:string;
    private closeResultScreen:string;
    private calenderDetails:{[key:string]:string};

    constructor(page:Page){
        this.page = page;
        this.elementActions= new ElementActions;
        this.email='#userEmail';
        this.resultScreen='.modal-content';
        this.calender='.react-datepicker';
        this.genderMale='//*[@id="gender-radio-1"]';
        this.genderFemale='//*[@id="gender-radio-2"]';
        this.genderOther='//*[@id="gender-radio-3"]';
        this.genderLabels='#genterWrapper>.col-md-9.col-sm-12>div';
        this.firstName='#firstName';
        this.lastName='#lastName'
        this.formsTitle='div>h5';
        this.mobileNumber='//*[@id="userNumber"]';
        this.dob='#dateOfBirthInput';
        this.subjects='#subjectsInput'; //suggestion list
        this.hobbiesLabel='//*[@id="hobbiesWrapper"]/div[2]/div'; //check boxes
        this.sportHobbie='Sports';//value 1
        this.readingHobbie='Reading';// value 2
        this.musicHobbie='Music'; // value 3
        this.pictureUpload='//*[@id="uploadPicture"]';
        this.currentAddress='//*[@id="currentAddress"]';
        this.selectState='//*[@class=" css-1hwfws3"]'; 
        this.statelist = '//div[contains(@class,"-menu")]';
        this.selectCity='//*[@class=" css-1hwfws3"]'; //enabled after selecting state
        this.citylist = '//div[contains(@class,"-menu")]';
        this.submitBTN='//*[@id="submit"]';
        this.closeResultScreen='#closeLargeModal';
        this.calenderDetails={
            'next_month':'//button[text()="Next Month"]',
            'previous_month':'//button[text()="Previous Month"]',
            'month_list':'.react-datepicker__month-select',
            'year_list':'.react-datepicker__year-select',
            'date':'//*[@class="react-datepicker__month"]//div',
            'header':'//*[@class="react-datepicker__header"]/div[1]'
        }
    }

    async verifyPracticeForm(){
        return await this.page.url();
    }
    async verifyFormTitle(){
        return await this.page.locator(this.formsTitle).innerText();
    }

    async verifyFeilds(){
        return {
            'First name': await this.page.locator(this.firstName),
            'Last name': await this.page.locator(this.lastName),
            'email' : await this.page.locator(this.email),
            'male_gender':await this.page.locator(this.genderMale),
            'female_gender':await this.page.locator(this.genderFemale),
            'other_gender':await this.page.locator(this.genderOther),
            'mobile':await this.page.locator(this.mobileNumber),
            'date of birth':await this.page.locator(this.dob),
            'sport_hobbie': await this.page.locator(this.hobbiesLabel).nth(0),
            'reading_hobbie':await this.page.locator(this.hobbiesLabel).nth(1),
            'music_hobbie':await this.page.locator(this.hobbiesLabel).nth(2),
            'current_address':await this.page.locator(this.currentAddress),
            'state':await this.page.locator('//*[@class=" css-1hwfws3"]//div[1]').first(),
            'city':await this.page.locator('//*[@class=" css-1hwfws3"]//div[1]').nth(3)
        }
    }

    async currentDate(){
        return await this.elementActions.dateFormat();
    }

    //fill name
    async fillName(fname:string,lname:string){
        const firstname=await this.page.locator(this.firstName)
        await firstname.fill(fname);
        const lastname=await this.page.locator(this.lastName)
        await lastname.fill(lname);
        return [firstname,lastname];
    }

    async nameFields(){
        const firstname=await this.page.locator(this.firstName);
        const lastname=await this.page.locator(this.lastName);
        return [firstname,lastname];
    }

    async fillEmail(email:string){
        const emailId = await this.page.locator(this.email)
        await emailId.fill(email);
        return emailId;
    }

    async fillGender(value:'male'|'Male'|'female'|'Female'|'Other'|'other'){
        let male = await this.page.getByText('Male').nth(1);
        const female = await this.page.getByText('Female');
        const others = await this.page.getByText('Other');
        if(value == 'male' || value == 'Male'){
            await male.click();
        }else if(value == 'female' || value == 'Female'){   
            await female.click();
        }else if(value == 'other' || value == "Other"){
            await others.click(); 
        }
        
    }
    async genders(){
        let male = await this.page.getByText('Male').nth(1);
        const female = await this.page.getByText('Female');
        const others = await this.page.getByText('Other');
        return [male,female,others];
    }

    async fillNumber(number:string){
        const moilenumber = await this.page.locator(this.mobileNumber);
        await moilenumber.fill(number);
        
    }

    async mobile(){
        const moilenumber = await this.page.locator(this.mobileNumber);
        return moilenumber;
    }

    async fillDOB(){
        await this.page.locator(this.dob).click();
        const calender = await this.page.locator(this.calender).isVisible();
        if(calender){
            await this.page.locator(this.calenderDetails['month_list']).selectOption({value:'10'});
            await this.page.locator(this.calenderDetails['year_list']).selectOption({value:'1998'}); 
            const dates = await this.page.locator('//*[@class="react-datepicker__month"]/div[4]/div').all();
            
            for(let i =0;i<dates.length;i++){
                const temp = await dates[i].textContent();
                if(temp == '25'){
                    await dates[i].click();
                    break;
                }
            }
        }else{throw new Error('Calender not visible!');}
    }

    async fillSubject(){
        const sub = await this.page.locator(this.subjects);
        await sub.fill('c');
        await this.page.waitForSelector('//div[contains(@class,"-menu")]');
        const chem = await this.page.getByText('chemistry');

        if(await chem.isVisible()){
            await chem.click();
        }else{
            throw new Error('Subject suggestion list not available');
        }
        return sub;
    }

    async fillHobbies(){
        const reading = await this.page.getByText(this.readingHobbie);
        await reading.check();
        if(!await reading.isChecked()){
            throw new Error('Issue with selecting reading hobbie');
        }
        const sports = await this.page.getByText(this.sportHobbie);
        await sports.check();
        if(!await sports.isChecked()){
            throw new Error('Issue with selecting sports hobbie');
        }
    }

    async uploadImage(){
        const input = await this.page.locator(this.pictureUpload);
        const file = path.resolve('pages/data/Image/download.png');
        await input.setInputFiles(file);
        return input;
    }

    async fillCurrentAddress(){
        const cA = await this.page.locator(this.currentAddress);
        await cA.fill(data['current-address']);
        if(await cA.inputValue() == 'null'){
            throw new Error('Issue with current address');
        }
    }

    async fillStateAndCity(){
        const flagState = await this.page.locator(this.selectState).first();
        await flagState.click();
        await this.page.waitForSelector(this.statelist);
        await this.page.getByText('Rajasthan').click();
        
        const city = await this.page.locator(this.selectCity).nth(1);
        if(await city.isEditable()){
            await city.click();
            await this.page.waitForSelector(this.citylist);
            await this.page.getByText('Jaipur',{exact:true}).click();
        }
    }

    async actionSubmit(){
        await this.page.locator(this.submitBTN,{hasText:'Submit'}).click();
    }

    async verifyResultScreen():Promise<boolean>{
        const screen = await this.page.locator(this.resultScreen);
        return await this.elementActions.visibilityCheck(screen);
    }

    async resultData(){
        const details:{[key:string]:string}={};
        const labels = await this.page.locator('tbody>tr>td:nth-child(1)').allTextContents();
        const values = await this.page.locator('tbody>tr>td:nth-child(2)').allTextContents();

        labels.forEach((key,val)=>{
            details[key] = values[val]
        })

        return details;
    }

    async closeResult(){
        const flag = await this.elementActions.visibilityCheck(this.page.locator(this.closeResultScreen));
        if(flag){
            await this.page.locator(this.closeResultScreen,{hasText:'Close'}).click();
        }
    }
}export{PracticeForm};
