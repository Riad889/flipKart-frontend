import { createContext, useState } from "react";
import Header from '../components/Header';
import Home from '../components/Home';
import Cart from "../components/Cart";
import DetailView from "../components/DetailView";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import UserAccount from "../components/UserAccount";
import ConfirmOrder from "../components/ConfirmOrder";

export const DataContext = createContext(null);

const DataProvider = () => {
  const [account, setAccount2] = useState();
  return (
    <DataContext.Provider value={{ account, setAccount2 }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path ="/product/:id" element={<DetailView/>} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/:id" element={<UserAccount/>}/>
          <Route path="/orderComplete" element={<ConfirmOrder/>}/>
         
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  );
};
export default DataProvider;
