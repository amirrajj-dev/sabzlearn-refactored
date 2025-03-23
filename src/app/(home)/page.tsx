import Landing from '@/components/ui/Landing'
import LastArticles from '@/components/ui/LastArticles'
import LastCourses from '@/components/ui/LastCourses'
import MostFollowedCourses from '@/components/ui/MostFollowedCourses'
import NewestCourses from '@/components/ui/NewestCourses'
import PopularCourses from '@/components/ui/PopularCourses'
import RoadMaps from '@/components/ui/RoadMaps'
import Services from '@/components/ui/Services'
import React from 'react'

const page = () => {
  return (
   <div className='container mx-auto max-w-7xl mt-20'>
    <Landing/>
    <LastCourses/>
    <RoadMaps/>
    <PopularCourses/>
    <Services/>
    <NewestCourses/>
    <LastArticles/>
    <MostFollowedCourses/>
   </div>

  )
}

export default page