import { getDashboardCards } from "@/features/dashborad"
import { errorHandler } from "@/lib/errorHandler"

export const GET = errorHandler(async (req: Request) => {
    return await getDashboardCards();
})