"use client";
import { ICart } from "@/modules/types/cart";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import SummaryItem from "./SummaryItem";

interface CartSummaryProps {
  cart: ICart;
  checkout?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ cart, checkout }) => {
  const charges = useSelector((state: RootState) => state.cart.shippingCharges);

  console.log("cartttt", cart);

  const router = useRouter();

  const total = cart?.subtotal + (charges ? charges?.shippingCost : 0);

  return (
    <section className="flex flex-col p-8 max-w-full bg-white border border-solid border-neutral-100 w-[551px] max-md:px-5">
      <h2 className="text-2xl font-semibold tracking-wide leading-snug text-neutral-800">
        Cart summary
      </h2>
      <div className="flex flex-col mt-5 w-full max-md:max-w-full">
        <div className="flex flex-col pb-11 w-full max-md:max-w-full">
          <SummaryItem
            label={"Subtotal"}
            value={cart?.subtotal ?? 0}
            isBold={true}
          />

          <SummaryItem
            label={"Shipping"}
            value={charges ? charges.shippingCost : null}
            isBold={false}
          />
          <SummaryItem label={"Total"} value={total} isBold={false} />
        </div>
        <button
          onClick={() => {
            checkout ? "" : router.push("/checkout");
          }}
          className="gap-3 self-stretch px-9 py-3.5 w-full text-2xl font-bold tracking-wide leading-snug text-center text-white whitespace-nowrap bg-red-700 max-md:px-5 max-md:max-w-full"
        >
          {checkout ? "Place Order" : "Checkout"}
        </button>
      </div>
    </section>
  );
};
