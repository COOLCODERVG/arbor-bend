import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGeolocated } from "react-geolocated";
import picture from "./assets/1bda7cc384dade154857ced4b7c627f9-full.jpg";
import logo from "./assets/A.png";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Additional info state
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [community, setCommunity] = useState("");
  const [communities, setCommunities] = useState<{ id: string; name: string }[]>([]);
  const [profileImage, setProfileImage] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // To toggle between steps
  const history = useNavigate();

  const { coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  function getCommunities() {
    axios.get(`${import.meta.env.VITE_APP_URL}/communities/`).then((res) => {
      setCommunities(res.data);
      console.log(res.data);
    });
  }

  useEffect(() => {
    getCommunities();
    
  }, []);

  

  



  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}/users/create/`, {
        email: email,
        password: password,
        username: firstName + lastName,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        Community: community,
        profile_image: profileImage,
        latitude: coords ? coords.latitude.toString() : "",
        longitude: coords ? coords.longitude.toString() : "",
        linkedin: linkedin,
      });
      localStorage.setItem("usrData", JSON.stringify(response.data));
      setLoading(false);

      history("/dashboard");
    } catch (error: any) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex w-screen relative h-screen">
      <div className="md:w-[40%] w-screen md:px-0 px-10 h-fit my-auto relative">
        <form
          onSubmit={handleSignup}
          className="md:w-[70%] mx-auto h-fit my-auto md:pt-[5vh] pt-0 flex flex-col"
        >
          <div className="flex justify-center mb-[2vh]">
            <img
              src={logo}
              className="mb-8 md:mb-[4vh] w-[25%] md:w-[6vw] rounded-xl"
              alt="Logo"
            />
          </div>
          <h1 className="text-center font-bold text-[3.5ch] mb-[5vh]">
            {step === 1 ? "Sign up for an account" : "Additional Information"}
          </h1>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div className="grid grid-cols-1">
                  <Label className="text-lg mb-1">First Name<span className="text-red-400">*</span></Label>
                  <input
                    type="text"
                    className="border-[0.5px] rounded-lg px-4 py-2"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-1">
                  <Label className="text-lg mb-1">Last Name<span className="text-red-400">*</span></Label>
                  <input
                    type="text"
                    className="border-[0.5px] rounded-lg px-4 py-2"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Label className="text-lg mt-2">Email<span className="text-red-400">*</span></Label>
              <input
                type="email"
                className="border-[0.5px] rounded-lg px-4 py-2 mb-4"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Label className="text-lg mb-1">Password<span className="text-red-400">*</span></Label>
              <input
                type="password"
                className="border-[0.5px] rounded-lg px-4 py-2 mb-4"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button
                type="button"
                className="bg-green-500 px-8 py-2 text-white w-full hover:bg-green-400 transition-all"
                onClick={() => setStep(2)}
              >
                Next
              </Button>
            </>
          )}

          {/* Step 2: Additional Info */}
          {step === 2 && (
            <>
              <Label className="text-lg mb-1">Phone Number<span className="text-red-400">*</span></Label>
              <PhoneInput
                placeholder="Enter phone number"
                className="border-[0.5px] rounded-lg px-4 py-2 mb-4"
                value={phoneNumber}
                onChange={setPhoneNumber}/>

              <Label className="text-lg mb-1">Community<span className="text-red-400">*</span></Label>
              <select
                className="border-[0.5px] rounded-lg px-4 py-2 mb-4"
                onChange={(e) => setCommunity(e.target.value)}
                required
              >
                <option value="" disabled selected>
                  Select your community
                </option>
                {communities.map((comm):any => (
          <option key={comm.id} value={comm.id}>
            {comm.name}
        </option>
      ))}
              </select>

              <Label className="text-lg mb-1">Profile Image URL<span className="text-red-400">*</span></Label>
              <input
                type="url"
                className="border-[0.5px] rounded-lg px-4 py-2 mb-4"
                placeholder="https://example.com/profile.jpg"
                onChange={(e) => setProfileImage(e.target.value)}
              />

              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <Label className="text-lg mb-1">Latitude<span className="text-red-400">*</span></Label>
                  <input
                    type="number"
                    className="border-[0.5px] rounded-lg px-4 py-2"
                    placeholder="e.g. 37.7749"
                    disabled={true}
                    value={coords ? coords.latitude.toString() : ""}

                  />
                </div>
                <div>
                  <Label className="text-lg mb-1">Longitude<span className="text-red-400">*</span></Label>
                  <input
                    type="number"
                    className="border-[0.5px] rounded-lg px-4 py-2"
                    placeholder="e.g. -122.4194"
                    disabled={true}
                    value={coords ? coords.longitude.toString() : ""}


                  />
                </div>
              </div>

              <Label className="text-lg mt-2 mb-1">LinkedIn (Optional)<span className="text-red-400">*</span></Label>
              <input
                type="url"
                className="border-[0.5px] rounded-lg px-4 py-2 mb-4"
                placeholder="https://linkedin.com/in/username"
                onChange={(e) => setLinkedin(e.target.value)}
              />

              <Button
                type="submit"
                className={`bg-green-500 px-8 py-2 text-white w-full hover:bg-green-400 transition-all ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </Button>
            </>
          )}
          
          <p className=" mx-auto w-fit mt-4 text-[1.5ch]">
              Forgot your password? <a href="/password-reset/" className="text-green-500">Reset it!</a>
            </p>
            <h2 className="text-center text-black text-[1.5ch] ">
            Have an account?{" "}
            <a href="/" className="text-green-400">
              Login
            </a>
            
          </h2>
          
        </form>
      </div>
      <img
        className="hidden md:block md:w-[60%] object-cover object-right"
        src={picture}
        alt="Background"
      />
    </div>
  );
};

export default SignupForm;