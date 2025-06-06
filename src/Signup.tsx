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
