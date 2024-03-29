import React from "react"
import { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { LoggedInStatus } from "../contexts/LoggedInStatus"

// этот компонент принимает другой компонент в качестве пропса component
// он также может взять неограниченное число пропсов ...props и передать их новому компоненту 
const ProtectedRoute = ({ path, children }) => {

    const loggedIn = useContext(LoggedInStatus)

    return (
        <Route path={path}>
            {loggedIn ? children : <Redirect to="/signin" />}
        </Route>
    )
}

export default ProtectedRoute 