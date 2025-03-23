'use client';
import React, { useEffect } from 'react';
import { useDiscountStore } from '@/store/discount.store';
import DeleteModal from '@/components/modals/shared/DeleteModal';
import { toast } from 'react-toastify';
import { toastOptions } from '@/helpers/toast';
import { useAuthStore } from '@/store/auth.store';

const DiscountsTable = () => {
  const { discounts , loading, deleteDiscount } = useDiscountStore();
  const {user} = useAuthStore()
  const handleDeleteDiscount = async (id: string) => {
    const res = await deleteDiscount(id , user!.id);
    if (res.success) {
      toast.success('تخفیف با موفقیت حذف شد', toastOptions);
    } else {
      toast.error('خطایی در حذف تخفیف رخ داد', toastOptions);
    }
  };

  return (
    <div className="shadow-lg rounded-xl overflow-x-auto">
      <table className="table bg-base-300 w-full text-center">
        <thead className="bg-base-300 text-base-content">
          <tr>
            <th className="p-4">شناسه</th>
            <th className="p-4">کد</th>
            <th className="p-4">حداکثر استفاده</th>
            <th className="p-4">حذف</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="border-b">
                <td className="p-4">
                  <div className="skeleton h-6 w-10 mx-auto bg-base-300"></div>
                </td>
                <td className="p-4">
                  <div className="skeleton h-6 w-24 mx-auto bg-base-300"></div>
                </td>
                <td className="p-4">
                  <div className="skeleton h-6 w-16 mx-auto bg-base-300"></div>
                </td>
                <td className="p-4">
                  <div className="skeleton h-6 w-16 mx-auto bg-base-300"></div>
                </td>
              </tr>
            ))
          ) : discounts.length > 0 ? (
            discounts.map((discount, index) => (
              <tr
                key={discount.id}
                className={`border-b hover:bg-base-300 transition ${
                  index % 2 === 0 ? 'bg-base-200' : 'bg-base-100'
                }`}
              >
                <td className="p-4 font-medium text-base-content">{index + 1}</td>
                <td className="p-4 font-semibold text-base-content">{discount.code}</td>
                <td className="p-4">{discount.maxUse}</td>
                <td className="p-4">
                  <DeleteModal
                    deleteBtnText="حذف تخفیف"
                    deleteId={discount.id}
                    message="ایا از حذف این تخفیف اطمینان دارید"
                    messageDesc=""
                    onDelete={handleDeleteDiscount}
                    title="حذف تخفیف"
                  />
                </td>
              </tr>
            ))
          ) : (

            <tr>
              <td colSpan={4} className="p-4 text-center text-base-content">
                هیچ تخفیفی یافت نشد.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DiscountsTable;