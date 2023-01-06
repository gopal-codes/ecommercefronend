const Validation = (value)=>{

    let errors = {};

    if(!value.name){
        errors.name="Name is Required"
    }
    if(!value.email){
        errors.email="Email is Required"
    }else if(!/\S+@\S+.\S+/.test(value.email)){
        errors.email="Email is Invalid."
    }
    if(!value.password){
        errors.password="Password is Required"
    }else if(value.password.length<5){
        errors.password="Use more than five characters."
    }

    return errors;

}
export default Validation;