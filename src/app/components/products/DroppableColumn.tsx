"use client";
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { BoardItem } from "@/app/types";
import { DraggableCard } from "./DraggableCard";

interface DroppableColumnProps {
  columnId: string;
  items: BoardItem[];
  title: string;
  className?: string;
}

export function DroppableColumn({ columnId, items, title, className }: DroppableColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: columnId,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 p-4 rounded-lg ${className} ${
        isOver ? "ring-2 ring-blue-400" : ""
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <DraggableCard key={item.id} item={item} columnId={columnId} />
        ))}
      </div>
    </div>
  );
}
