import { LightningElement, api, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import OBJ_LEAD from '@salesforce/schema/Lead';
import obtainFieldNameList from '@salesforce/apex/WebToLeadService.obtainFieldNameList';

export default class WebToLead extends NavigationMixin(LightningElement) {
    @api primarySectionName;
    @api primarySectionFieldset;
    @api additionalSectionName;
    @api additionalSectionFieldset;
    @api disablementFieldset;
    @api submitLabel;
    @api optionalMessage;
    @api returnUri;
    @api formTitle;
    exlcusionOn;
    @track leadPrimarySectionFieldList;
    @track leadAdditionalSectionFieldList;
    leadExclusionFieldList;

    @wire(obtainFieldNameList,{'fieldsetName':'$primarySectionFieldset'})
    processLeadPrimarySectionFieldList(response){
        this.leadPrimarySectionFieldList = JSON.parse(JSON.stringify(response));
    }
    
    @wire(obtainFieldNameList,{'fieldsetName':'$additionalSectionFieldset'})
    processLeadAdditionalSectionFieldList(response){
        this.leadAdditionalSectionFieldList = JSON.parse(JSON.stringify(response));
    }
    
    @wire(obtainFieldNameList,{'fieldsetName':'$disablementFieldset'})
    processLeadExclusionFieldList(response){
        this.leadExclusionFieldList = JSON.parse(JSON.stringify(response));
    }
    
    /**
     * Method will handle when a field changes to determine if that fields triggers the
     * disablement of other fields.
     * @param {Event} evt 
     */
    handleFieldChange(evt){
        //window.console.log('Event Info from field: %s',JSON.stringify(evt.detail,null,"\t"));
        var fieldElement = evt.target.fieldName;
        var fieldValue = evt.detail;
        if(typeof(this.leadExclusionFieldList)!=='undefined' && typeof(this.leadExclusionFieldList.data)!=='undefined' &&
                fieldElement === 'Use_Same_Address__c'){
            const exclusionFieldList = this.leadExclusionFieldList.data;
            const additionalFieldList = this.leadAdditionalSectionFieldList.data;
            var tempArray = additionalFieldList.map((fieldItem) => {
                let {label, apiName, required} = fieldItem;
                let foundIndex = exclusionFieldList.findIndex(item => item.apiName === apiName);
                if(foundIndex > -1){
                    window.console.log('Found %s in exclusion Field List: %s',apiName, foundIndex);
                    required = fieldValue.checked;
                }
                return {'label':label, 'apiName':apiName, 'required':required};
            });
            this.leadAdditionalSectionFieldList = {'data':tempArray};
            window.console.dir(this.additionalSectionFieldList);
        }
    }
    /**
     * Redirects user to a URL once the Lead creation is succcessful
     * @param {Event} evt
     */
    handleFormSuccess(evt){
        var successLocation = {
            'type': 'standard__webPage',
            'attributes': {
                'url': this.returnUri
            }
        };
        this[NavigationMixin.Navigate](successLocation);
    }

    handleButtonSubmit(){
        window.console.log('Submit button pressed.');
    }

    get hasPrimarySectionFieldList(){
        if(typeof(this.leadPrimarySectionFieldList)!=='undefined' && typeof(this.leadPrimarySectionFieldList.data)!=='undefined'){
            return true;
        }
        return false;
    }

    get primarySectionFieldList(){
        if(this.hasPrimarySectionFieldList){
            return this.leadPrimarySectionFieldList.data;
        }
        return [];
    }

    get hasAdditionalSectionFieldList(){
        if(typeof(this.leadAdditionalSectionFieldList)!=='undefined' && typeof(this.leadAdditionalSectionFieldList.data)!=='undefined'){
            return true;
        }
        return false;
    }
    
    get additionalSectionFieldList(){
        if(this.hasAdditionalSectionFieldList){
            return this.leadAdditionalSectionFieldList.data;
        }
        return [];
    }

    get hasOptionalMessage(){
        if(typeof(this.optionalMessage)!=='undefined' && this.optionalMessage.length > 0){
            return true;
        }
        return false;
    }

    get newObjectName(){
        return OBJ_LEAD.objectApiName;
    }
}