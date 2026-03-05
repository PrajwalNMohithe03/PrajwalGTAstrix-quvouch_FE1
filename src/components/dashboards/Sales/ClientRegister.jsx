// src/pages/RegisterUser.jsx

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, User, Mail, Lock, Phone, MapPin } from "lucide-react";

import { registerUserThunk } from "../../../features/register/registerThunk"; 
// ⬆ adjust path if needed

export default function RegisterUser() {
  const dispatch = useDispatch();

  const { registerLoading, registerError, registerSuccess } = useSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    userId: "",
    password: "",
    address: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    roles: [],
    name: "",
    dateOfBirth: "",
    studentcol: "",
    studentcol1: "",
    studentClass: "",
    role: "",
    saleRepId: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRolesChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );

    setFormData({
      ...formData,
      roles: selected
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUserThunk(formData));
  };

  // Optional: Reset form after success
  useEffect(() => {
    if (registerSuccess) {
      setFormData({
        email: "",
        userId: "",
        password: "",
        address: "",
        firstName: "",
        lastName: "",
        mobileNumber: "",
        roles: [],
        name: "",
        dateOfBirth: "",
        studentcol: "",
        studentcol1: "",
        studentClass: "",
        role: "",
        saleRepId: ""
      });
    }
  }, [registerSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Register New User
        </h2>

        {/* SUCCESS MESSAGE */}
        {registerSuccess && (
          <div className="mb-4 text-center text-green-600">
            {registerSuccess}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {registerError && (
          <div className="mb-4 text-center text-red-600">
            {registerError}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <Input name="firstName" placeholder="First Name" icon={<User size={18} />} value={formData.firstName} onChange={handleChange} />
          <Input name="lastName" placeholder="Last Name" icon={<User size={18} />} value={formData.lastName} onChange={handleChange} />
          <Input name="email" type="email" placeholder="Email" icon={<Mail size={18} />} value={formData.email} onChange={handleChange} />
          <Input name="userId" placeholder="User ID" value={formData.userId} onChange={handleChange} />
          <Input name="mobileNumber" placeholder="Mobile Number" icon={<Phone size={18} />} value={formData.mobileNumber} onChange={handleChange} />
          <Input name="address" placeholder="Address" icon={<MapPin size={18} />} value={formData.address} onChange={handleChange} />

          {/* Password */}
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <div
              className="absolute right-3 top-3 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          <Input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
          <Input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
          <Input name="studentcol" placeholder="Student Col" value={formData.studentcol} onChange={handleChange} />
          <Input name="studentcol1" placeholder="Student Col 1" value={formData.studentcol1} onChange={handleChange} />
          <Input name="studentClass" placeholder="Student Class" value={formData.studentClass} onChange={handleChange} />
          <Input name="role" placeholder="Role" value={formData.role} onChange={handleChange} />
          <Input name="saleRepId" type="number" placeholder="Sale Rep ID" value={formData.saleRepId} onChange={handleChange} />

          {/* Roles Multi Select */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Select Roles
            </label>
            <select
              multiple
              value={formData.roles}
              onChange={handleRolesChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
                  <option value="CLIENT">CLIENT</option>
              <option value="SALE_REPRESENTATIVE">SALE_REPRESENTATIVE</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={registerLoading}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
            >
              {registerLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ icon, name, type = "text", placeholder, value, onChange }) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-3 text-gray-400">
          {icon}
        </div>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full ${icon ? "pl-10" : "pl-3"} py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none`}
      />
    </div>
  );
}