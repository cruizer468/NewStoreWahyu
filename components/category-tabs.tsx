"use client";

type Props = {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
};

export default function CategoryTabs({
  categories,
  activeCategory,
  onChange,
}: Props) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {categories.map((category) => {
        const active = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`rounded-full border-2 border-black px-3 py-1 text-xs font-black uppercase transition ${
              active
                ? "bg-[#ffd400] text-black shadow-[2px_2px_0_#000]"
                : "bg-white text-black hover:bg-[#fff3b0]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}