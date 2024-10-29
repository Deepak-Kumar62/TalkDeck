import React from "react";
import { BiLogOut } from "react-icons/bi";

import useLogOut from "../../hooks/useLogOut";

const LogoutButton = () => {
  const { isLoading, logout } = useLogOut();
  return (
    <div className="mt-auto">
      {!isLoading ? (
        <BiLogOut
          className="h-6 w-6 text-white cursor-pointer"
          onClick={logout}
        />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;
