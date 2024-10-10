"use client";
import { Title } from "@/modules/common/components/Title";
import { ICart } from "@/modules/types/cart";
import ShoppingCartList from "../components/CartList";
import { CartSummary } from "../components/CartSummary";
import { CouponSection } from "../components/CouponSection";
import { useCartManager } from "../queries/use-cart-manager";

export const CartTemplate = () => {
  const { cart } = useCartManager();

  return (
    <div>
      <Title className="my-12" text="Cart" />

      <main className="container flex justify-between mx-auto px-4">
        <ShoppingCartList cart={cart as ICart} />
        <div className="flex flex-col gap-4">
          <CartSummary cart={cart as ICart} />
          <CouponSection cart={cart as ICart} />
        </div>
      </main>
    </div>
  );
};
