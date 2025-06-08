import { useState, FormEvent } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";

import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
import picture from "./assets/1bda7cc384dade154857ced4b7c627f9-full.jpg";
import logo from "./assets/A.png";
import {useAuthToken } from "./lib/constants";



const LoginForm = () => {
  const { setAuth, api } = useAuthToken();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/api/token/", {
        email: email,
        password: password,
      });
      setError(null);

      const token = response.data.access; // Assuming 'access' is the key for the Bearer token
      localStorage.setItem("access_token", token);
      setAuth(token);


      localStorage.setItem("access_token", token);
      const usrDat = await api.post("/userdata/", {
        email: email,
      });
      console.log(usrDat.data);
      const usrData = usrDat.data;
      localStorage.setItem("usrData", JSON.stringify(usrData));


      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);
      const errorMessage = error.response?.data?.detail || "Login failed, please try again.";
      if (error.response?.status === 401) {
        setError("Invalid email or password. Please try again.");
      }else {
      setError(errorMessage);
    }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = (response: any) => {
    const token = response.credential;
    fetch(import.meta.env.VITE_APP_URL+"auth/complete/google/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .catch(() => setError("Google login failed, please try again."));
  };



  return (
    <GoogleOAuthProvider clientId="<your-client-id>">
      <div className="flex flex-col md:flex-row w-screen relative overflow-y-hidden md:h-screen">
        {error && (
          <div className="absolute w-[40%] top-0 ">
            <Alert className="bg-red-400/50">
              <AlertTitle >Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}
        <div className="md:w-[40%] w-full flex flex-col justify-center items-center px-4 md:px-8">
          <div className="flex flex-col w-full justify-center items-center max-h-[100vh]">
            <form onSubmit={handleLogin} className="w-[70%] mx-auto flex flex-col">
              <div className="flex justify-center mb-4">
                <img src={logo} className="w-[30%] rounded-xl" alt="Logo" />
              </div>
              <h1 className="text-center font-bold text-2xl">Log in to your account</h1>
              <h2 className="text-center text-green-400 text-lg mb-4">Welcome Back, Please Login.</h2>
              <Label className="text-lg mb-1">Email</Label>
              <input
                type="email"
                className="border rounded-lg px-4 py-2 w-full mb-4"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Label className="text-lg mb-1">Password</Label>
              <input
                type="password"
                className="border rounded-lg px-4 py-2 w-full mb-4"
                placeholder="*********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="mt-2 mx-auto w-fit text-sm">
              Don't have an account? <a href="/signup/" className="text-green-500">Sign up!</a>
            </p>
            <p className="mt-2 mx-auto w-fit mb-10 text-sm">
              Forgot your password? <a href="/password-reset/" className="text-green-500">Reset it!</a>
            </p>
            <div className="mt-4 space-y-2">
              
              <Button
                type="submit"
                className={`bg-green-500 px-8 py-2 text-white w-full ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </Button>
              <GoogleLogin

                onSuccess={handleGoogleLoginSuccess}
                

              />{/*onError={handleGoogleLoginFailure}*/}
            </div>
              
            </form>
            
            
            
          </div>
        </div>
        <img className="hidden md:block w-[60%] object-cover" src={picture} alt="Background" />
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginForm;
