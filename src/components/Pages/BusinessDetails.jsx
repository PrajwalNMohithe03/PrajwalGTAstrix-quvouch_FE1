import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinessById } from "../../features/business/businessThunk";

export default function BusinessDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedBusiness, loading, error } = useSelector(
    (state) => state.business
  );

  useEffect(() => {
    dispatch(fetchBusinessById(id));
  }, [dispatch, id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!selectedBusiness) return <p className="p-6">No Data Found</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">
        {selectedBusiness.businessName}
      </h1>

      <div className="space-y-2">
        <p><strong>Type:</strong> {selectedBusiness.businessType}</p>
        <p><strong>BusinessEmail:</strong> {selectedBusiness.businessEmail}</p>
        <p><strong>Phone:</strong> {selectedBusiness.phoneNumber}</p>
        <p><strong>Address:</strong> {selectedBusiness.address}</p>
        <p><strong>Status:</strong> {selectedBusiness.status}</p>
      </div>
    </div>
  );
}
