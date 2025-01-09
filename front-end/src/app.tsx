import Home from './components/home';
import { GlobalStyle } from './settings/styles/global';
import EnvironmentProvider from './context/environment/provider';

export default function App() {
  return (
    <EnvironmentProvider>
      <GlobalStyle />
      <Home />
    </EnvironmentProvider>
  );
}
