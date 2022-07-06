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
    @api disablementField;
    @api submitLabel;
    @api optionalMessage;
    @api returnUri;
    @api formTitle;
    exlcusionOn;
    @track leadPrimarySectionFieldList;
    @track leadAdditionalSectionFieldList;
    @track leadExclusionFieldList;

    @wire(obtainFieldNameList,{'fieldsetName':'$primarySectionFieldset'})
    processLeadPrimarySectionFieldList({err, data}){
        window.console.dir(data);      
        if(data){
            this.leadPrimarySectionFieldList = {'data':JSON.parse(JSON.stringify(data))};
        }  
    }
    
    @wire(obtainFieldNameList,{'fieldsetName':'$additionalSectionFieldset'})
    processLeadAdditionalSectionFieldList({err, data}){
        if(data){
            this.leadAdditionalSectionFieldList = {'data':JSON.parse(JSON.stringify(data))};
        }
    }
    
    @wire(obtainFieldNameList,{'fieldsetName':'$disablementFieldset'})
    processLeadExclusionFieldList({err, data}){
        if(data){
            this.leadExclusionFieldList = {'data':JSON.parse(JSON.stringify(data))};
        }
    }
    
    /**
     * Method will handle when a field changes to determine if that fields triggers the
     * disablement of other fields.
     * @param {Event} evt 
     */
    handleFieldChange(evt){
        var fieldElement = evt.target.fieldName.toLowerCase();
        var fieldValue = evt.detail;
        if( this.hasExclusionFieldList && fieldElement == this.disablementField.toLowerCase()){
            const exclusionFieldList = this.leadExclusionFieldList.data;
            const additionalFieldList = this.leadAdditionalSectionFieldList.data;
            var data = additionalFieldList.map((fieldItem) => {
                let {label, apiName, required} = fieldItem;
                let foundIndex = exclusionFieldList.findIndex(item => item.apiName === apiName);
                if(foundIndex > -1){
                    window.console.log('Found %s in exclusion Field List: %s',apiName, foundIndex);
                    required = (fieldValue.checked || fieldValue.value ==='Yes' ? true:false);
                }
                return {label, apiName, required};
            });
            window.console.log('Data after remapping: %s',JSON.stringify(data,null,"\t"));
            this.leadAdditionalSectionFieldList = { data };
            window.console.dir(this.additionalSectionFieldList);
        } else {
            window.console.log('When running the disable test, it returned false. hasExclusionFieldList: %s. fieldElement: %s, selectedField element: %s',this.hasExclusionFieldList,this.disablementField, fieldElement);
            window.console.log(JSON.stringify(this.leadExclusionFieldList,null,"\t"));
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

    get hasExclusionFieldList(){
        if(typeof(this.leadExclusionFieldList)!=='undefined' && typeof(this.leadExclusionFieldList.data)!=='undefined'){
            return true;
        }
        return false;
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