/**
 * @description             Class that exposes methods to be used in the Web To Lead Lightning Component.
 *                          All exposed methods here should be static
 * @author                  Chris Gary <me@cgary.com>
 * @version                 1.0
 * @group                   Services
 * @history                 2022-06-15 - CJG - Created
 */
public with sharing class WebToLeadService {
    public class FieldInfo {
        @AuraEnabled
        public String label { get; set; }
        @AuraEnabled
        public String apiName { get; set; }
        @AuraEnabled
        public Boolean required { get; set; } 

        public FieldInfo(){}
        public FieldInfo(String labelIn, String apiNameIn, Boolean requiredIn){
            this.label = labelIn;
            this.apiName = apiNameIn;
            this.required = requiredIn;
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<FieldInfo> obtainFieldNameList(String fieldsetName){
        List<FieldInfo> fieldNameList = new List<FieldInfo>();
        try {
            if(String.isBlank(fieldSetName)){
                throw new IllegalArgumentException('fieldSetName cannot be blank');
            }
            Schema.FieldSet fieldsetMap = Lead.getSObjectType().getDescribe().fieldsets.getMap()
                .get(fieldsetName);
            if(fieldsetMap != null){
                for(Schema.FieldSetMember fieldsetMember:fieldsetMap.fields){
                    FieldInfo fldData = new FieldInfo(fieldsetMember.getLabel(),fieldsetMember.getSObjectField().getDescribe().getName(),false);
                    fieldNameList.add(fldData);
                }
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return fieldNameList;
    }
}
