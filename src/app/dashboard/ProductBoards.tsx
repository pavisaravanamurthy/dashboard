"use client";
import React, { useState } from "react";
import { Spin } from "antd";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { BoardItem, COLUMN_COLORS, COLUMN_TITLES } from "../types";
import { useGetBoardItemsQuery, useUpdateBoardItemMutation } from "../store/productApi";
import { BoardCard } from "../components/products/BoardCard";
import { DroppableColumn } from "../components/products/DroppableColumn";

const COLUMN_KEYS = ["pending", "inProgress", "completed"] as const;
type ColumnKey = (typeof COLUMN_KEYS)[number];


export default function ProductBoards() {
  const { data: boardData, isLoading } = useGetBoardItemsQuery();
  const [updateBoardItem] = useUpdateBoardItemMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "pending">("all");
  
  const [columns, setColumns] = useState<Record<ColumnKey, BoardItem[]>>({
    pending: [],
    inProgress: [],
    completed: [],
  });
  const [activeItem, setActiveItem] = useState<BoardItem | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { item } = active.data.current as { item: BoardItem };
    setActiveItem(item);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveItem(null);
      return;
    }

    const sourceColumnId = (active.data.current as { columnId: ColumnKey }).columnId;
    const destinationColumnId = over.id as ColumnKey;

    if (sourceColumnId === destinationColumnId) {
      setActiveItem(null);
      return;
    }

    const itemId = parseInt(active.id.toString());
    const newStatus = destinationColumnId;

    try {
      const updates = {
        completed: newStatus === 'completed',
        inProgress: newStatus === 'inProgress'
      };

      setColumns(prev => {
        const sourceItems = [...prev[sourceColumnId]];
        const destinationItems = [...prev[destinationColumnId]];
        const [draggedItem] = sourceItems.splice(
          sourceItems.findIndex(item => item.id.toString() === active.id),
          1
        );
        
        const updatedItem = {
          ...draggedItem,
          ...updates
        };
        destinationItems.push(updatedItem);

        return {
          ...prev,
          [sourceColumnId]: sourceItems,
          [destinationColumnId]: destinationItems,
        };
      });

      await updateBoardItem({ id: itemId, status: newStatus }).unwrap();
    } catch (error) {
      setColumns(prev => {
        const sourceItems = [...prev[sourceColumnId]];
        const destinationItems = [...prev[destinationColumnId]];
        const [draggedItem] = destinationItems.splice(
          destinationItems.findIndex(item => item.id.toString() === active.id),
          1
        );
        sourceItems.push(draggedItem);

        return {
          ...prev,
          [sourceColumnId]: sourceItems,
          [destinationColumnId]: destinationItems,
        };
      });
    }

    setActiveItem(null);
  };

  const filterItems = (items: BoardItem[]) => {
    return items.filter(item => {
      const matchesSearch = item.todo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" 
        ? true 
        : statusFilter === "completed" 
          ? item.completed 
          : !item.completed;
      return matchesSearch && matchesStatus;
    });
  };

  React.useEffect(() => {
    if (boardData?.todos) {
      const pending = boardData.todos.filter(item => !item.completed && !item.inProgress);
      const inProgress = boardData.todos.filter(item => item.inProgress);
      const completed = boardData.todos.filter(item => item.completed);
      setColumns({
        pending,
        inProgress,
        completed,
      });
    }
  }, [boardData]);

  return (
    <div className="p-4">
      <h2 className="font-bold text-xl mb-4">Product Board</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <Spin size="large" />
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-3 gap-4">
            {COLUMN_KEYS.map((columnId) => (
              <DroppableColumn
                key={columnId}
                columnId={columnId}
                items={filterItems(columns[columnId])}
                title={COLUMN_TITLES[columnId]}
                className={COLUMN_COLORS[columnId]}
              />
            ))}
          </div>

          <DragOverlay dropAnimation={null}>
            {activeItem ? (
              <div style={{ width: "100%" }}>
                <BoardCard item={activeItem} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
}
