"use client";
import React from "react";
import { Card } from "antd";
import { BoardItem } from "@/app/types";

interface BoardCardProps {
  item: BoardItem;
}

export function BoardCard({ item }: BoardCardProps) {
  return (
    <Card className="mb-4 cursor-move shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">ID: {item.id}</span>
          <span
            className={`text-sm px-2 py-1 rounded ${
              item.completed
                ? "bg-green-100 text-green-800"
                : item.inProgress
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {item.completed ? "Completed" : item.inProgress ? "In Progress" : "Pending"}
          </span>
        </div>
        <p className="text-base font-medium">{item.todo}</p>
        <div className="text-sm text-gray-600">User ID: {item.userId}</div>
      </div>
    </Card>
  );
}
