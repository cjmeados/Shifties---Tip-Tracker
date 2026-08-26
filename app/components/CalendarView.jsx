"use client"

import { useState, useEffect } from 'react'

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const years = []
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function CalendarView() {

    const today = new Date()
    const [currentMonth, setCurrentMonth] = useState(today.getMonth())
    const [currentYear, setCurrentYear] = useState(today.getFullYear())

    const [entriesByDate, setEntriesByDate] = useState({})
    const [loading, setLoading] = useState(true)

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

    // Build "YYYY-MM-DD" strings for the visible month's range
    const paddedMonth = String(currentMonth + 1).padStart(2, '0')
    const start = `${currentYear}-${paddedMonth}-01`
    const end = `${currentYear}-${paddedMonth}-${String(lastDayOfMonth).padStart(2, '0')}`

    useEffect(() => {
        async function fetchEntries() {
            setLoading(true)

            try {
                const res = await fetch(`/api/tip-entries?start=${start}&end=${end}`)
                const { data } = await res.json()

                const lookup = {}
                ;(data || []).forEach((entry) => {
                    lookup[entry.entry_date] = entry
                })

                setEntriesByDate(lookup)
            } catch (err) {
                console.error('Failed to fetch entries:', err)
                setEntriesByDate({})
            } finally {
                setLoading(false)
            }
        }

        fetchEntries()
    }, [currentMonth, currentYear])

    console.log('entriesByDate:', entriesByDate)

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

function getDayColor(day) {
    if (day === null) return '' // padding cell, no color needed

    const dateStr = `${currentYear}-${paddedMonth}-${String(day).padStart(2, '0')}`
    const entry = entriesByDate[dateStr]

    if (!entry) {
        return 'bg-gray-300'   // no row at all
    }

    if (!entry.hours_worked || entry.hours_worked === 0) {
        return 'bg-yellow-300' // row exists, but hours is 0/null
    }

    return 'bg-green-300'      // row exists, hours > 0
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
        {calendarDays.map((day, index) => {
            if (day === null) {
                return <div key={index} className="border h-32"></div>
            }

            const dateStr = `${currentYear}-${paddedMonth}-${String(day).padStart(2, '0')}`
            const entry = entriesByDate[dateStr]

            return (
                <div
                    key={index}
                    className={`border h-32 p-1 flex flex-col ${getDayColor(day)}`}
                >
                    <div className="text-sm font-semibold">{day}</div>

                    {entry && (
                        <div className="text-xs mt-1">
                            <div>{entry.hours_worked} hours</div>
                            <div>${entry.total_tips} tips</div>
                            <div>${entry.hourly_wage * entry.hours_worked} wages</div>
                            <div>${entry.hourly_wage * entry.hours_worked + entry.total_tips} total</div>
                            <div>${(entry.hourly_wage * entry.hours_worked + entry.total_tips) / entry.hours_worked} hourly</div>
                        </div>
                    )}
                </div>
            )
        })}
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