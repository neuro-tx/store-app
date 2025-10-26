"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import z from "zod";

const loginSchema = z.object({
  userKey: z
    .string()
    .min(5, { message: "يجب أن يحتوي مفتاح المستخدم على 5 أحرف على الأقل." })
    .nonempty({ message: "حقل مفتاح المستخدم مطلوب." }),

  password: z
    .string()
    .min(6, { message: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل." })
    .nonempty({ message: "حقل كلمة المرور مطلوب." }),
});

const AuthPage = () => {
  const [userKey, setUserKey] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPending, transition] = useTransition();
  const router = useRouter();

  const authUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const submit = () => {
    transition(async () => {
      const validate = loginSchema.safeParse({ userKey, password });

      if (!validate.success) {
        toast.error("حدث خطأ أثناء التحقق من البيانات.");
        return;
      }

      try {
        const res = await fetch(`${authUrl}/api/auth`, {
          method: "POST",
          body: JSON.stringify(validate.data),
        });

        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message);
          return;
        }

        setTimeout(() => router.push("/admin"), 500);
        toast.success(data.message);
      } catch (error) {
        console.error("Login error:", error);
        toast.error("حدث خطأ أثناء الاتصال بالخادم.");
      }
    });
  };
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="font-cairo text-xl font-bold">
          تسجيل دخول المدير
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm leading-relaxed">
          أدخل مفتاح المستخدم وكلمة المرور للوصول إلى لوحة التحكم.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="أدخل مفتاح المستخدم"
            required
            className="text-sm"
            value={userKey}
            onChange={(e) => setUserKey(e.target.value)}
          />
          <Input
            type="password"
            placeholder="أدخل كلمة المرور"
            required
            className="text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          type="button"
          className="w-full text-sm text-white cursor-pointer"
          onClick={submit}
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>جارِ تسجيل الدخول...</span>
            </div>
          ) : (
            "تسجيل الدخول"
          )}{" "}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AuthPage;
