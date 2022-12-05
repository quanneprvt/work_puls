import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import { PopupProvider } from './contexts/PopupContext';
import ThemeProvider from './theme/ThemeProvider';

ReactDOM.render(
  <HelmetProvider>
    <PopupProvider>
      <SidebarProvider>
        <BrowserRouter>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </SidebarProvider>
    </PopupProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
