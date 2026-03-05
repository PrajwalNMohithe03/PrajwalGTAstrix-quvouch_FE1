import { X } from "lucide-react";
import { useSelector } from "react-redux";

export default function SalesRepDetails({ open, onClose }) {
  const { selectedSalesRep, loading } = useSelector((state) => state.admin);

  if (loading) return <p>Loading...</p>;
  if (!selectedSalesRep) return <p>No data</p>;
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg relative">
        <div className="space-y-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition duration-200"
          >
            <X size={24} />
          </button>
          {/* Header Section */}
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-semibold">
              {selectedSalesRep.firstName?.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedSalesRep.firstName} {selectedSalesRep.lastName}
              </h3>
              <p className="text-sm text-gray-500">Sales Representative</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t"></div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">User ID</p>
              <p className="font-medium text-gray-800">
                {selectedSalesRep.userId}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium text-gray-800">
                {selectedSalesRep.email}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Mobile</p>
              <p className="font-medium text-gray-800">
                {selectedSalesRep.mobileNumber}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Address</p>
              <p className="font-medium text-gray-800">
                {selectedSalesRep.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
