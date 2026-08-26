"use client"

import { useState } from 'react'

export default function EntryFormModal({ date, existingEntry, onClose, onSave }) {
  const [hoursMode, setHoursMode] = useState(existingEntry?.hoursMode || 'total')
  const [totalHours, setTotalHours] = useState(existingEntry?.totalHours || '')
  const [startTime, setStartTime] = useState(existingEntry?.startTime || '')
  const [endTime, setEndTime] = useState(existingEntry?.endTime || '')
  const [tips, setTips] = useState(existingEntry?.tips || '')
  const [jobLocation, setJobLocation] = useState(existingEntry?.jobLocation || '')
  const [note, setNote] = useState(existingEntry?.note || '')

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="w-[25rem] h-[40rem] bg-stone-50 rounded-lg shadow-xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-6 pb-4 border-b border-stone-200">
          <div className="text-lg font-semibold text-black">{date}</div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Hours worked
          </label>

          {/* mode toggle */}
          <div className="inline-flex rounded-md border border-stone-300 bg-white p-0.5 mb-4">
            <button
              type="button"
              onClick={() => setHoursMode('total')}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                hoursMode === 'total'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Total hours
            </button>
            <button
              type="button"
              onClick={() => setHoursMode('range')}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                hoursMode === 'range'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Start / end time
            </button>
          </div>

          {hoursMode === 'total' ? (
            <div>
              <label htmlFor="totalHours" className="block text-xs text-stone-500 mb-1">
                Hours
              </label>
              <input
                id="totalHours"
                type="number"
                step="0.25"
                min="0"
                value={totalHours}
                onChange={(e) => setTotalHours(e.target.value)}
                placeholder="e.g. 7.5"
                className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>
          ) : (
            <div className="flex gap-3">
              <div className="flex-1">
                <label htmlFor="startTime" className="block text-xs text-stone-500 mb-1">
                  Start
                </label>
                <input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="endTime" className="block text-xs text-stone-500 mb-1">
                  End
                </label>
                <input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
            </div>
          )}

          <div className="mt-5">
            <label htmlFor="tips" className="block text-sm font-medium text-stone-700 mb-2">
              Tips
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-stone-400">
                $
              </span>
              <input
                id="tips"
                type="number"
                step="0.01"
                min="0"
                value={tips}
                onChange={(e) => setTips(e.target.value)}
                placeholder="0.00"
                className="w-full rounded-md border border-stone-300 bg-white pl-6 pr-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="jobLocation" className="block text-sm font-medium text-stone-700 mb-2">
              Job location
            </label>
            <input
              id="jobLocation"
              type="text"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
              placeholder="e.g. Downtown Cafe"
              className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>

          <div className="mt-5">
            <label htmlFor="note" className="block text-sm font-medium text-stone-700 mb-2">
              Notes
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Anything you want to remember about today..."
              rows={5}
              className="w-full resize-y rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-stone-200 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-stone-600 hover:text-stone-900"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() =>
              onSave({
                date,
                hoursMode,
                totalHours: hoursMode === 'total' ? totalHours : undefined,
                startTime: hoursMode === 'range' ? startTime : undefined,
                endTime: hoursMode === 'range' ? endTime : undefined,
                tips,
                jobLocation,
                note,
              })
            }
            className="px-4 py-2 text-sm bg-stone-900 text-white rounded-md hover:bg-stone-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}