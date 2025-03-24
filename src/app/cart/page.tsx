import { Metadata } from 'next';
import CartPage from '@/components/pages/cart/Cart'
import Footer from '@/components/shared/footer/Footer'
import Navbar from '@/components/shared/navbar/Navbar'

export const metadata: Metadata = {
  title: "سبد خرید | سبزلرن",
  description: "مدیریت سبد خرید شما در سبزلرن. مشاهده، ویرایش و پرداخت دوره‌های انتخاب شده.",
  keywords: ["سبد خرید", "سبزلرن", "خرید دوره", "پرداخت آنلاین", "دوره‌های آموزشی", "نهایی کردن خرید"],
  icons: {
    icon: "/logo/fav.png",
  },
  openGraph: {
    title: "سبد خرید | سبزلرن",
    description: "مدیریت سبد خرید شما در سبزلرن. مشاهده، ویرایش و پرداخت دوره‌های انتخاب شده.",
    url: "https://www.sabzlearn.ir/cart",
    siteName: "سبزلرن",
    images: [
      {
        url: "https://www.sabzlearn.ir/images/cart-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "سبد خرید | سبزلرن",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "سبد خرید | سبزلرن",
    description: "مدیریت سبد خرید شما در سبزلرن. مشاهده، ویرایش و پرداخت دوره‌های انتخاب شده.",
    images: ["https://www.sabzlearn.ir/images/cart-twitter-image.jpg"],
  },
};

const page = () => {
  return (
    <div>
        <Navbar/>
        <CartPage/>
        <Footer/>
    </div>
  )
}

export default page