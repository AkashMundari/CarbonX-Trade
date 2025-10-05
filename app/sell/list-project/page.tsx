"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { submitActivity } from "@/lib/contract"; // <-- blockchain integration

export default function ListProjectPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    location: "",
    category: "forestry",
    methodology: "VCS",
    price: "",
    available: "",
    image: "",
    description: "",
  });
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onImageFile = (file?: File) => {
    if (!file) return;
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = String(fr.result);
      setForm((f) => ({ ...f, image: dataUrl }));
      setPreview(dataUrl);
    };
    fr.readAsDataURL(file);
  };

  const save = async () => {
    setLoading(true);
    setError("");
    try {
      // 🔹 Use available tCO₂e as the "reduction" input (each ton = 1000 kg)
      const reduction = Number(form.available || 0) * 1000;
      const description = `${form.name} - ${form.description || "No description"} (${form.location}, ${form.category}, ${form.methodology})`;

      const tx = await submitActivity(description, reduction);
      console.log("Submitted activity:", tx);

      // 🔹 Save locally for UI (optional)
      const newProject = {
        id: `${Date.now()}`,
        name: form.name,
        location: form.location,
        category: form.category,
        methodology: form.methodology,
        price: Number(form.price || 0),
        available: Number(form.available || 0),
        image: form.image || "/placeholder.jpg",
        description: form.description,
      };
      const key = "userProjects";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.push(newProject);
      localStorage.setItem(key, JSON.stringify(existing));

      alert("Project listed on blockchain ✅");
      router.push("/marketplace");
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Failed to submit project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex flex-col">
      <main className="flex-1 px-6 md:px-10 lg:px-16 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold font-display">
            List a Carbon Offset Project
          </h1>
          <p className="text-muted-foreground mt-2">
            Provide details about your project. Your listing will be visible to
            buyers upon submission.
          </p>

          <div className="mt-6 grid gap-4">
            <Input
              required
              name="name"
              placeholder="Project name"
              value={form.name}
              onChange={onChange}
            />
            <Input
              required
              name="location"
              placeholder="Location (City, Country)"
              value={form.location}
              onChange={onChange}
            />
            <div className="grid md:grid-cols-2 gap-3">
              <Select
                value={form.category}
                onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="forestry">Forestry</SelectItem>
                  <SelectItem value="renewable">Renewable</SelectItem>
                  <SelectItem value="methane">Methane</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={form.methodology}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, methodology: v }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Methodology" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VCS">VCS</SelectItem>
                  <SelectItem value="Gold Standard">Gold Standard</SelectItem>
                  <SelectItem value="REDD+">REDD+</SelectItem>
                  <SelectItem value="Blue Carbon">Blue Carbon</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <Input
                required
                name="price"
                type="number"
                placeholder="Tokens per tCO₂e (USD)"
                value={form.price}
                onChange={onChange}
              />
              <Input
                required
                name="available"
                type="number"
                placeholder="Available tCO₂e"
                value={form.available}
                onChange={onChange}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Project image</label>
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onImageFile(e.target.files?.[0])}
                />
                <span className="text-xs text-muted-foreground">
                  or paste an image URL
                </span>
              </div>
              <Input
                name="image"
                placeholder="Image URL (optional)"
                value={form.image}
                onChange={onChange}
              />
              {(preview || form.image) && (
                <img
                  src={preview || form.image}
                  alt="Project image preview"
                  className="mt-2 w-full max-h-64 object-cover rounded-md border"
                />
              )}
            </div>

            <Textarea
              name="description"
              rows={5}
              placeholder="Project description"
              value={form.description}
              onChange={onChange}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex items-center gap-3 pt-2">
              <Button
                onClick={save}
                disabled={loading}
                className="bg-primary text-primary-foreground hover:opacity-90"
              >
                {loading ? "Submitting..." : "List Project"}
              </Button>
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
