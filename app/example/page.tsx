"use client";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { isInteger } from 'mathjs';
import { db, ref, set, get } from "./firebase";
import { update } from 'firebase/database';
import test from 'node:test';

export default function exam(){
    const[enters,setEnters]=useState(true);
    const[gmail,setGmail]=useState('');
    const[password,setPassword]=useState('');
    const[name,setName]=useState('');
    const click=()=>{
        const EnteredName=prompt("enter your name:")?.trim().toLocaleLowerCase();
        const userRef=ref(db,'users/',gmail.replace('.','_'),'/wallet');
        set(userRef,{
            name:EnteredName
        }).then(()=>{
            console.log('تم تسجيل الاسم بنجاح');
        }).catch((error)=>{
            console.log(error);
        })

        
        
        console.log(name);
        const arr=['محمد','احمد','سعيد'];
        const includeKeyWords=((keyWords)=>keyWords.some((word)=>EnteredName?.includes(word)));
        console.log(includeKeyWords(arr));
    }
    
    const enterInMainPage=()=>{
        setEnters(false);
        toast.error('error');
        toast.info("هذا تنبيه باللون الأزرق");
    }

    const fetch=()=>{
        const balancedRef=ref(db,'users/',gmail.replace('.','_'),+'/wallet');
        get(balancedRef).then((snapshot)=>{
            if(snapshot.exists()){
                const data=snapshot.val();
                setName(data.name);
                console.log(data.name);
            }
        })
    }
    return(
        <>
        <ToastContainer
        className={style.decorateToast}
        theme="colored"
        />
            {enters && <div className={style.enter}>
                <input type="gmail" value={gmail} onChange={e=>setGmail(e.target.value)}/>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                <button className={style.pass} onClick={enterInMainPage}>تسجيل الدخول</button>
                </div>}   
                <button onClick={fetch}>تحديث البيانات</button>

        <div onClick={click}>fun</div>
        </>
    )
}