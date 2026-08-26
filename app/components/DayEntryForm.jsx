"use client"

import { useState } from 'react'

export default function EntryFormModal({ date, existingEntry, onClose, onSave }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="w-5 h-5 bg-black" onClick={(e) => e.stopPropagation()}></div>
        </div>
    )
}