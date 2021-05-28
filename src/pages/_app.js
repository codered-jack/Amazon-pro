import { Provider } from 'react-redux';
import { store } from '../app/store';
import '../styles/globals.css';
import { Provider as AuthProvider } from 'next-auth/client';
import { ToastProvider } from 'react-toast-notifications';
const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </Provider>
    </AuthProvider>
  );
};

export default MyApp;
