
var token= "";
var rtoken="";

const setToken=(value)=>{
    token=value
    console.log(token)
}

const setRefreshToken=(value)=>{
    rtoken=value
    console.log(rtoken)
}

const getToken=()=>{
    return token
}
const getRefreshToken=()=>{
    return rtoken
}

export {setToken,setRefreshToken,getToken,getRefreshToken}