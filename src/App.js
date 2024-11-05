// import React from 'react';
// import './App.css';
// import HomeScreen from './screens/HomeScreen';
// import Nav from './Nav';
// import { BrowserRouter as Switch, Router, Route } from 'react-router-dom';

// function App() {
//   return (
//     <div className="app">
//       <Router>
//         <Switch>
//           <Route exact path="/">
//             <HomeScreen/>
//           </Route>
//         </Switch>
//       </Router>
//     </div>
//   );
// }

// export default App;


import './App.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { login, logout, selectUser } from './features/userSlice';

import { auth } from './firebase';

import { useDispatch, useSelector } from 'react-redux';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth => {
      if (userAuth) {

        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }));
      } else {
        dispatch(logout());
      }
    }));
    return unsubscribe;
  }, []);
  return (
    <div className="app">
      <Router>
        {!user ?  
          <LoginScreen /> 
          : (
            <Routes>
              {/* <Route path="/profile" element={<ProfileScreen />} /> */}
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          )
        }
      </Router>
    </div>
  );
}

export default App;
