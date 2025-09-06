"use client";
import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <Input
      placeholder="Search by title..."
      prefix={<SearchOutlined />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mb-4 max-w-md"
      allowClear
    />
  );
}
