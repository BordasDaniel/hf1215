import { NavLink } from "react-router-dom";


function NotFound()
{
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <NavLink to="/">Vissza a főoldalra</NavLink>
        </div>
    );
    
}

export default NotFound;