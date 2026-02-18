export const USER_ROLES = {
    ADMIN: 'ADMIN',
    SALE_REPRESENTATIVE: 'SALE_REPRESENTATIVE',
    CLIENT: 'CLIENT',
    USER: 'USER'
}

export const ROUTES = {
    HOME: '/',
    LOGIN: '/signup',
    UNAUTHORIZED: '/unauthorized',
    ADMIN_DASHBOARD: '/admin',
    SALES_DASHBOARD: '/sales',
    NEW_CLIENT: '/sales/new-client',
    SALES_REPORT: '/sales/report',
    CLIENT_DASHBOARD: '/client',


 // ✅ CUSTOMER (PUBLIC – QR FLOW)
  CUSTOMER: "/customer",
  CUSTOMER_REVIEW: "/customer/review/:qrCodeId",
};


