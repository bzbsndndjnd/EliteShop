"use client";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { db, ref, set, get } from "./firebase";
import { update } from 'firebase/database';
import Image from "next/image";



export default function Websites(){
  const[gmail,setGmail]=useState('');
  const[Password,setPassword]=useState('');
  const[state,setState]=useState('password');
  const[showPassword,setShowPassword]=useState(false);
  const[enter,setEnter]=useState(true);
  const[inputValue,setInputValue]=useState("");
  const[show,setShow]=useState(true);
  const[prise]=useState(140);
  const[Balanced,setBalanced]=useState(0);
  const[count,setCount]=useState(0);
  const[showClocksCards,setShowClocksCards]=useState(false);
  const[showCardsWatches,setShowCardsWatches]=useState(false);
  const[CardsPhone,setCardsPhone]=useState(false);
  const[Buy,setBuy]=useState(false);
  const clocksCardsData =[
    {id:'chock1',img:"chock1.jpeg"},
    {id:'chock2',img:"chock2.jpeg"},
    {id:'chock3',img:"chock3.jpeg"},
    {id:'chock4',img:"chock4.jpeg"},
    {id:'chock5',img:"chock5.jpeg"},
    {id:'chock6',img:"chock6.jpeg"}
  ]
  const CardsWatches=[
    {id:'shos1',img:"shos1.jpg"},
    {id:'shos2',img:"shos2.png"},
    {id:'shos3',img:"shos3.jpeg"},
    {id:'shos4',img:"shos4.jpeg"},
    {id:'shos5',img:"shos5.jpeg"},
    {id:'shos6',img:"shos6.jpeg"}
  ]
  const cardsPhone=[
    {id:'phone2',img:"phone2.jpg"},
    {id:'phone3',img:"phone3.jpg"},
    {id:'phone4',img:"phone4.jpg"},
    {id:'phone5',img:"phone5.jpg"},
    {id:'phone6',img:"phone6.jpg"},
    {id:'phone7',img:"phone7.jpg"}
  ]
  const transformer1=()=>{
    if(show){
      setShow(false);
      setShowClocksCards(true);
    }
  }
  const transformer2=()=>{
    if(show){
      setShow(false);
      setShowCardsWatches(true);
    }
  }
  const transformer3=()=>{
    if(show){
      setShow(false);
      setCardsPhone(true);
    }
  }
    const togglePassword=()=>{
      setState(state === 'password'?'text':'password');
      setShowPassword(prev=>!prev);
}
  const Counter=()=>{
     if (!gmail) {
    toast.error("يجب تسجيل الدخول أولاً!");
    return;
  }
  if(Balanced === 0){
    const Balance = prompt("ادخل رصيد محفظتك: ");
    const parsedBalance = parseFloat(Balance);
    if(!isNaN(parsedBalance) && isFinite(parsedBalance)){
    setBalanced(parsedBalance);
    setBuy(true);
    ///////////////

     set(ref(db, 'users/' + gmail.replace('.', '_') + '/wallet'), {
      balance: parsedBalance,
      number:50
    });
}else if (!Balance || isNaN(parsedBalance)) {
  toast.error("أدخل رقمًا صحيحًا");
  return;
}
  }else if(Balanced > 0){
    const question= prompt('Y | Nهل تريد اضافة رصيد جديد الى محفظتك؟');
    if(question === 'Y'){
      const updateBalanced = prompt(' كم المبلغ الذي تريد اضافته؟');
      const updateBalancedFloat = parseFloat(updateBalanced);
      const phone=parseInt(prompt("ادخل رقم جوالك"));
      if(!isNaN(updateBalancedFloat) && isFinite(updateBalancedFloat)){
    setBalanced(Balanced+updateBalancedFloat);
    setBuy(true);
    ///////////////
     set(ref(db, 'users/' + gmail.replace('.', '_') + '/wallet'), {
      balance: Balanced+updateBalancedFloat,
      number:phone
    });
}else{
       toast.error("رجاءً أدخل رقم صالح للرصيد!");
      return;
    }
    }else{
      setBuy(true);
      toast.error('ولا يهمك المحفظة بتستنى منك اشارة!');
    }

    ///////////
    }
  }

  
  
  useEffect(()=>{
    localStorage.setItem(gmail+'_Balance',Balanced);
  },[Balanced]);

  useEffect(()=>{
    const savedBalanced = localStorage.getItem(gmail+'_Balance');
    if(savedBalanced) setBalanced(parseFloat(savedBalanced));
  },[gmail]);

  const fetchBalance = () => {
  const balanceRef = ref(db, 'users/' + gmail.replace('.', '_') + '/wallet');
  get(balanceRef).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      setBalanced(data.balance);
      console.log("balance:", data.balance, "number:", data.number);
    } else {
      toast.info("لا يوجد رصيد محفوظ لهذا الحساب.");
    }
  }).catch((error) => {
    toast.error("خطأ في جلب البيانات: " + error.message);
  });
};

  const buy=()=>{
    if(Balanced >= prise){
      const newBalanced=Balanced-prise;
    setBalanced(newBalanced);
    setCount(count+1);
    /////////
     set(ref(db, 'users/' + gmail.replace('.', '_') + '/wallet'), {
      balance: newBalanced
    });
    /////////

    }else{
      toast.error("عذرا الرصيد المتوفر غير كافي!");
    }
  }
  const ret=()=>{
    setShow(true);
    setShowCardsWatches(false);
    setCardsPhone(false);
    setShowClocksCards(false);
  }
  
  const search=()=>{
    if(inputValue.trim() !== ''){
        const keyword = inputValue.trim().toLowerCase();

        const clockKeywords = ['ساعة', 'ساعه', 'الساعات', 'ساعات'];
        const shoesKeywords = ['حذاء', 'الاحذية', 'احذية', 'الأحذية'];
        const phoneKeywords = ['جوال', 'جوالات', 'موبايل', 'الهاتف'];

        const includeKeyWords=(keyWords)=>
          keyWords.some((word)=>keyword.includes(word));
        
        if(includeKeyWords(clockKeywords)){
          setShow(false);
          setShowClocksCards(true);
          setShowCardsWatches(false);
          setCardsPhone(false);
       }else if(includeKeyWords(shoesKeywords)){
        setShow(false);
        setShowClocksCards(false);
        setShowCardsWatches(true);
        setCardsPhone(false);
       }else if(includeKeyWords(phoneKeywords)){
        setShow(false);
        setShowClocksCards(false);
        setShowCardsWatches(false);
        setCardsPhone(true);
      }else{
        toast.error("لم يتم العثور على المنتج المطلوب");
      }
    setInputValue('');
  }
};

