@isTest
private class LeadFieldsetPicklistTest {
    @isTest
    private static void getDefaultValue(){
        Test.startTest();
        LeadFieldsetPicklist obj = new LeadFieldsetPicklist();
        VisualEditor.DataRow result = obj.getDefaultValue();
        System.assertNotEquals(null, result,'Result cannot be null');
        Test.stopTest();
    }
    @isTest
    private static void getValues(){
        Test.startTest();
        LeadFieldsetPicklist obj = new LeadFieldsetPicklist();
        VisualEditor.DynamicPickListRows result = obj.getValues();
        System.assertNotEquals(null, result,'Result cannot be null');
        Test.stopTest();
    }
}
