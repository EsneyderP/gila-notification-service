import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';
import { unstable_createMuiStrictModeTheme as createTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import darkTheme from './themes/dark';
import lightTheme from './themes/light';

import PageHeader from './components/PageHeader/PageHeader';
import Router from './components/Router/Router';
import { APP_NAME, APP_THEME } from './constants';

// redux
import store from './store';

function App() {
  const [theme, setTheme] = useState(APP_THEME.Light);
  const [appliedTheme, setAppliedTheme] = useState(createTheme(lightTheme));
  const handleChangeTheme = () => {
    if (theme === APP_THEME.Light) {
      setAppliedTheme(createTheme(darkTheme));
      setTheme(APP_THEME.Dark);
    } else {
      setAppliedTheme(createTheme(lightTheme));
      setTheme(APP_THEME.Light);
    }
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <PageHeader title={APP_NAME} onClickIcon={handleChangeTheme} leftIcon={theme === APP_THEME.Light ? BrightnessLowIcon : BrightnessHighIcon}/>
        <Router />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
