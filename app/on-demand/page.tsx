import FastCustomizationBanner from "@/components/fast-customization/FastCustomizationBanner";
import FastCustomizationProductGrid from "@/components/fast-customization/FastCustomizationProductGrid";

export const metadata = {
  title: "On-Demand Manufacturing - MaheDeluxe | Custom Production",
  description: "Connect with manufacturers for on-demand custom production and fast turnaround times",
};

export default function OnDemandPage() {
  return (
    <div className="min-h-screen bg-white">
      <FastCustomizationBanner />
      <FastCustomizationProductGrid />
    </div>
  );
}
