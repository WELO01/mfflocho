/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Navigation, Star } from "lucide-react";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// 🧩 VALIDACIÓN ZOD
const schema = z.object({
  fullName: z.string().min(2, "Enter full name"),
  address: z.string().min(5, "Enter a valid address"),
  city: z.string().min(2, "Enter city"),
  state: z.string().min(2, "Enter state"),
  zip: z.string().min(3, "Enter ZIP code"),
  country: z.string().min(2, "Enter country"),
  primary: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

interface ShippingAddressFormProps {
  onSubmit: (data: FormValues) => void;
  defaultValues?: Partial<FormValues>;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function ShippingAddressForm({
  onSubmit,
  defaultValues,
}: ShippingAddressFormProps) {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      primary: false,
      ...defaultValues,
    },
  });

  const addressRef = useRef<HTMLInputElement | null>(null);
  const primary = watch("primary");

  // ⭐ GOOGLE AUTOCOMPLETE — CORRECTO
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!addressRef.current) return;

    const interval = setInterval(() => {
      if (window.google?.maps?.places) {
        clearInterval(interval);

        const autocomplete = new window.google.maps.places.Autocomplete(
          addressRef.current!,
          {
            types: ["address"],
            fields: ["address_components", "geometry", "formatted_address"],
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (!place.address_components) return;

          const components: Record<string, string> = {};

          place.address_components.forEach((comp: any) => {
            comp.types.forEach((type: string) => {
              components[type] = comp.long_name;
            });
          });

          const formatted = place.formatted_address ?? "";

          // 🚀 IMPORTANTE: actualizamos react-hook-form
          setValue("address", formatted, { shouldValidate: true });
          setValue("city", components.locality ?? components.sublocality ?? "");
          setValue("state", components.administrative_area_level_1 ?? "");
          setValue("country", components.country ?? "");
          setValue("zip", components.postal_code ?? "");
        });
      }
    }, 300);

    return () => clearInterval(interval);
  }, [setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white/10 border border-cyan-700/30 p-6 rounded-2xl shadow-xl text-white space-y-5 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-cyan-400 mb-4 flex items-center gap-2">
        <MapPin className="w-6 h-6 text-cyan-300" /> Shipping Address
      </h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <Controller
            control={control}
            name="fullName"
            render={({ field }) => (
              <input
                {...field}
                className="w-full bg-transparent border border-cyan-700/40 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="John Doe"
              />
            )}
          />
          {errors.fullName && (
            <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>

        {/* Address - CON GOOGLE AUTOCOMPLETE */}
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>

          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <input
                {...field}
                ref={(el) => {
                  addressRef.current = el;
                  field.ref(el);
                }}
                className="w-full bg-transparent border border-cyan-700/40 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="123 Main St"
              />
            )}
          />

          {errors.address && (
            <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <input
                {...field}
                className="w-full bg-transparent border border-cyan-700/40 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="Hampton"
              />
            )}
          />
          {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>}
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <Controller
            control={control}
            name="state"
            render={({ field }) => (
              <input
                {...field}
                className="w-full bg-transparent border border-cyan-700/40 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="NH"
              />
            )}
          />
          {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state.message}</p>}
        </div>

        {/* ZIP */}
        <div>
          <label className="block text-sm font-medium mb-1">ZIP Code</label>
          <Controller
            control={control}
            name="zip"
            render={({ field }) => (
              <input
                {...field}
                className="w-full bg-transparent border border-cyan-700/40 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="03842"
              />
            )}
          />
          {errors.zip && <p className="text-red-400 text-sm mt-1">{errors.zip.message}</p>}
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <input
                {...field}
                className="w-full bg-transparent border border-cyan-700/40 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="United States"
              />
            )}
          />
          {errors.country && (
            <p className="text-red-400 text-sm mt-1">{errors.country.message}</p>
          )}
        </div>
      </div>

      {/* ⭐ Primary address toggle */}
      <div className="flex items-center gap-2 pt-2">
  <Controller
    control={control}
    name="primary"
    render={({ field }) => (
      <input
        id="primary"
        type="checkbox"
        checked={field.value}
        onChange={(e) => field.onChange(e.target.checked)}
        className="w-5 h-5 accent-cyan-500 cursor-pointer"
        ref={field.ref}
      />
    )}
  />

  <label
    htmlFor="primary"
    className="text-sm cursor-pointer flex items-center gap-1"
  >
    <Star
      className={`w-4 h-4 ${
        primary ? "text-yellow-400" : "text-cyan-300"
      }`}
    />
    Set this address as primary
  </label>
</div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center items-center gap-2 bg-cyan-500 hover:bg-cyan-400 transition text-white font-semibold py-2 rounded-lg shadow-md"
      >
        <Navigation className="w-5 h-5" />
        {isSubmitting ? "Saving..." : "Save Address"}
      </button>
    </form>
  );
}
