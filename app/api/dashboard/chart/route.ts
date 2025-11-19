import { getChartData } from "@/controller/dashborad.controller";
import { errorHandler } from "@/lib/errorHandler";
import { success } from "@/lib/states";

export const GET = errorHandler(async (req: Request) => {
  const data = await getChartData();
  return success(data, 200);
});
