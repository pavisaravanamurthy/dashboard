"use client";
import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { BoardItem } from "@/app/types";
import { BoardCard } from "./BoardCard";

interface DraggableCardProps {
  item: BoardItem;
  columnId: string;
}

export function DraggableCard({ item, columnId }: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.id.toString(),
      data: { item, columnId },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={isDragging ? "opacity-0" : ""}
    >
      <BoardCard item={item} />
    </div>
  );
}
