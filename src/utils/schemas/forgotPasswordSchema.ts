import { z } from "zod";

export const schema = z.object({
  email: z.string().email("لطفاً یک ایمیل معتبر وارد کنید.")
});

export type ForgotPasswordSchemaType = z.infer<typeof schema>