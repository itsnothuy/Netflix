// import React, { useEffect, useState } from 'react';
// import './PlansScreen.css';
// import { collection, getDocs, query, where, addDoc, onSnapshot } from 'firebase/firestore';
// import db from '../firebase';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../features/userSlice';
// import { loadStripe } from '@stripe/stripe-js';


// const PlansScreen = () => {
//     const [products, setProducts] = useState([]);
//     const user = useSelector(selectUser);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             const q = query(collection(db, "products"), where("active", "==", true));
//             const querySnapshot = await getDocs(q);

//             const productsData = {};

//             for (const productDoc of querySnapshot.docs) {
//                 const productData = productDoc.data();
//                 const priceSnap = await getDocs(collection(productDoc.ref, "price"));
                
//                 const prices = priceSnap.docs.map(price => ({
//                     priceId: price.id,
//                     priceData: price.data()
//                 }));

//                 productsData[productDoc.id] = {
//                     ...productData,
//                     prices
//                 };
//             }

//             setProducts(productsData);
//         };

//         fetchProducts();
//     }, []);

//     console.log(products);

//     const loadCheckout = async (priceId) => {
//         if (!priceId) {
//             console.error("Price ID is undefined. Check your Firestore data.");
//             return;
//         }
    
//         try {
//             const checkoutSessionRef = await addDoc(
//                 collection(db, 'customers', user.uid, 'checkout_sessions'),
//                 {
//                     price: priceId,
//                     success_url: window.location.origin,
//                     cancel_url: window.location.origin,
//                 }
//             );
    
//             onSnapshot(checkoutSessionRef, async (snap) => {
//                 const { error, sessionId } = snap.data();
//                 if (error) {
//                     alert(`An error occurred: ${error.message}`);
//                     return;
//                 }
    
//                 if (sessionId) {
//                     const stripe = await loadStripe('pk_test_51QHfZ1HGdTnc8pJOPiI34gHHQ4i7JkeDn5uvH7Aj0Aq5mwaLN8qujFHpej9yAkblYmkltk3wPo89nWUpqiNGz57X00JTEAz4yR');
//                     stripe.redirectToCheckout({ sessionId });
//                 }
//             });
//         } catch (error) {
//             console.error("Error loading checkout session: ", error);
//         }
//     };
    


//     return (
//         <div className='plansScreen'>
//             {Object.entries(products).map(([productId, productData]) => {
//                 // add logics to check if the user's is active
//                 return (
//                     <div className='plansScreen__plan'>
//                         <div className='plansScreen__info'>
//                             <h5>{productData.name}</h5>
//                             <h6>{productData.description}</h6>
//                         </div>

//                         <button onClick={() => loadCheckout(productData.prices.priceId)}>
//                             Subscribe
//                         </button>
//                     </div>
                        
//                 )
//             })} 
//         </div>
//     );
// };

// export default PlansScreen;



import React, { useEffect, useState } from 'react';
import './PlansScreen.css';
import { collection, getDocs, query, where, addDoc, onSnapshot } from 'firebase/firestore';
import db from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';

const PlansScreen = () => {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        const fetchProducts = async () => {
            const q = query(collection(db, "products"), where("active", "==", true));
            const querySnapshot = await getDocs(q);

            const productsData = {};

            for (const productDoc of querySnapshot.docs) {
                const productData = productDoc.data();
                
                // Correct subcollection name "prices"
                const priceSnap = await getDocs(collection(productDoc.ref, "prices"));

                const prices = priceSnap.docs.map(price => ({
                    priceId: price.id,
                    priceData: price.data()
                }));

                productsData[productDoc.id] = {
                    ...productData,
                    prices
                };
            }

            setProducts(productsData);
            console.log("Fetched products with prices:", productsData); // Debugging log
        };

        fetchProducts();
    }, []);

    const loadCheckout = async (priceId) => {
        if (!priceId) {
            console.error("Price ID is undefined. Check your Firestore data.");
            return;
        }
    
        try {
            const checkoutSessionRef = await addDoc(
                collection(db, 'customers', user.uid, 'checkout_sessions'),
                {
                    price: priceId,
                    success_url: window.location.origin,
                    cancel_url: window.location.origin,
                }
            );
    
            onSnapshot(checkoutSessionRef, async (snap) => {
                const { error, sessionId } = snap.data();
                if (error) {
                    alert(`An error occurred: ${error.message}`);
                    return;
                }
    
                if (sessionId) {
                    const stripe = await loadStripe('pk_test_51QHfZ1HGdTnc8pJOPiI34gHHQ4i7JkeDn5uvH7Aj0Aq5mwaLN8qujFHpej9yAkblYmkltk3wPo89nWUpqiNGz57X00JTEAz4yR');
                    stripe.redirectToCheckout({ sessionId });
                }
            });
        } catch (error) {
            console.error("Error loading checkout session: ", error);
        }
    };

    return (
        <div className='plansScreen'>
            {Object.entries(products).map(([productId, productData]) => (
                <div key={productId} className='plansScreen__plan'>
                    <div className='plansScreen__info'>
                        <h5>{productData.name}</h5>
                        <h6>{productData.description}</h6>
                    </div>
                    {productData.prices && productData.prices.length > 0 ? (
                        productData.prices.map((price) => (
                            <button
                                key={price.priceId}
                                onClick={() => loadCheckout(price.priceId)}
                            >
                                Subscribe
                            </button>
                        ))
                    ) : (
                        <p>No prices available for this plan</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PlansScreen;
