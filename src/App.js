/*
 * @Author: Harry Tang - harry@powerkernel.com
 * @Date: 2020-01-15 19:01:44
 * @Last Modified by: Harry Tang - harry@powerkernel.com
 * @Last Modified time: 2020-01-15 23:40:56
 */
import React, { useState, useEffect } from "react";

import { Authenticator } from "aws-amplify-react";
import { Auth, Hub } from "aws-amplify";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

// pages
import HomePage from "./pages/HomePgae";
import ProfilePage from "./pages/ProfilePgae";
import MarketPage from "./pages/MarketPage";
// components
import NavBar from "./components/NavBar";

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const listener = data => {
      switch (data.payload.event) {
        case "signIn":
          getUserData();
          console.log("user signed in"); //[ERROR] My-Logger - user signed in
          break;
        case "signUp":
          console.log("user signed up");
          break;
        case "signOut":
          setUser(null);
          console.log("user signed out");
          break;
        case "signIn_failure":
          console.log("user sign in failed");
          break;
        default:
          console.log("the Auth module is configured");
      }
    };

    const getUserData = () => {
      Auth.currentAuthenticatedUser()
        .then(user => setUser(user))
        .catch(() => console.log("Not signed in"));
    };

    getUserData();
    Hub.listen("auth", listener);
  }, []);

  const handlerSignOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.error("Error signing out user", error);
    }
  };

  const notistackRef = React.createRef();
  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <>
      {!user ? (
        <Authenticator />
      ) : (
        <UserContext.Provider value={{ user }}>
          <SnackbarProvider
            ref={notistackRef}
            action={key => (
              <Button onClick={onClickDismiss(key)}>Dismiss</Button>
            )}
            anchorOrigin={{vertical: "top", horizontal: "right"}}
          >
            <Router>
              <NavBar user={user} handlerSignOut={handlerSignOut} />

              {/* routes */}
              <main>
                <Container maxWidth="lg">
                  <Route exact path="/" component={HomePage} />
                  <Route path="/profile" component={ProfilePage} />
                  <Route
                    path="/markets/:marketId"
                    component={({ match }) => (
                      <MarketPage marketId={match.params.marketId} />
                    )}
                  />
                </Container>
              </main>
            </Router>
          </SnackbarProvider>
        </UserContext.Provider>
      )}
    </>
  );
}

export default App;
