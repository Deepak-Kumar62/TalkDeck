import { useState } from "react";
import GenderCheckBox from "./GenderCheckBox";
import { Link } from "react-router-dom";
import useSignUp from "../../hooks/useSignUp";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignUp();

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          SignUp <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={inputs.fullName}
              placeholder="Enter Full Name"
              className="w-full input input-bordered h-10"
              onChange={handleInputChanges}
            />
          </div>

          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              value={inputs.username}
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              onChange={handleInputChanges}
            />
          </div>

          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={inputs.password}
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
              onChange={handleInputChanges}
            />
          </div>

          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={inputs.confirmPassword}
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              onChange={handleInputChanges}
            />
          </div>

          <GenderCheckBox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          <Link
            to="/login"
            href="#"
            className="text-sm hover:underline hover:text-blue-600 inline-block"
          >
            {" "}
            Allready have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

// Starter code for this file

// import React from "react";
// import GenderCheckBox from "./GenderCheckBox";

// const SignUp = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//       <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//         <h1 className="text-3xl font-semibold text-center text-gray-300">
//           SignUp <span className="text-blue-500">ChatApp</span>
//         </h1>

//         <form>
//           <div>
//             <label htmlFor="" className="label p-2">
//               <span className="text-base label-text">Full Name</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Deepak Kumar"
//               className="w-full input input-bordered h-10"
//             />
//           </div>

//           <div>
//             <label htmlFor="" className="label p-2">
//               <span className="text-base label-text">Username</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter username"
//               className="w-full input input-bordered h-10"
//             />
//           </div>

//           <div>
//             <label htmlFor="" className="label p-2">
//               <span className="text-base label-text">Password</span>
//             </label>
//             <input
//               type="password"
//               placeholder="Enter password"
//               className="w-full input input-bordered h-10"
//             />
//           </div>

//           <div>
//             <label htmlFor="" className="label p-2">
//               <span className="text-base label-text">Confirm Password</span>
//             </label>
//             <input
//               type="password"
//               placeholder="Enter password"
//               className="w-full input input-bordered h-10"
//             />
//           </div>

//           <GenderCheckBox />

//           <a
//             href="#"
//             className="text-sm hover:underline hover:text-blue-600 inline-block"
//           >
//             {" "}
//             Allready have an account?
//           </a>

//           <div>
//             <button className="btn btn-block btn-sm mt-2">Signup</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
