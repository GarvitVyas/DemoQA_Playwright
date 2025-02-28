import {test,expect} from '../base';
import { data, staticUser } from '../pages/data/data';

test.describe('@PracticeForm - test to verify the practice automation form',()=>{

    test.beforeEach(async({page})=>{
        try{
            await page.goto('/',{waitUntil:'domcontentloaded'});
            //await page.waitForLoadState('load');
        }catch(err){
            console.error('Error during page load: ', err);
            throw new Error('Issue with before each block of practice form class');
        }
    })

    test('@validateFields - validate form fields',async({formsPage,practiceFormPage})=>{
        await formsPage.navigateToForms();
        await formsPage.navigateToPracticeFormsPage();

        expect(await practiceFormPage.verifyPracticeForm()).toContain(data['practice form page']);
        expect(await practiceFormPage.verifyFormTitle()).toBe(data['froms title']);

        const fields = await practiceFormPage.verifyFeilds();
        await expect(fields['First name']).toHaveAttribute('placeholder','First Name');
        await expect(fields['Last name']).toHaveAttribute('placeholder','Last Name');
        await expect(fields['email']).toHaveAttribute('placeholder','name@example.com');
        await expect(fields['male_gender']).toHaveValue('Male');
        await expect(fields['female_gender']).toHaveValue('Female');
        await expect(fields['other_gender']).toHaveValue('Other');
        await expect(fields['mobile']).toHaveAttribute('placeholder','Mobile Number');
        //verify dob value as current date
        const currentDate = await practiceFormPage.currentDate();
        await expect(fields['date of birth']).toHaveValue(currentDate);
        //hobbies
        expect(await fields['sport_hobbie'].innerText()).toBe('Sports');
        expect(await fields['reading_hobbie'].innerText()).toBe('Reading');
        expect(await fields['music_hobbie'].innerText()).toBe('Music');
        //current address
        await expect(fields['current_address']).toHaveAttribute('placeholder','Current Address');
        //state
        expect(await fields['state'].innerText()).toBe('Select State');
        expect(await fields['city'].innerText()).toBe('Select City');
    })

    test('@fillFormData - verify the practice form after filling data',async({formsPage,practiceFormPage})=>{
        await formsPage.navigateToForms();
        await formsPage.navigateToPracticeFormsPage();

        expect(await practiceFormPage.verifyPracticeForm()).toContain(data['practice form page']);
        expect(await practiceFormPage.verifyFormTitle()).toBe(data['froms title']);

        await practiceFormPage.fillName(staticUser['First Name'],staticUser['last Name']);
        await practiceFormPage.fillEmail(staticUser['Email']);
        //gender
        await practiceFormPage.fillGender('Female');
        //mobile
        await practiceFormPage.fillNumber(data['mobile']);
        //dob
        await practiceFormPage.fillDOB();
        //Subject
        await practiceFormPage.fillSubject();
        //hobbie
        await practiceFormPage.fillHobbies();
        //upload image
        await practiceFormPage.uploadImage();
        //current address
        await practiceFormPage.fillCurrentAddress();
        //state and city
        await practiceFormPage.fillStateAndCity();
        await practiceFormPage.actionSubmit();
        expect(await practiceFormPage.verifyResultScreen()).toBeTruthy();

        const resultData = await practiceFormPage.resultData();
        expect(resultData['Student Name']).toBe(staticUser['First Name']+' '+staticUser['last Name']);
        expect(resultData['Student Email']).toBe(staticUser['Email']);
        expect(resultData['Gender']).toBe('Female');
        expect(resultData['Mobile']).toBe(data['mobile']);
        expect(resultData['Date of Birth']).toBe('25 November,1998');
        expect(resultData['Subjects']).toBe('Chemistry');
        expect(resultData['Hobbies']).toContain('Reading');
        expect(resultData['Hobbies']).toContain('Sports');
        expect(resultData['Picture']).toBe('download.png');
        expect(resultData['Address']).toBe(data['current-address']);
        expect(resultData['State and City']).toContain('Rajasthan');
        expect(resultData['State and City']).toContain('Jaipur');
    })

    test('@emptyAfterSubmit - verify after submit the form and closing the form window, refresh the fields',async({formsPage,practiceFormPage})=>{
        await formsPage.navigateToForms();
        await formsPage.navigateToPracticeFormsPage();
        expect(await practiceFormPage.verifyPracticeForm()).toContain(data['practice form page']);
        expect(await practiceFormPage.verifyFormTitle()).toBe(data['froms title']);
        await practiceFormPage.fillName(staticUser['First Name'],staticUser['last Name']);
        await practiceFormPage.fillEmail(staticUser['Email']);
        await practiceFormPage.fillGender('Female');
        await practiceFormPage.fillNumber(data['mobile']);
        await practiceFormPage.fillDOB();
        await practiceFormPage.fillSubject();
        await practiceFormPage.fillHobbies();
        await practiceFormPage.uploadImage();
        await practiceFormPage.fillCurrentAddress();
        await practiceFormPage.fillStateAndCity();
        await practiceFormPage.actionSubmit();
        expect(await practiceFormPage.verifyResultScreen()).toBeTruthy();
        
        await practiceFormPage.closeResult();

        const name = await practiceFormPage.nameFields();
        expect(await name[0]).toBeEmpty();
        expect(await name[1]).toBeEmpty();

        const gender = await practiceFormPage.genders();
        expect(await gender[0]).not.toBeChecked();
        expect(await gender[1]).not.toBeChecked();
        expect(await gender[2]).not.toBeChecked();

        const mobile = await practiceFormPage.mobile();
        expect(await mobile).toBeEmpty();
    })

})