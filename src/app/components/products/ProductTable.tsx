"use client";
import React from "react";
import { Table, Button, Popconfirm } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { SortOrder } from "antd/es/table/interface";
import { DeleteOutlined } from "@ant-design/icons";
import { Product } from "@/app/types";

interface ProductTableProps {
  data?: Product[];
  total?: number;
  loading?: boolean;
  pagination: TablePaginationConfig;
  sorter: { field?: string; order?: SortOrder };
  deletingIds: Set<number>;
  onDelete: (id: number) => void;
  onTableChange: (pagination: TablePaginationConfig, _: any, sorter: any) => void;
}

export function ProductTable({
  data,
  total,
  loading,
  pagination,
  sorter,
  deletingIds,
  onDelete,
  onTableChange,
}: ProductTableProps) {
  const columns: ColumnsType<Product> = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: true,
      width: "20%",
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: true,
      width: "16%",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: true,
      width: "12%",
      render: (price: number) => `$${price}`,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: true,
      width: "12%",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      width: "25%",
      render: (tags: string[]) => tags?.join(", "),
    },
    {
      title: "Updated At",
      dataIndex: ["meta", "updatedAt"],
      width: "15%",
      render: (_: any, record: Product) => record.meta?.updatedAt,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "5%",
      render: (_: any, record: Product) => {
        const isDeleting = deletingIds.has(record.id);
        return (
          <Popconfirm
            title="Delete Product"
            description={`Are you sure you want to delete "${record.title}"?`}
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <Button 
              type="text"
              danger 
              icon={<DeleteOutlined />} 
              size="small"
              loading={isDeleting}
              disabled={isDeleting}
            />
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data || []}
      rowKey="id"
      loading={loading}
      pagination={{
        ...pagination,
        total: total || 0,
      }}
      onChange={onTableChange}
      bordered
    />
  );
}
