import React from 'react';
import { AiFillDollarCircle } from 'react-icons/ai';
import { FaMoneyCheck } from 'react-icons/fa';
import { SlRocket } from 'react-icons/sl';
import UserPannelCard from '../shared/UserPannelCard';
import CourseCard from '@/components/shared/CourseCard';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { getMe } from '@/actions/auth.action';
import UserCourseCard from './ui/UseCourseCard';

const UserCoursesPage = async () => {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('sabz-token')?.value
  const user = (await getMe(token as string)).user
  
  const cardsData = [
    {
      title: 'دوره های ثبت نام شده',
      desc: 'تومان',
      length: user?.courses.length,
      bgColor: 'bg-blue-500',
      icon: <SlRocket />,
    },
    {
      title: 'دوره های نقدی',
      desc: 'دوره',
      length: user?.courses.filter(course=>course.price > 0).length,
      bgColor: 'bg-purple-500',
      icon: <FaMoneyCheck />,
    },
    {
      title: 'دوره های رایگان',
      desc: 'تیکت',
      length: user?.courses.filter(course=>course.price === 0).length,
      bgColor: 'bg-green-500',
      icon: <AiFillDollarCircle />,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {cardsData.map((card, index) => (
          <UserPannelCard
            key={index}
            title={card.title}
            desc={card.desc}
            length={card.length as number}
            bgColor={card.bgColor}
            icon={card.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {user?.courses && user.courses.length > 0 ? (
          user.courses.map((course) => (
            <UserCourseCard course={course} key={course.id} />
          ))
        ) : (
          <div className="col-span-full flex flex-col gap-4 items-center justify-center py-10">
            <p className="text-lg text-gray-600">شما  در هیچ دوره ای ثبت نام نکرده اید</p>
            <Link
              className="btn btn-lg btn-soft btn-primary"
             href={'/courses'}
            >
              مشاهده دوره‌ها
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCoursesPage;