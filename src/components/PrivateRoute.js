// import React from "react"
// import { Route, Redirect } from "react-router-dom"
// import { useAuth } from "./services/AuthContext"

// export default function PrivateRoute({ component: Component, ...rest }) {
//     const { currentUser } = useAuth()

//     return (
//         <Route
//             {...rest}
//             render={props => {
//                 return currentUser ? <Component {...props} /> : <Redirect to="/login" />
//             }}
//         ></Route>
//     )
// }


import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../services/AuthContext"

const PrivateRoute = ({ path, component: Component, render, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (!useAuth.currentUser)
                    return (
                        <Redirect
                            from={path}
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    );
                return Component ? <Component {...props} /> : render(props);
            }}
        />
    );
};

export default PrivateRoute;
