import { api } from "@/api";
import { IApiError } from "@/api/types";
import { ICheckServiceability } from "@/modules/types/cart";
import { setShippingCharges } from "@/store/slices/cartSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useCartManager } from "../queries/use-cart-manager";
import { AddressForm } from "./AddressForm";
import {
  BillingAddressSchema,
  billingAddressSchema,
  ShippingAddressSchema,
  shippingAddressSchema,
} from "./contact-info-schema";

export const Addresses: React.FC = () => {
  const { cart } = useCartManager();

  const [useDifferentBillingAddress, setUseDifferentBillingAddress] =
    useState(false);

  const [showForm, setShowForm] = useState(false);

  const billingAddressForm = useForm<billingAddressSchema>({
    resolver: zodResolver(BillingAddressSchema),
  });

  const shippingAddressForm = useForm<shippingAddressSchema>({
    defaultValues: {
      shippingAddress: "BazarGate gate 1",
      shippingCity: "BazarGate",
      shippingState: "Mumbai",
      shippingZipCode: "400001",
    },
    resolver: zodResolver(ShippingAddressSchema),
  });

  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: (data: ICheckServiceability) => api.shipping.getCharges(data),
    onSuccess: (response) => {
      dispatch(
        setShippingCharges({
          shippingCost: response.data.data?.shippingCost ?? 0,
          estimatedDeliveryDate:
            response.data.data?.estimatedDeliveryDate ?? "",
        })
      );
      setShowForm(false);
      toast.success("Address saved successfully.");
    },
    onError: (error: IApiError) => {
      if (error.response?.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    shippingAddressForm.handleSubmit(onShippingSubmit)();

    if (useDifferentBillingAddress) {
      billingAddressForm.handleSubmit(onBillingSubmit)();
    }

    if (shippingAddressForm.getValues("shippingZipCode")) {
      mutation.mutate({
        cod: 0,
        delivery_postcode: shippingAddressForm.getValues("shippingZipCode"),
      });
    }
  };

  const onShippingSubmit = (data: shippingAddressSchema) => {};

  const onBillingSubmit = (data: billingAddressSchema) => {};

  return (
    <>
      <div>
        {cart?.shippingAddress && (
          <div className="border p-4 mb-4">
            <h3 className="font-semibold">Shipping Address</h3>
            <p>{cart?.shippingAddress?.address1}</p>
            <p>{cart?.shippingAddress?.address2}</p>
            <p>
              {cart?.shippingAddress?.city}, {cart?.shippingAddress?.state}{" "}
              {cart?.shippingAddress?.pincode}
            </p>
          </div>
        )}
        {cart?.billingAddress && (
          <div className="border p-4 mb-4">
            <h3 className="font-semibold">Billing Address</h3>
            <p>{cart?.billingAddress?.address1}</p>
            <p>
              {cart?.billingAddress?.city}, {cart?.billingAddress?.state}{" "}
              {cart?.billingAddress?.pincode}
            </p>
          </div>
        )}
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-red-700 text-white rounded"
        >
          Edit Addresses
        </button>
      </div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col tracking-wide leading-snug max-w-[688px]"
      >
        <h2 className="text-2xl font-semibold text-neutral-800 mt-8 mb-4">
          Shipping Address
        </h2>
        <AddressForm
          prefix="shipping"
          onSubmit={onShippingSubmit as any}
          form={shippingAddressForm as any}
        />

        <label className="flex gap-3 items-center self-start mt-6 text-neutral-400 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={useDifferentBillingAddress}
            onChange={(e) => setUseDifferentBillingAddress(e.target.checked)}
          />
          <span
            className={`flex items-center justify-center w-5 h-5 border border-neutral-400 rounded-sm ${
              useDifferentBillingAddress ? "bg-red-700" : ""
            }`}
          >
            {useDifferentBillingAddress && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            )}
          </span>
          <span>Use a different billing address (optional)</span>
        </label>

        {useDifferentBillingAddress && (
          <>
            <h2 className="text-2xl font-semibold text-neutral-800 mt-8 mb-4">
              Billing Address
            </h2>
            <AddressForm
              prefix="billing"
              onSubmit={onBillingSubmit as any}
              form={billingAddressForm as any}
            />
          </>
        )}

        <button
          type="submit"
          className="gap-3 self-stretch px-8 py-3.5 mt-6 w-full text-2xl font-bold text-center text-white bg-red-700 max-md:px-5 max-md:max-w-full"
        >
          Save
        </button>
      </form>
    </>
  );
};
