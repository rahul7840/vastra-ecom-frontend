"use client";
import { Title } from "@/modules/common/components/Title";
import { ICart } from "@/modules/types/cart";
import { Addresses } from "../components/Addresses";
import { CartSummary } from "../components/CartSummary";
import { useCartManager } from "../queries/use-cart-manager";

export const CheckoutTemplate = () => {
  const { cart } = useCartManager();

  return (
    <div>
      <Title className="my-12" text="Checkout" />

      <main className="container flex justify-between mx-auto px-4">
        <div className="flex flex-col gap-4">
          <div className="text-2xl font-semibold tracking-wide leading-snug text-neutral-800">
            Shipping Address
          </div>
          <Addresses />

          <hr className="border-neutral-100" />

          <div className="text-2xl font-semibold tracking-wide leading-snug text-neutral-800">
            Shipping
          </div>
          <div>
            <div>₹ - Standard</div>
            <div>Delivery By: </div>
          </div>

          <hr className="border-neutral-100" />

          <div className="text-2xl font-semibold tracking-wide leading-snug text-neutral-800">
            Payment Method
          </div>
          <div></div>
        </div>
        <div className="flex flex-col gap-4">
          <CartSummary checkout={true} cart={cart as ICart} />
        </div>
      </main>
    </div>
  );
};
