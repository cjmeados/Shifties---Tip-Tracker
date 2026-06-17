"use client"

import { useState } from 'react'

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export default function CalendarView() {

    const today = new Date()
    const [currentMonth, setCurrentMonth] = useState(today.getMonth())
    const [currentYear, setCurrentYear] = useState(today.getFullYear())

    function nextMonth() {
        if (currentMonth == 11) {
            setCurrentMonth(0)
            setCurrentYear(currentYear + 1)
        } else {
            setCurrentMonth(currentMonth + 1)
        }
    }
    
    function previousMonth() {
        if (currentMonth == 0) {
            setCurrentMonth(11)
            setCurrentYear(currentYear - 1)
        } else {
            setCurrentMonth(currentMonth - 1)
        }
    }


  return (
    <div>
        <div>
            <button onClick = {previousMonth}>Back</button>
            <h2>{monthNames[currentMonth]} {currentYear}</h2>
            <button onClick = {nextMonth}>Next</button>
        </div>
    </div>
  )
}