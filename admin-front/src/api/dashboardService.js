import apiPrivate from "./axiosPrivate"

export const getDashboardStats = async () => {
    return apiPrivate.get("/admin/dashboard/")
}