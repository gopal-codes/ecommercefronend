
var email= "";

const setemail=(value)=>{
    email=value
    console.log(email)
}

const getemail=()=>{
    return email
}

export {setemail,getemail}