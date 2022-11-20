import React, { useState } from "react";

const useToggle = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const toggler = () => setToggle(!toggle);
  return { toggle, toggler, setToggle };
};

export default useToggle;
