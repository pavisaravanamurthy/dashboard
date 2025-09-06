"use client";
import React, { useState } from "react";
import { App } from "antd";
import type { TablePaginationConfig } from "antd/es/table";
import type { SortOrder } from "antd/es/table/interface";
import { ProductSearch } from "../components/products/ProductSearch";
import { ProductTable } from "../components/products/ProductTable";
import { useGetProductsQuery, useDeleteProductMutation } from "../store/productApi";

const PAGE_SIZE = 20;

export default function ProductList() {
  const { message } = App.useApp();
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: PAGE_SIZE,
    showSizeChanger: true,
    showTotal: (total: number, range: [number, number]) => `${range[0]}-${range[1]} of ${total} items`,
    pageSizeOptions: ['10', '20', '50'],
  });
  const [sorter, setSorter] = useState<{ field?: string; order?: SortOrder }>({}); 
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());

  const { data, isLoading, error } = useGetProductsQuery({
    page: pagination.current,
    pageSize: pagination.pageSize,
    sortField: sorter.field,
    sortOrder: sorter.order === "ascend" ? "asc" : "desc",
    search: search || undefined,
  });

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDelete = async (id: number) => {
    const productToDelete = data?.products.find(p => p.id === id);
    if (!productToDelete) return;

    try {
      setDeletingIds(prev => new Set([...prev, id]));
      const result = await deleteProduct(id).unwrap();
      
      if (result.isDeleted) {
        message.success({
          content: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#52c41a', fontSize: '16px' }}>✓</span>
              <div>
                <div style={{ fontWeight: 500 }}>Product deleted successfully</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{productToDelete.title}</div>
              </div>
            </div>
          ),
          duration: 5,
        });
      } else {
        throw new Error(result.message || 'Failed to delete product');
      }
    } catch (error: any) {
      message.error({
        content: error.message || 'Failed to delete product. Please try again.',
        duration: 5,
      });
      
      setDeletingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleTableChange = (
    newPagination: TablePaginationConfig,
    _filters: any,
    sorter: any
  ) => {
    if (newPagination.pageSize !== pagination.pageSize) {
      newPagination.current = 1;
    }
    
    setPagination({
      ...newPagination,
      total: data?.total || 0,
    });
    
    setSorter({
      field: sorter.field,
      order: sorter.order,
    });
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-xl mb-4">Product List</h2>
      <ProductSearch
        value={search}
        onChange={setSearch}
      />
      {error ? (
        <div className="text-red-500 p-4">
          Error loading products. Please try again.
        </div>
      ) : (
        <ProductTable
          data={data?.products}
          total={data?.total}
          loading={isLoading}
          pagination={pagination}
          sorter={sorter}
          deletingIds={deletingIds}
          onDelete={handleDelete}
          onTableChange={handleTableChange}
        />
      )}
    </div>
  );
}
