import { z } from "zod";

export const schema = z
  .object({
    username: z
      .string()
      .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد.")
      .max(20, "نام کاربری نباید بیشتر از ۲۰ کاراکتر باشد.")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "نام کاربری فقط می‌تواند شامل حروف، اعداد و آندرلاین باشد."
      ),

    email: z.string().email("لطفاً یک ایمیل معتبر وارد کنید."),

    name: z
      .string()
      .min(6, "نام باید حداقل ۶ کاراکتر باشد.")
      .max(30, "نام نباید بیشتر از ۳۰ کاراکتر باشد."),

    password: z
      .string()
      .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد.")
      .max(20, "رمز عبور نباید بیشتر از ۲۰ کاراکتر باشد.")
      .regex(/[A-Z]/, "رمز عبور باید حداقل یک حرف بزرگ (A-Z) داشته باشد.")
      .regex(/[a-z]/, "رمز عبور باید حداقل یک حرف کوچک (a-z) داشته باشد.")
      .regex(/[0-9]/, "رمز عبور باید حداقل یک عدد (0-9) داشته باشد.")
      .regex(
        /[^a-zA-Z0-9]/,
        "رمز عبور باید حداقل یک کاراکتر خاص (!@#$%^&*) داشته باشد."
      ),

    phone: z
      .string()
      .regex(/^09[0-9]{9}$/, "لطفاً یک شماره موبایل معتبر وارد کنید."),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن مطابقت ندارند.",
    path: ["confirmPassword"]
  });

export type SignupSchemaType = z.infer<typeof schema>;