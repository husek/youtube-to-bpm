import React from 'react';
import { render } from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainView from './views/main';
import GlobalStyle from './styles/GlobalStyle';

const mainElement = document.createElement('div');
mainElement.setAttribute('id', 'root');
document.body.appendChild(mainElement);


const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: 'rgb(54, 33, 100)'
    },
    secondary: {
      main: 'rgb(177, 122, 204)'
    }
  }
});

const App = () => (
  <>
    <CssBaseline />
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <MainView />
    </ThemeProvider>
  </>
);

render(<App />, mainElement);
