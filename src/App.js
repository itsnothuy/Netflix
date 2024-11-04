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


import React from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const user = null;
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
