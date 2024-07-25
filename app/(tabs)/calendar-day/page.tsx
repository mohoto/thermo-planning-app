"use client"
import React from 'react'
import ControlDay from './controlDay'
import CalendarDayRdv from './calendarDayRdv'
import useEventCalendarDay from '@/hooks/useCalendarDay';

type Props = {}

function CalendarDay({}: Props) {

  const { currentDay, setCurrentDay, changeDay, date } = useEventCalendarDay();

  return (
    <div className="h-full relative px-6">
      <div className="justify-center items-center">
        <div className="mb-10 fixed top-0 left-0 z-20 w-full px-4 h-20">
          <ControlDay currentDay={currentDay} changeDay={changeDay} />
        </div>
      </div>
      <div className="overflow-x-visible mt-24 bg-white w-full">
        <CalendarDayRdv currentDay={currentDay} />
      </div>
    </div>
  )
}

export default CalendarDay