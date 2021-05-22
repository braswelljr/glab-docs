import React from 'react'
import SideNav from '@/components/nav/SideNav'

function Index() {
  return (
    <>
      <section className="px-8 -mt-1 grid lg:grid-cols-[3fr,7fr] xl:grid-cols-[2fr,8fr] gap-x-4 md:px-20 xl:px-40 lg:px-32">
        <SideNav />
        <div className="">new</div>
      </section>
    </>
  )
}

export default Index
