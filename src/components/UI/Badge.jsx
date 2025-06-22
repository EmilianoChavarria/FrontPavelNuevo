import React from 'react'
import { FaClock, FaCheckCircle, FaExclamationCircle, FaHourglassHalf } from 'react-icons/fa'

const statusConfig = {
  success: {
    bg: 'bg-green-100',
    text: 'text-green-700',
  },
  danger: {
    bg: 'bg-red-100',
    text: 'text-red-700',
  },
  warning: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
  },
  default: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
  }
}

export const Badge = ({ status = 'default', value }) => {
  const key = status.toLowerCase()
  const { bg, text } = statusConfig[key] || statusConfig.default

  return (
    <div className={`${bg} ${text} font-semibold text-sm px-2 py-1 rounded-full flex items-center justify-center w-fit `}>
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </div>
  )
}
