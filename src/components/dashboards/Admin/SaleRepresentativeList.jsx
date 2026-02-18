import { useDispatch, useSelector } from "react-redux";
import { getInitials } from "@/utils";
import { useEffect, useState } from "react";
import {
  fetchSalesRepByThunk,
  fetchSalesRepByIdThunk,
} from "@/features/admin/adminSlice";
import { Eye, MoreVertical } from "lucide-react";
import SalesRepDetails from "./SalesRepDetails";

const SaleRepresentativeList = () => {
  const dispatch = useDispatch();
  const { salesReps } = useSelector((state) => state.admin);

  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchSalesRepByThunk());
  }, []);

  return (
    <div className="space-y-4">
      {salesReps.map((rep) => (
        <div
          key={rep.id}
          className="group flex flex-col gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-900/50 bg-gray-50/50 dark:bg-gray-800/50 hover:shadow transition duration-200"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-3 sm:gap-4 min-w-0">
              {/* Glow + initials circle — restored as in original */}
              <div className="relative group">
                <div
                  className={`absolute inset-0 rounded-full blur-xl opacity-60 bg-pink-500`}
                ></div>
                <div
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg bg-pink-500 transition-transform duration-300 group-hover:scale-110`}
                >
                  {getInitials(rep.firstName + " " + rep.lastName)}
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate max-w-[220px] sm:max-w-none">
                    {rep.firstName} {rep.lastName}
                  </h3>

                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {rep.id}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1 truncate max-w-[300px] sm:max-w-none">
                  {rep.email}{" "}
                  {rep.mobileNumber && (
                    <span className="xs:inline"> • {rep.mobileNumber}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-sm font-medium rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all"
                onClick={() => {
                  const id = rep.id;

                  dispatch(fetchSalesRepByIdThunk(id));
                  setDetailsOpen(true);
                }}
              >
                <Eye size={14} />
                <span className="hidden sm:inline">View Details</span>
              </button>

              <button className="p-2 rounded-lg text-gray-400 hover:bg-purple-600 hover:text-white transition">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-end gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="flex gap-6 sm:gap-8">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  Clients
                </p>
                <p className="font-bold text-gray-900 dark:text-white">
                  👥 {rep.totalClients}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">
                  Revenue
                </p>
                <p className="font-bold text-gray-900 dark:text-white">
                  💰 {rep.revenue}
                </p>
              </div>
            </div>

            <div className="w-full sm:w-48">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Performance</span>
                <span className="font-bold text-purple-600">%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-600 rounded-full transition-all"
                  // style={{
                  //   width: `${Math.min(100, Math.max(0, rep.performance))}%`,
                  // }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <SalesRepDetails
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </div>
  );
};

export default SaleRepresentativeList;
