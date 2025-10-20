import "server-only";
import { fail } from "./states";

export function errorHandler<T extends (...args: any[]) => Promise<any>>(
  handler: T
) {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await handler(...args);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("❌ API Error:", error);
      } else {
        console.error("❌ API Error:", {
          message: error instanceof Error ? error.message : "Unknown error",
          name: error instanceof Error ? error.name : "Error",
        });
      }

      // Handle MongoDB duplicate key errors
      if ((error as any).code === 11000) {
        const message =
          "تم رفض العملية لأن هذه البيانات مسجلة مسبقًا. يُرجى استخدام قيم مختلفة أو التحقق من وجود العنصر مسبقًا.";
        return fail(409, message) as ReturnType<T>;
      }

      if (error instanceof Error) {
        const message =
          process.env.NODE_ENV === "development"
            ? error.message
            : "حدث خطأ داخلي في الخادم.";
        return fail(500, message) as ReturnType<T>;
      }

      return fail(500, "Unknown server error") as ReturnType<T>;
    }
  };
}
