"use client";
import style from "style.module.css";
export default function watches(){
    const CardsWatches=[
    {id:'1',img:"shos1.jpg"},
    {id:'1',img:"shos2.png"},
    {id:'1',img:"shos3.jpeg"},
    {id:'1',img:"shos4.jpeg"},
    {id:'1',img:"shos5.jpeg"},
    {id:'1',img:"shos6.jpeg"}
  ]
    return(
        <>
        <div className={style.contentCardsWatches} id="shoes">
            <h3 className={style.sectionTitle}>اجود الماركات العالمية </h3>
            <div className={style.cardsContainer}>
            {CardsWatches.map((CardsWatches,index)=>(
              <div className={style.CardsWatches} key={index}>
              <img className={style.img} src={CardsWatches.img} alt="" />
              <h3  className={style.h3}>Nike Air Max</h3>
              <p className={style.p}>$120</p>
              <button className={style.cardButton}>أضف إلى السلة</button>
            </div>  
            ))}
            </div>
            </div>
        </>
    )
}