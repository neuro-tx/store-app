import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

const baseLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(60, "60 s"),
});

const roleLimit = {
  admin: new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(250, "60 s"),
  }),
  user: new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(110, "60 s"),
  }),
};

export async function ratelimit({
  ip,
  role = "user",
}: {
  ip: string;
  role?: "admin" | "user";
}) {
  const limiter = roleLimit[role] ?? baseLimit;

  return await limiter.limit(ip);
}
