import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useQueryParams from "../../hooks/queryParamsHook";
import { Role } from "../../models/authModels";
import AuthService from "../../services/auth";
import { setRole, setSession } from "../utils/session";

const CognitoCallback = () => {

    const query = useQueryParams();
    const navigate = useNavigate();

    useEffect(() => {
        const code = query.get("code");
        if (code) {
            AuthService.login(code).then(auth => {
                setSession(auth.token);
                setRole(auth.role);
                if(auth.role === Role.NONE) {
                    navigate("/landing");
                } else {
                    navigate("/");
                }
            });
        }
    }, [query]);

    return (
        <div>
            Reading code...
        </div>
    );
};

export default CognitoCallback;