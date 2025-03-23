'use client'
import NotFoundPic from '@/components/notfound/NotFoundPic'
import { useRouter } from 'next/navigation'
import React from 'react'

const NotFound = () => {
    const router = useRouter();

    return (
        <div className='h-screen flex flex-col gap-6 items-center justify-center text-center'>
            <NotFoundPic />
            <p className='font-bold text-3xl'>متاسفانه صفحه مورد نظر شما پیدا نشد.</p>
            <div className="flex items-center gap-4">
                <button 
                    className='btn btn-success btn-lg' 
                    onClick={() => router.push('/')} 
                    aria-label="بازگشت به صفحه اصلی"
                >
                    بازگشت به صفحه اصلی
                </button>
                <button 
                    className='btn btn-success btn-soft btn-lg' 
                    onClick={() => router.back()} 
                    aria-label="بازگشت به صفحه قبلی"
                >
                    بازگشت به صفحه قبلی
                </button>
            </div>
        </div>
    );
}

export default NotFound;