import { InfoCard } from "@/components/InfoCard/InfoCard";
import { about } from "@/app/about/static";

export default function Page() {
  return (
    <div>
      <InfoCard title={"О нас"} content={about} />
    </div>
  );
}
