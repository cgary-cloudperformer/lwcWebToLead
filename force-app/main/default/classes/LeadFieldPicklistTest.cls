/**
 * @description             This class provides code coveragte to the Lead Field Picklist Class
 * @author                  Chris Gary <me@cgary.com>
 * @version                 1.0
 * @group                   Testing
 * @history                 2022-07-01 - CJG - Created
 */
@isTest
private class LeadFieldPicklistTest {
    @isTest
    private static void getDefaultValue(){
        Test.startTest();
        LeadFieldPicklist testClass = new LeadFieldPicklist();
        VisualEditor.DataRow testResult = testClass.getDefaultValue();
        System.assertNotEquals(null, testResult,'The result should not be null.');
        Test.stopTest();
    }
    @isTest
    private static void getValues() {
        Test.startTest();
        LeadFieldPicklist testClass = new LeadFieldPicklist();
        VisualEditor.DynamicPickListRows testResult = testClass.getValues();
        System.assertNotEquals(null, testResult,'The result should not be null.');
        Test.stopTest();
    }
}
