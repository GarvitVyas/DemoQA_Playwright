import {Page} from '@playwright/test';
import { ElementActions } from '../../data/utils/action_utils';

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
    private calender:string;
    private calenderDetails:{[key:string]:string};

    constructor(page:Page){
        this.page = page;
        this.elementActions= new ElementActions;
        this.email='#userEmail';
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
        this.sportHobbie='//*[@id="hobbies-checkbox-1"]';//value 1
        this.readingHobbie='//*[@id="hobbies-checkbox-2"]';// value 2
        this.musicHobbie='//*[@id="hobbies-checkbox-3"]'; // value 3
        this.pictureUpload='//*[@id="uploadPicture"]';
        this.currentAddress='//*[@id="currentAddress"]';
        this.selectState='//*[@id="react-select-3-input"]'; // suggestion list after clicking on input field
        this.selectCity='//*[@id="react-select-4-input"]'; //enabled after selecting state
        this.submitBTN='//*[@id="submit"]';
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
        await this.page.locator(this.firstName).fill(fname);
        await this.page.locator(this.lastName).fill(lname);
    }
    async fillEmail(email:string){
        await this.page.locator(this.email).fill(email);
    }

    async fillGender(value:'male'|'Male'|'female'|'Female'|'Other'|'other'){
        if(value == 'male' || value == 'Male'){
            await this.page.getByText('Male').nth(1).click();
        }else if(value == 'female' || value == 'Female'){
            await this.page.getByText('Female').click();
        }else if(value == 'other' || value == "Other"){
            await this.page.getByText('Other').click(); 
        }
    }

    async fillNumber(number:string){
        await this.page.locator(this.mobileNumber).fill(number);
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


}

export{PracticeForm};