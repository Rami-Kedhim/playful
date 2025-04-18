
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { PersonaProvider } from './contexts/PersonaContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { UberPersonaProvider } from './contexts/UberPersonaContext';
import { EscortProvider } from './modules/escorts/providers/EscortProvider';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <EscortProvider>
            <UberPersonaProvider>
              <PersonaProvider>
                <FavoritesProvider>
                  <Routes />
                  <Toaster />
                </FavoritesProvider>
              </PersonaProvider>
            </UberPersonaProvider>
          </EscortProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
