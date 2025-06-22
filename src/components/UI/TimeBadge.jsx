import React from 'react'
import { FaClock, FaCheckCircle, FaExclamationCircle, FaHourglassHalf } from 'react-icons/fa'

const statusConfig = {
  completado: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    icon: <FaCheckCircle className='h-3' />
  },
  atrasado: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    icon: <FaExclamationCircle className='h-3' />
  },
  'en proceso': {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    icon: <FaHourglassHalf className='h-3' />
  },
  default: {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    icon: <FaClock className='h-3' />
  }
}

export const TimeBadge = ({ status = 'en proceso' }) => {
  const key = status.toLowerCase()
  const { bg, text, icon } = statusConfig[key] || statusConfig.default

  return (
    <div className={`${bg} ${text} font-semibold text-sm px-2 py-1 rounded-full flex items-center justify-center gap-x-1`}>
      {icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  )
}
