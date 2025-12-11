"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import PaymentModal from "@/app/components/Payment/PaymentModal";
import TumblerModelShowcase from "./thumblerModel";
import {
  TumblerModel,
  useCreateTumblerOrderMutation,
  useGetTumblerModelsQuery,
} from "./thumblersModelApi";

export default function CustomTumblerCreatorPro() {
  const t = useTranslations("");

  const { data: tumblerModels = [], isLoading } = useGetTumblerModelsQuery();
  const [createTumblerOrder] = useCreateTumblerOrderMutation();

  const [customText, setCustomText] = useState("");
  const [customerDescription, setCustomerDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [tumblerColor, setTumblerColor] = useState("white");
  const [quantity, setQuantity] = useState(1);
  const [selectedModel, setSelectedModel] = useState<TumblerModel | null>(null);

  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState<number | null>(null);

  // 📌 MULTIPLE IMAGE UPLOAD (1–15)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesArr = Array.from(e.target.files || []);
    if (filesArr.length === 0) return;

    if (filesArr.length > 15) {
      alert("Máximo 15 imágenes.");
      return;
    }

    setUploadedFiles(filesArr);

    const previews = filesArr.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // 📌 SAVE ORDER with FORM DATA
  const handleSave = async () => {
    if (!selectedModel) return alert(t("errors.selectModel"));
    if (uploadedFiles.length === 0)
      return alert("Debes subir al menos 1 imagen");

    const unitPrice = selectedModel.price;
    const subtotal = unitPrice * quantity;

    const formData = new FormData();

    formData.append("tumblerModelId", selectedModel.id);
    formData.append("tumblerColor", tumblerColor);
    formData.append("customText", customText);
    formData.append("customerDescription", customerDescription);
    formData.append("quantity", String(quantity));
    formData.append("unitPrice", String(unitPrice));
    formData.append("subtotal", String(subtotal));

    uploadedFiles.forEach((file) => formData.append("images", file));

    try {
      const res = await createTumblerOrder(formData).unwrap();

      setClientSecret(res.clientSecret);
      setAmount(res.amount);
      setShowPayment(true);

      // Reset UI
      setCustomText("");
      setCustomerDescription("");
      setUploadedFiles([]);
      setPreviewImages([]);
      setQuantity(1);
    } catch (error) {
      console.error("❌ Error creating tumbler order:", error);
      alert("Error creando la orden");
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-white py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-cyan-400 mb-4">
          {t("title")}
        </h1>

        <p className="text-center text-gray-300 mb-8">
          {t("subtitle")}{" "}
          <span className="text-cyan-400 font-semibold">
            {t("qualityNote")}
          </span>
        </p>

        {isLoading ? (
          <p className="text-center text-cyan-300">{t("modelsLoading")}</p>
        ) : (
          <TumblerModelShowcase
            models={tumblerModels}
            onSelect={(m) => setSelectedModel(m)}
          />
        )}

        <div className="bg-black/40 border border-cyan-500/30 rounded-xl p-6 mt-8 shadow-lg">
          {/* Upload Button */}
          <label className="flex items-center justify-center w-full cursor-pointer bg-cyan-600 hover:bg-cyan-500 text-black font-semibold py-3 rounded-lg shadow-md transition mb-4">
            {t("uploadLabel")}
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>

          {/* Previews */}
          {previewImages.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mb-4">
              {previewImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className="w-full h-24 object-cover rounded-lg border border-cyan-400/40"
                />
              ))}
            </div>
          )}

          {/* Custom Text */}
          <label className="block mt-4 mb-2 font-semibold text-cyan-400">
            {t("customTextLabel")}
          </label>

          <input
            value={customText}
            placeholder={t("customTextPlaceholder")}
            onChange={(e) => setCustomText(e.target.value)}
            className="border border-cyan-400/20 bg-black/70 p-3 w-full rounded-lg text-white"
          />

          {/* Description */}
          <label className="block mt-4 mb-2 font-semibold text-cyan-400">
            {t("customerDescriptionLabel")}
          </label>

          <textarea
            maxLength={250}
            value={customerDescription}
            placeholder={t("customerDescriptionPlaceholder")}
            onChange={(e) => setCustomerDescription(e.target.value)}
            className="border border-cyan-400/20 bg-black/70 p-3 w-full h-24 rounded-lg text-white resize-none"
          />

          {/* Tumbler Color */}
          <label className="font-semibold text-cyan-400 mt-4">
            {t("colorLabel")}
          </label>

          <select
            value={tumblerColor}
            onChange={(e) => setTumblerColor(e.target.value)}
            className="border border-cyan-400/20 bg-black/70 p-3 w-full rounded-lg mt-2 text-white"
          >
            <option value="white">{t("colorWhite")}</option>
            <option value="black">{t("colorBlack")}</option>
            <option value="pink">{t("colorPink")}</option>
          </select>

          {/* Quantity */}
          <label className="font-semibold text-cyan-400 mt-4">
            {t("quantityLabel")}
          </label>

          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border border-cyan-400/20 bg-black/70 p-3 w-full rounded-lg mt-2 text-white"
          />

          {/* Submit */}
          <button
            onClick={handleSave}
            className="mt-6 w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-lg shadow-lg transition-all"
          >
            {t("sendButton")}
          </button>
        </div>
      </div>

      {showPayment && clientSecret && amount && (
        <PaymentModal
          clientSecret={clientSecret}
          amount={amount}
          onClose={() => setShowPayment(false)}
        />
      )}
    </div>
  );
}
