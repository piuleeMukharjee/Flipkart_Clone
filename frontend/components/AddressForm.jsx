"use client";

import { useState } from "react";

const empty = {
  fullName: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  pincode: "",
  isDefault: false,
};

export default function AddressForm({ onSubmit, loading }) {
  const [form, setForm] = useState(empty);

  const set =
    (k) =>
    (e) => {
      const v =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setForm((f) => ({ ...f, [k]: v }));
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form);
    setForm(empty);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-sm border border-gray-200 bg-white p-4 shadow-card"
    >
      <h3 className="font-semibold text-gray-900">Add new address</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-gray-600">Full name</span>
          <input
            required
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-flipkart-blue"
            value={form.fullName}
            onChange={set("fullName")}
          />
        </label>
        <label className="block text-sm">
          <span className="text-gray-600">Phone</span>
          <input
            required
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-flipkart-blue"
            value={form.phone}
            onChange={set("phone")}
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="text-gray-600">Street / House no.</span>
          <input
            required
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-flipkart-blue"
            value={form.street}
            onChange={set("street")}
          />
        </label>
        <label className="block text-sm">
          <span className="text-gray-600">City</span>
          <input
            required
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-flipkart-blue"
            value={form.city}
            onChange={set("city")}
          />
        </label>
        <label className="block text-sm">
          <span className="text-gray-600">State</span>
          <input
            required
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-flipkart-blue"
            value={form.state}
            onChange={set("state")}
          />
        </label>
        <label className="block text-sm">
          <span className="text-gray-600">Pincode</span>
          <input
            required
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-flipkart-blue"
            value={form.pincode}
            onChange={set("pincode")}
          />
        </label>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input
            type="checkbox"
            checked={form.isDefault}
            onChange={set("isDefault")}
          />
          Set as default address
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded-sm bg-flipkart-blue px-6 py-2.5 font-semibold text-white hover:bg-[#1f5fce] disabled:opacity-60"
      >
        {loading ? "Saving…" : "Save address"}
      </button>
    </form>
  );
}
