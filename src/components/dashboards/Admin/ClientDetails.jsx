// import { useSelector } from "react-redux";

// export default function ClientDetails({ open, onClose }) {
//   const { selectedClient, clientLoading } = useSelector((state) => state.admin);

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
//         <h2 className="text-xl font-semibold mb-4">Client Details</h2>

//         {clientLoading ? (
//           <p>Loading...</p>
//         ) : selectedClient ? (
//           <div className="space-y-2">
//             <p>
//               <b>Name:</b> {selectedClient.name}
//             </p>
//             <p>
//               <b>Email:</b> {selectedClient.email}
//             </p>
//             <p>
//               <b>Phone:</b> {selectedClient.phone}
//             </p>
//             <p>
//               <b>Type:</b> {selectedClient.type}
//             </p>
//           </div>
//         ) : (
//           <p>No data</p>
//         )}

//         <button
//           onClick={onClose}
//           className="mt-4 px-4 py-2 bg-black text-white rounded"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }
