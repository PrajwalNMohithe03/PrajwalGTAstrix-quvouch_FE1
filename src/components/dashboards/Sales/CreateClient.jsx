import { X, UserPlus, Building2, User, MapPin } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClientThunk } from "../../../features/sales/SalesClientSlice";
export default function CreateClient({ open, onClose, onSuccess }) {
  if (!open) return null;

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.business);

  const [form, setForm] = useState({
    name: "",
    industry: "",
    contact: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const [errors, setErrors] = useState({});

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const e = {};
    Object.keys(form).forEach((key) => {
      if (!form[key]) e[key] = "This field is required";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleCreate = async () => {
    if (!validate()) return;

    const payload = {
       clientId: 0, 
      businessName: form.name,
      businessType: form.industry,
      address: `${form.street}, ${form.city}, ${form.state} - ${form.zip}`,
      phoneNumber: form.phone,
      businessEmail: form.email,
    };

    try {
      // ✅ ONLY CREATE BUSINESS
await dispatch(createClientThunk(payload)).unwrap();
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error("Create client failed:", err);
    }
  };

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
    setErrors({ ...errors, [key]: "" });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl flex flex-col max-h-[90vh]">

          {/* HEADER */}
          <div className="flex items-start justify-between px-6 py-4 border-b">
            <div>
              <div className="flex items-center gap-2 text-purple-600">
                <UserPlus className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Create New Client</h2>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Add a new client to your portfolio
              </p>
            </div>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

            <Section icon={<Building2 />} title="Business Information">
              <Grid>
                <Input label="Business Name *" value={form.name} onChange={(v) => update("name", v)} error={errors.name} />
                <Input label="Industry *" value={form.industry} onChange={(v) => update("industry", v)} error={errors.industry} />
              </Grid>
            </Section>

            <Section icon={<User />} title="Contact Information">
              <Grid>
                <Input label="Contact Person *" value={form.contact} onChange={(v) => update("contact", v)} error={errors.contact} />
                <Input label="Email *" value={form.email} onChange={(v) => update("email", v)} error={errors.email} />
              </Grid>
              <Input label="Phone *" value={form.phone} onChange={(v) => update("phone", v)} error={errors.phone} />
            </Section>

            <Section icon={<MapPin />} title="Address Information">
              <Input label="Street Address *" value={form.street} onChange={(v) => update("street", v)} error={errors.street} />
              <Grid cols={3}>
                <Input label="City *" value={form.city} onChange={(v) => update("city", v)} error={errors.city} />
                <Input label="State *" value={form.state} onChange={(v) => update("state", v)} error={errors.state} />
                <Input label="ZIP *" value={form.zip} onChange={(v) => update("zip", v)} error={errors.zip} />
              </Grid>
            </Section>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t">
            <button onClick={onClose} className="px-4 py-2 border rounded-lg">
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-purple-600 text-white
                         disabled:opacity-60 disabled:cursor-not-allowed
                         shadow hover:shadow-[0_0_25px_rgba(168,85,247,0.7)]"
            >
              {loading ? "Creating..." : "Create Client"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- UI HELPERS ---------- */

function Section({ icon, title, children }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-purple-600">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Grid({ children, cols = 2 }) {
  return <div className={`grid grid-cols-${cols} gap-4`}>{children}</div>;
}

function Input({ label, value, onChange, error }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full mt-1 px-3 py-2 rounded-lg border text-sm
          ${error ? "border-red-400" : "border-gray-200"}
        `}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}