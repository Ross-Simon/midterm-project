import { useEffect, useRef } from 'react'

const Modal = ({ isOpen, onClose, title, children }) => { 
  const modalRef = useRef()

  // Close modal on Esc 
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }

  // Close modal on outside click
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }

    // create event listeners when modal is open and cleanup
    if (isOpen) {  
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {  
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose]) 

  if (!isOpen) return null 

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 z-40"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg max-w-md w-full p-6 relative shadow-2xl"
        style={{ zIndex: 41 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal