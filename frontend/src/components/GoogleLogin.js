import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { API_BASE_URL } from "../constants";
import axios from 'axios'
                              

const GoogleLoginPage =  ({hook}) => {
	const responseGoogle = async (authResult) => {
		try {
			if (authResult["code"]) {
				console.log(authResult.code);
				const result = await axios.get(`${API_BASE_URL}/user/auth/google?code=${authResult.code}&hook=${hook}`);
				if(result.data.message === "login successfully"){
					localStorage.setItem("isLoggedIn", true);
					localStorage.setItem("userInfo", JSON.stringify(result.data.user));
					window.location.href = "/"
					return;
				}
				alert(result.data.message);
			} else {
				console.log(authResult);
				throw new Error(authResult);
			}
		} catch (e) {
			alert(e?.response.data.message);
		}
	};

	const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});

	return (
		<div className='form-bottom'>
            <button onClick={googleLogin}>{hook === "signup" ? "Signup with Google" : "Login with Google"}</button>
        </div>
	);
};

export default GoogleLoginPage;