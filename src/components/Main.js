import React from 'react';
import { Routes, Route} from 'react-router-dom';

import Home from './Home';
import Game from './Game';
import User from './User';

const Main = () => {
    return(
        <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/game' element={<Game />}></Route>
            <Route exact path='/user' element={<User />}></Route>
        </Routes>
    );
}

export default Main;