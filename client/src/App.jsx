import Routes from "./navigators/routes";
import AuthProvider from "./context/authContext";
function App() {
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
}

export default App;
