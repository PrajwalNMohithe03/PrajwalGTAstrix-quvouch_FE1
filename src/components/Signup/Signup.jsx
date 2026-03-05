import { useState } from "react";
import { USER_ROLES } from "../../constants";
import SignupLeft from "./SignupLeft";
import SignupRightPanel from "./SignupRight";

export default function SignupPage() {

  const [role, setRole] = useState(USER_ROLES.SALE_REPRESENTATIVE);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <SignupLeft role={role} setRole={setRole} />
      <SignupRightPanel role={role} />
    </div>
  );
}
