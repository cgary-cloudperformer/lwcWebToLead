/**
 * @description             This class defines a custom picklist datatype for the Web to Lead Lightning Component Confguration
 * @author                  Chris Gary <me@cgary.com>
 * @version                 1.0
 * @group                   Configuration
 * @history                 2022-07-02 - CJG - Created
 */
global class LeadFieldPicklist extends VisualEditor.DynamicPickList{

    global override VisualEditor.DataRow getDefaultValue(){
        VisualEditor.DataRow defaultRow = new VisualEditor.DataRow('No Fields Available','');
        List<String> fieldNameList = getFieldApiNames();
        if(!fieldNameList.isEmpty()){
            String firstValue = fieldNameList[0];
            defaultRow = new VisualEditor.DataRow(firstValue,firstValue);
        }
        return defaultRow;
    }

    global override VisualEditor.DynamicPickListRows getValues(){
        VisualEditor.DynamicPickListRows leadFieldRows = new VisualEditor.DynamicPickListRows();
        List<String> fieldNameList = getFieldApiNames();
        if(!fieldNameList.isEmpty()){
            for(String fieldName:fieldNameList){
                VisualEditor.DataRow row = new VisualEditor.DataRow(fieldName,fieldName);
                leadFieldRows.addRow(row);
            }
        }
        return leadFieldRows;
    }

    private List<String> getFieldApiNames(){
        List<String> fieldNameList = new List<String>();
        Map<String, Schema.SObjectField> fieldMap = Schema.SObjectType.Lead.fields.getMap();
        if(!fieldMap.isEmpty()){
            fieldNameList.addAll(fieldMap.keySet());
        }
        return fieldNameList;
    }
}
