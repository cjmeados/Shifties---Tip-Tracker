"use client"

import { useState } from 'react'

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const years = []
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function CalendarView() {

    const today = new Date()
    const [currentMonth, setCurrentMonth] = useState(today.getMonth())
    const [currentYear, setCurrentYear] = useState(today.getFullYear())
    const years = []

    const firstDayOfTheMonthIndex = new Date(currentYear, currentMonth, 1).getDay() 
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate() 
    const totalDaysFromStartIndex = firstDayOfTheMonthIndex + lastDayOfMonth
    const trailingPadding = (7 - (totalDaysFromStartIndex % 7)) % 7
    const totalCells = totalDaysFromStartIndex + trailingPadding

    const calendarDays = []
    for (let i = 0; i < totalCells; i++) {
        if (i < firstDayOfTheMonthIndex || i >= totalDaysFromStartIndex) {
            calendarDays.push(null)
        } else {
            calendarDays.push(i + 1 - firstDayOfTheMonthIndex) 
        }
    }


    for (let i = today.getFullYear(); i >= 2020; i--) {
        years.push(i)
    }

    function nextMonth() {
        if (currentMonth == 11 && currentYear == today.getFullYear()) {
            return
        } else if (currentMonth == 11) {
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

        <div className="grid grid-cols-7"> 
            {dayNames.map((day, index) => (
                <div key={index} className="text-center border h-8">
                    {day.slice(0, day === "Thursday" ? 2 : 1)} 
                </div>
            ))}
        </div>

        <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => (
                <div key={index} className="text-center border h-16">
                    {day !== null ? day : ""}
                </div>
            ))}
        </div> 

        <div>

            <button onClick = {previousMonth}>Back</button>
            <select value={currentMonth} onChange={(e) => setCurrentMonth(e.target.value)}>
                {monthNames.map((month, index) => (
                    <option value={index}>{month}</option>
                ))}
            </select>
            <button onClick = {nextMonth}>Next</button>
            <select value={currentYear} onChange={(e) => setCurrentYear(Number(e.target.value))}>
                {years.map((year) => (
                    <option value={year}>{year}</option>
                ))}
            </select>
        </div>
    </div>
  )
}