import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBusinessThunk } from "../../../features/admin/adminSlice";
import { Input } from "../../Input";
export default function AddNew({ open, onClose }) {
  const [form, setForm] = useState({
    businessName: "",
    businessType: "",
    address: "",
    phoneNumber: "",
    businessEmail: "",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.admin);

  if (!open) return null;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      businessName: form.businessName,
      businessType: form.businessType,
      address: form.address,
      phoneNumber: Number(form.phoneNumber),
      businessEmail: form.businessEmail,
    };

    try {
      await dispatch(createBusinessThunk(payload)).unwrap();

      setForm({
        businessName: "",
        businessType: "",
        address: "",
        phoneNumber: "",
        businessEmail: "",
      });

      onClose();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              name="businessName"
              label="Business Name"
              value={form.businessName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
              errorMsg={error?.businessName}
            />

            <Input
              type="email"
              name="businessEmail"
              label="Business Email"
              value={form.businessEmail}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
              errorMsg={error?.businessEmail}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              name="businessType"
              label="Business Type"
              value={form.businessType}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              errorMsg={error?.businessType}
            />

            <Input
              name="address"
              label="Address"
              value={form.address}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              errorMsg={error?.address}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              name="phoneNumber"
              label="Phone Number"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
              errorMsg={error?.phoneNumber}
            />
            <div></div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-purple-600 text-white rounded"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
