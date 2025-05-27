"use client";
import { useState } from "react";
import style from "./style.module.css";

// بيانات المنتجات وهمية
const PRODUCTS = [
  {
    id: 1,
    name: "قميص كاجوال",
    price: 100,
    description: "قميص كاجوال عالي الجودة، مناسب لكل الأوقات.",
    image: "https://via.placeholder.com/150?text=قميص",
  },
  {
    id: 2,
    name: "حذاء رياضي",
    price: 250,
    description: "حذاء رياضي مريح وعصري.",
    image: "https://via.placeholder.com/150?text=حذاء",
  },
  {
    id: 3,
    name: "ساعة يد",
    price: 500,
    description: "ساعة يد فاخرة بتصميم أنيق.",
    image: "https://via.placeholder.com/150?text=ساعة",
  },
];

// مكون بطاقة منتج
function ProductCard({ product, onSelect }) {
  return (
    <div className={style.productCard} onClick={() => onSelect(product)}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} ريال</p>
    </div>
  );
}

// مكون عرض المنتجات
function ProductList({ products, onSelect }) {
  return (
    <div className={style.productList}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onSelect={onSelect} />
      ))}
    </div>
  );
}

// مكون تفاصيل المنتج
function ProductDetails({ product, onAddToCart, onBack }) {
  if (!product) return null;
  return (
    <div className={style.productDetails}>
      <button onClick={onBack}>◀ رجوع</button>
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>السعر: {product.price} ريال</p>
      <button onClick={() => onAddToCart(product)}>أضف إلى السلة</button>
    </div>
  );
}

// مكون عنصر السلة
function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    
    <div className={style.cartItem}>
      <img src={item.image} alt={item.name} />
      <div>
        <h4>{item.name}</h4>
        <p>السعر: {item.price} ريال</p>
        <p>
          الكمية:{" "}
          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
          {item.quantity}
          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
        </p>
        <button onClick={() => onRemove(item.id)}>حذف</button>
      </div>
    </div>
  );
}

// مكون السلة
function Cart({ cartItems, onUpdateQuantity, onRemove, onClose }) {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={style.cart}>
      <button onClick={onClose}>✖ إغلاق السلة</button>
      <h2>سلة التسوق</h2>
      {cartItems.length === 0 && <p>السلة فارغة</p>}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
        />
      ))}
      <h3>المجموع الكلي: {totalPrice} ريال</h3>
    </div>
  );
}

// المكون الرئيسي
export default function Website() {
  const [products] = useState(PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // إضافة منتج للسلة
  function handleAddToCart(product) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // زيادة الكمية إذا المنتج موجود
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // إضافة منتج جديد مع quantity=1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    alert("تمت إضافة المنتج للسلة!");
  }

  // تحديث كمية منتج في السلة
  function handleUpdateQuantity(id, quantity) {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  }

  // حذف منتج من السلة
  function handleRemove(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className={style.website}>
      <header className={style.header}>
        <h1>متجر إلكتروني</h1>
        <button onClick={() => setShowCart(true)}>🛒 عرض السلة ({cartItems.length})</button>
      </header>

      {!selectedProduct && !showCart && (
        <ProductList products={products} onSelect={setSelectedProduct} />
      )}

      {selectedProduct && !showCart && (
        <ProductDetails
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onBack={() => setSelectedProduct(null)}
        />
      )}

      {showCart && (
        <Cart
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemove}
          onClose={() => setShowCart(false)}
        />
      )}
    </div>
  );
}