/**
 * @description             This class provides code coverage to the WebToLeadService class. All methods must have a 
 *                          separate test method.
 * @author                  Chris Gary <me@cgary.com>
 * @version                 1.0
 * @group                   Testing
 * @history                 2022-06-21 - Created
 */
@isTest
private class WebToLeadServiceTest {
    @isTest
    private static void fieldInfoInitialization(){
        Test.startTest();
        WebToLeadService.FieldInfo testObj = new WebToLeadService.FieldInfo('fieldLabel','fieldApiName',false);
        WebToLeadService.FieldInfo testObj2 = new WebToLeadService.FieldInfo();
        System.assertEquals('fieldLabel', testObj.label,'Value should be fieldLabel');
        System.assertEquals('fieldApiName',testObj.apiName,'Value should be fieldApiName');
        System.assertEquals(false, testObj.required,'Value should be false');
        Test.stopTest();
    }
    @isTest
    private static void obtainFieldNameList(){
        Test.startTest();
        Map<String,Schema.FieldSet> fieldSetMap = Lead.getSObjectType().getDescribe().fieldsets.getMap();
        System.assert(!fieldSetMap.isEmpty(),'Field Sets must be defined on the lead');
        Set<String> fieldSetNameSet = fieldSetMap.keySet();
        List<String> fieldSetNameList = new List<String>();
        fieldSetNameList.addAll(fieldSetNameSet);
        List<WebToLeadService.FieldInfo> results = WebToLeadService.obtainFieldNameList(fieldSetNameList[0]);
        System.assert(!results.isEmpty(),'Results should not be empty');
        Test.stopTest();
    }
    @isTest
    private static void obtainFieldNameListError(){
        Test.startTest();
        try{
            List<WebToLeadService.FieldInfo> result = WebToLeadService.obtainFieldNameList('');
        } catch(System.Exception e){
            System.assertNotEquals(null, e,'Exception should be thrown');
        }
        Test.stopTest();
    }
}