const enters=()=>{
  const isValidPassword=(Password)=>{
    const has8Letters=(Password.match(/[a-zA-Z]/g) || []).length >= 8;
    const has8Digits = (Password.match(/[0-9]/g) || []).length >= 8;
    return has8Letters && has8Digits;
  };
    /////
    if (gmail !== '' && gmail.endsWith('@gmail.com') && Password !== '' && isValidPassword(Password)) {
    // ✅ حفظ بيانات المستخدم في Firebase
    update(ref(db, 'users/' + gmail.replace('.', '_')), {
      email: gmail,
      password: Password
      
    });
    /////
  setEnter(false);
  fetchBalance();
  }else{
    toast.error("يجب إدخال بريد Gmail صحيح وكلمة مرور!");
  }
}

const logout=()=>{
  setEnter(true);
}



    return(
        <>
        <ToastContainer position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
        {enter && <div className={style.enter}>
          <h3>متجر النخبة</h3>
          <div className={style.contentEnter}>
            <h3>تسجيل الدخول في متجر النخبة</h3>
          <input type="text" value={gmail} onChange={e=>setGmail(e.target.value)} placeholder='البريد الالكتروني'/>
          <div className={style.password}>
          <input type={state} value={Password} onChange={e=>setPassword(e.target.value)} placeholder='كلمة السر'/>
          <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} onClick={togglePassword}></i>
          </div>
          <button onClick={enters} >تسجيل الدخول</button>
          <a href="">هل نسيت كلمة المرور</a>
          </div>
          <button onClick={fetchBalance} className={style.buttonUpdate}>🔄 تحديث الرصيد</button>
          </div>}
        <header className={style.head}>
            <div className={style.leftHead}>
              <a className={style.icon1}><i className="fas fa-user"></i></a>
              <a className={style.icon1} onClick={Counter} href='#'><i className="fas fa-shopping-cart"></i></a>
              <a className={style.icon1}><i className="fas fa-search"></i></a>
              </div>
            <div className={style.centerHead}><h1 className={style.logo}>متجر النخبة</h1>
            <div className={style.nav}>
            <input type="text" placeholder='ابحث عن المنتج' value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
            <a href="#cards"><button><i className='fas fa-search' onClick={search}></i></button></a>
            </div>
            </div>
            <div className={style.rightHead}>
              <a className={style.icon1}><i className="fab fa-instagram"></i></a>
              <a className={style.icon1}><i className="fab fa-twitter"></i></a>
              <a className={style.icon1}><i className="fab fa-facebook"></i></a>
            </div>
        </header>
        <section className={style.sec1}>
        <Image src="/sec.png" alt="security icon" className={style.img} width={1000} height={1000}/>
        <div className={style.overlay}>
        <h1 className={style.h1}>محفظة الكترونية <br/>متعددة</h1>
        <p className={style.p}>ادارة جميع معاملاتك بسهولة</p>
        <a href='#card' className={style.a}><span>ادخل الان</span></a>
        </div>
        </section>
        <hr className={style.hr}/>
        <section className={style.sec2} id='card'>
{showClocksCards &&<div className={style.contentCardsWatches} id='cards'>
            <h3 className={style.sectionTitle}>اجود الماركات العالمية </h3>
            <div className={style.cardsContainer}>
              {Buy && <a href="/cart" className={style.cart_icon}>
              <i className="fas fa-shopping-cart"></i>
              <span className={style.span1}>$الرصيد المتبقي: {Balanced}</span>
              <span className={style.span2}>عدد المنتجات: {count}</span>
              </a>}
            {clocksCardsData .map((clocksCardsData ,index)=>(
              <div className={style.CardsWatches} key={index}>
              <Image className={style.img} src={`/${clocksCardsData .img}`} alt="" width={400} height={400}/>
              <h3  className={style.h3}>Nike Air Max</h3>
              <p className={style.p}>${prise}</p>
              {Buy && <button className={style.cardButton} onClick={buy}>أضف إلى السلة</button>}
            </div>  
            ))}
            </div>
            <div className={style.return}><button onClick={ret}>الرجوع للصفحة الرئيسة</button></div>
            </div>
}
{showCardsWatches &&<div className={style.contentCardsWatches} id='cards'>
            <h3 className={style.sectionTitle}>اجود الماركات العالمية </h3>
            <div className={style.cardsContainer}>
              {Buy && <a href="/cart" className={style.cart_icon}>
              <i className="fas fa-shopping-cart"></i>
              <span className={style.span1}>$الرصيد المتبقي: {Balanced}</span>
              <span className={style.span2}>عدد المنتجات: {count}</span>
              </a>}
            {CardsWatches.map((CardsWatches,index)=>(
              <div className={style.CardsWatches} key={index}>
              <Image className={style.img} src={`/${CardsWatches.img}`} alt="" width={400} height={400}/>
              <h3  className={style.h3}>Nike Air Max</h3>
              <p className={style.p}>${prise}</p>
              {Buy && <button className={style.cardButton} onClick={buy}>أضف إلى السلة</button>}
            </div>  
            ))}
            </div>
            <div className={style.return}><button onClick={ret}>الرجوع للصفحة الرئيسة</button></div>
            </div>
}
{CardsPhone &&<div className={style.contentCardsWatches} id='cards'>
            <h3 className={style.sectionTitle}>اجود الماركات العالمية للاحذية</h3>
            <div className={style.cardsContainer}>
              {Buy && <a href="/cart" className={style.cart_icon}>
              <i className="fas fa-shopping-cart"></i>
              <div className={style.sp}>
              <div className={style.span1}><span>$الرصيد المتبقي: {Balanced}</span></div>
              <div className={style.span2}><span>عدد المنتجات: {count}</span></div>
              </div>
              </a>}
            {cardsPhone.map((cardsPhone,index)=>(
              <div className={style.CardsWatches} key={index}>
              <Image className={style.img} src={`/${cardsPhone.img}`} alt="" width={400} height={400}/>
              <h3  className={style.h3}>Nike Air Max</h3>
              <p className={style.p}>${prise}</p>
              {Buy && <button className={style.cardButton} onClick={buy}>أضف إلى السلة</button>}
            </div>  
            ))}
            </div>
            <div className={style.return}><button onClick={ret}>الرجوع للصفحة الرئيسة</button></div>
            </div>
}
          {show &&<div className={style.content}>
            <div className={style.card}>
              <Image className={style.img} src="/card1.png" alt="" width={400} height={400}/>
              <div className={style.info}>
                <h3 className={style.h3}>الساعات</h3>
                <p className={style.p}>ساعات أنيقة وعصرية تضيف <br/>لمسة فخمة لإطلالتك</p>
                <a href="#watches" className={style.a} onClick={transformer1}>تسوق الآن</a>
              </div>
            </div>
             <div className={style.card}>
              <Image className={style.img} src="/card2.png" alt="" width={400} height={400}/>
              <div className={style.info}>
              <h3 className={style.h3}>الأحذية</h3>
              <p className={style.p}>راحة وأناقة في كل خطوة مع تشكيلتنا المتنوعة من الأحذية.</p>
              <a href="#shoes" className={style.a} onClick={transformer2}>تسوق الآن</a>
              </div>
            </div>
             <div className={style.card}>
              <Image className={style.img} src="/card3.png" alt="" width={400} height={400}/>
              <div className={style.info}>
                <h3 className={style.h3}>الجوالات </h3>
                <p className={style.p}>أحدث الجوالات الذكية بأفضل الأسعار والعروض المميزة!</p>
                <a href="#phones" className={style.a} onClick={transformer3}>تسوق الآن</a>
              </div>
            </div>
            <div className={style.logout}><button onClick={logout}>تسجيل الخروج</button></div>
          </div>
}
        </section>
        <footer className={style.footer}>
          <div className={style.phone}><p className={style.p1}>© 2025 متجر النخبة. جميع الحقوق محفوظة.</p></div>
          <div className={style.p}>
          <p className={style.p2}><a href="mailto:MohammedMohammed@gmail.com">MohammedMohammed@gmail.com :</a>تواصل معنا عبر البريد  </p>
          <p className={style.p1}><a href="">056 728 5197 :رقم الجوال</a></p>
          </div>
          </footer>
        </>
    )
}
