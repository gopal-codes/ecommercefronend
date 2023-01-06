const ValidationSellProduct = (value)=>{

    let errors = {};

    if(!value.catogories){
        errors.catogories="CATOGORIES IS REQUIRED"
    }
    if(!value.title){
        errors.title="TITLE IS REQUIRED"
    }else if(value.title.length<3){
        errors.title="SELECT PROPER TITLE."
    }
    if(!value.description){
        errors.description="DESCRIPTION IS REQUIRED"
    }else if(value.description.length<20){
        errors.description="USE MORE WORD TO DESCRIBE."
    }
    if(!value.price){
        errors.price="PRICE IS REQIRED"
    }else if(value.price<1){
        errors.price="PRICE MUST BE GREATER THAN ONE."
    }

    return errors;

}
export default ValidationSellProduct;