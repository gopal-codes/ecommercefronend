import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const infotoast= (text)=>{
    toast.info(text, {autoClose:3000, position:"top-center"})
}

const errortoast= (text)=>{
    toast.error(text, {autoClose:2500, position:"top-center"})
}

const successtoast= (text)=>{
    toast.success(text, {autoClose:2500, position:"bottom-right"})
}
const warntoast= (text)=>{
    toast.warn(text, {autoClose:2500, position:"bottom-right"})
}

export {infotoast, errortoast,successtoast,warntoast}
