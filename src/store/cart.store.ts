import { applyDiscount } from "@/actions/discount.action";
import { toastOptions } from "@/helpers/toast";
import { toast } from "react-toastify";
import { create } from "zustand";

interface ICart {
  id: number;
  category: string;
  title: string;
  cover: string;
  shortName: string;
  price: number;
  discount?: number;
}

interface CartStore {
  cartItems: ICart[];
  totalPrice: number;
  totalDiscount: number;
  additionalDiscount: number;
  discountCode: string;
  discountApplied: boolean;
  loading : boolean;
  addToCart: (cart: ICart) => void;
  deleteCart: (name: string) => void;
  getCartItems: () => void;
  applyDiscount: (code: string) => void;
  calculateTotals: () => void;
  resetCartItems: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],
  totalPrice: 0,
  totalDiscount: 0,
  additionalDiscount: 0,
  discountCode: "",
  discountApplied: false,
  loading : false,

  addToCart(cart) {
    const previousItems = JSON.parse(
      localStorage.getItem("sabzCart") || "[]"
    ) as ICart[];
    const isCartExist = previousItems.some((item) => item.title === cart.title);
    if (isCartExist) {
      toast.info("محصول مورد نظر در سبد خرید شما وجود دارد");
      return;
    }
    const updatedItems = [...previousItems, cart];
    set({ cartItems: updatedItems });
    localStorage.setItem("sabzCart", JSON.stringify(updatedItems));
    toast.success("محصول با موفقیت به سبد خرید شما اضافه شد");
    get().calculateTotals();
  },

  deleteCart(name) {
    const items = JSON.parse(
      localStorage.getItem("sabzCart") as string
    ) as ICart[];
    const updatedItems = items.filter((item) => item.title !== name);
    localStorage.setItem("sabzCart", JSON.stringify(updatedItems));
    set({ cartItems: updatedItems });
    get().calculateTotals();
  },

  getCartItems() {
    const items = JSON.parse(localStorage.getItem("sabzCart") as string) || [];
    if (items.length === 0) {
      localStorage.setItem("sabzCart", JSON.stringify(items));
      set({ cartItems: items });
    } else {
      set({ cartItems: items });
    }
    get().calculateTotals();
  },

  applyDiscount: async (code) => {
   try {
    set({loading : true})
    const { totalPrice } = get();
    const res = await applyDiscount(code);
    if (res.success) {
      const discountAmount = totalPrice * (res.data.discount / 100);
      set({ additionalDiscount: discountAmount, discountApplied: true , loading : false });
      toast.success("کد تخفیف اعمال شد!", toastOptions);
      return
    }
    if (res.message === 'Invalid discount code'){
      toast.error("کد تخفیف نامعتبر است.", toastOptions);
      set({ additionalDiscount: 0, discountApplied: false });
      return
    }
    if (res.message === 'Discount code not found'){
      toast.error("کد تخفیف نامعتبر است.", toastOptions);
      set({ additionalDiscount: 0, discountApplied: false });
      return
    }
    if (res.message === 'Discount code has been used the maximum number of times'){
      toast.error("کد تخفیف شما به حد مجاز استفاده رسیده است.", toastOptions)
      return
    }
    throw new Error(res.message)
   } catch (error) {
    console.log('error in apply disocunt => ' , error);
   }finally{
    set({loading : false})
   }
  },

  calculateTotals() {
    const { cartItems } = get();
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const discount = cartItems.reduce(
      (sum, item) =>
        sum + (item.discount ? (item.price * item.discount) / 100 : 0),
      0
    );
    set({ totalPrice: total, totalDiscount: discount });
  },
  resetCartItems : ()=>{
    localStorage.removeItem("sabzCart");
    set({ cartItems: [], totalPrice: 0, totalDiscount: 0, additionalDiscount: 0, discountCode: "", discountApplied: false });
  }
}));