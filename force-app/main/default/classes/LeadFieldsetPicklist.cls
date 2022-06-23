/**
 * @description         This class defines a custom picklist datatype for the Web To Lead Lightning Component Configuration
 * @author              Chris Gary <me@cgary.com>
 * @version             1.0
 * @group               Configuration
 * @history             2022-06-15 - CJG - Created
 */
global class LeadFieldsetPicklist extends VisualEditor.DynamicPickList{
    /**
     * @description     method inherited from VisualEditor.DynamicPickList class - provides a default option
     */
    global override VisualEditor.DataRow getDefaultValue(){
        VisualEditor.DataRow defaultRow = new VisualEditor.DataRow('No Fieldsets Available','');
        List<String> picklistSet = getLeadFieldSetList();
        if(!picklistSet.isEmpty()){
            String firstValue = picklistSet[0];
            defaultRow = new VisualEditor.DataRow(firstValue,firstValue);
        }
        return defaultRow;
    }
    /**
     * @description     method inherited from VisuaEditor.DynamicPickList class - provides the entire list of options
     */
    global override VisualEditor.DynamicPickListRows getValues(){
        VisualEditor.DynamicPickListRows leadFieldSetRows = new VisualEditor.DynamicPickListRows();
        List<String> picklistSet = getLeadFieldSetList();
        if(!picklistSet.isEmpty()){
            for(String picklistVal:picklistSet){
                VisualEditor.DataRow picklistItem = new VisualEditor.DataRow(picklistVal,picklistVal);
                leadFieldSetRows.addRow(picklistItem);
            }
        }
        return leadFieldSetRows;
    }

    private List<String> getLeadFieldSetList(){
        List<String> fieldsetList = new List<String>();
        Map<String,Schema.FieldSet> fsMap = Lead.getSObjectType().getDescribe().fieldsets.getMap();
        if(!fsMap.isEmpty()){
            fieldsetList.addAll(fsMap.keySet());
        }
        return fieldsetList;
    }
}
