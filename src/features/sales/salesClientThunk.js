// 🔹 Create New Client
export const createClientThunk = createAsyncThunk(
  "sales/createClient",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(
        API_PATHS.SALES.MY_CLIENTS, // "/api/v1/sales/clients"
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create client"
      );
    }
  }
);
/* ================= GET CLIENT BY ID ================= */
export const fetchSalesClientByIdThunk = createAsyncThunk(
  "sales/fetchClientById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(
        API_PATHS.SALES.CLIENT_BY_ID(id)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch client"
      );
    }
  }
);


/* ================= UPDATE CLIENT ================= */
export const updateClientThunk = createAsyncThunk(
  "sales/updateClient",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        API_PATHS.SALES.UPDATE_CLIENT(id),
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update client"
      );
    }
  }
);


/* ================= DELETE CLIENT ================= */
export const deleteClientThunk = createAsyncThunk(
  "sales/deleteClient",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(
        API_PATHS.SALES.DELETE_CLIENT(id)
      );
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete client"
      );
    }
  }
);


/* ================= TOGGLE BUSINESS STATUS ================= */
export const toggleBusinessStatusThunk = createAsyncThunk(
  "sales/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        API_PATHS.SALES.TOGGLE_BUSINESS_STATUS(id)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to toggle status"
      );
    }
  }
);


/* ================= SEARCH CLIENTS ================= */
export const searchClientsThunk = createAsyncThunk(
  "sales/searchClients",
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await api.get(
        API_PATHS.SALES.SEARCH_CLIENTS,
        { params: { keyword } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to search clients"
      );
    }
  }
);


/* ================= FILTER BY STATUS ================= */
export const fetchClientsByStatusThunk = createAsyncThunk(
  "sales/filterByStatus",
  async (status, { rejectWithValue }) => {
    try {
      const response = await api.get(
        API_PATHS.SALES.CLIENTS_BY_STATUS,
        { params: { status } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to filter clients"
      );
    }
  }
);


/* ================= ASSIGN QR ================= */
export const assignQrToClientThunk = createAsyncThunk(
  "sales/assignQr",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(
        API_PATHS.SALES.ASSIGN_QR,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to assign QR"
      );
    }
  }
);


/* ================= UNASSIGNED QR ================= */
export const fetchUnassignedQrThunk = createAsyncThunk(
  "sales/unassignedQr",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        API_PATHS.SALES.UNASSIGNED_QR
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch unassigned QR"
      );
    }
  }
);


/* ================= MY ASSIGNED QR ================= */
export const fetchMyAssignedQrThunk = createAsyncThunk(
  "sales/myAssignedQr",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        API_PATHS.SALES.MY_ASSIGNED_QR
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch my QR codes"
      );
    }
  }
);


/* ================= ACTIVE QR ================= */
export const fetchActiveQrThunk = createAsyncThunk(
  "sales/activeQr",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        API_PATHS.SALES.ACTIVE_QR
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch active QR"
      );
    }
  }
);


/* ================= REGISTERED USERS ================= */
export const fetchRegisteredUsersThunk = createAsyncThunk(
  "sales/registeredUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        API_PATHS.SALES.REGISTERED_USERS
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch registered users"
      );
    }
  }
);


/* ================= SALES PROFILE ================= */
export const fetchSalesProfileThunk = createAsyncThunk(
  "sales/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        API_PATHS.SALES.PROFILE
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch profile"
      );
    }
  }
);