import React from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  getHomeRoute,
} from '../../routes';
import Home from '../../pages/Home/Home';
import NotFound from '../../pages/NotFound/NotFound';

const Router = () => (
  <>
    <Routes>
      <Route
        exact
        path={getHomeRoute()}
        element={<Home />}
      />
      <Route
        path="*"
        element={<NotFound />} />
    </Routes>
  </>
);

export default Router;
