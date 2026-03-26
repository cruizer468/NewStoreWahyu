"use client";

import { Category } from "@/lib/data";

type Props = {
  categories: Category[];
  active: string;
  onChange: (slug: string) => void;
};

export function CategoryTabs({ categories, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isActive = active === category.slug;

        return (
          <button
            key={category.id}
            onClick={() => onChange(category.slug)}
            className={`pika-tab ${isActive ? "pika-tab-active" : ""}`}
          >
            {category.name} {category.count}
          </button>
        );
      })}
    </div>
  );
}