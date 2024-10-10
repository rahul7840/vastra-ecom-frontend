import { z } from "zod";

export const ShippingAddressSchema = z.object({
  shippingAddress: z.string().min(1, "Address is required"),
  shippingCity: z.string().min(1, "City is required"),
  shippingState: z.string().min(1, "State is required"),
  shippingZipCode: z.string().min(1, "Zip code is required"),
});

export type shippingAddressSchema = z.infer<typeof ShippingAddressSchema>;

export const BillingAddressSchema = z.object({
  billingAddress: z.string(),
  billingCity: z.string(),
  billingState: z.string(),
  billingZipCode: z.string(),
});

export type billingAddressSchema = z.infer<typeof BillingAddressSchema>;
