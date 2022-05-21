
describe('User Data Validation', () => {
    beforeEach(async() => {
        //** Launch Test URL **//
        await browser.url('https://www.way2automation.com/angularjs-protractor/webtables')   
        browser.maximizeWindow()
        // ** Verification of Title of the test URL ** //
        expect(browser).toHaveTitleContaining("Protractor practice website - WebTables")

    })
    it('Validate user has been added to the table', async() => {
        // ** Click on Add User button ** //
        const addUser = await $('button[type="add"]')
        await addUser.click()
        //** Verify Add User form is displayed ** //
        const addUserForm = await  $('h3[class="ng-binding"]')
        await expect(addUserForm).toHaveText('Add User')   

        const firstName = await $('input[name="FirstName"]')
        const lastName = await $('input[name="LastName"]')
        const userName = await $('input[name="UserName"]')
        const passWord = await $('input[name="Password"]')
        const customerA = await $('input[value="15"]')
        const roleId = await $('select[name="RoleId"]')
        const roleAdmin = await $('option[value="2"]')
        const email = await $('input[name="Email"]')
        const cellPhone = await $('input[name="Mobilephone"]')
        const saveButton = await $('.btn-success')

        // ** Add User Information ** //
        await firstName.setValue('Tela')
        await lastName.setValue('Doc')
        await userName.setValue('teladoc')
        await passWord.setValue('purchase')
        await customerA.click()
        await roleId.selectByVisibleText('Admin')
        await roleAdmin.click()
        await email.setValue('teladoc@gmail.com')
        await cellPhone.setValue('1234567890')
        await saveButton.waitForEnabled()
        await saveButton.click()

        //** Verify User has been added to the table** //
        await browser.pause(2000)
        const newUser = await $('/html/body/table/tbody/tr[1]/td[3]')
        await expect(newUser).toHaveTextContaining("teladoc")

    })
    it('Validate user has been deleted from the table', async() => {
        // ** Verify Username 'Novak' information is present in the table ** //
        const userNovak = await $('/html/body/table/tbody/tr[3]/td[3]')
        await expect(userNovak).toHaveTextContaining("novak")

        const userDelete = await $('/html/body/table/tbody/tr[3]/td[11]/button/i')
        await userDelete.click()
        const deleteConfirmation = await $('p[class="ng-binding"]')
        await expect(deleteConfirmation).toHaveText('Do you really want to delete the user?')  
        const okButton = await $('/html/body/div[3]/div[3]/button[2]')
        // ** Confirm and dlelete the user data from the table ** //
        await okButton.click()
        await browser.pause(2000)
        await expect(userNovak).not.toHaveText('novak')
    })
    
});
