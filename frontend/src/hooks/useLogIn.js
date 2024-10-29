import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";
import { useState } from "react";

const useLogIn = () => {
  const [loading, setloading] = useState();
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const succes = handleInputErrors(username, password);
    if (!succes) return;

    setloading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  return { loading, login };
};

export default useLogIn;

const handleInputErrors = (username, password) => {
  if (!username || !password) {
    toast.error("please fill in the all fields.");
    return false;
  }

  return true;
};
