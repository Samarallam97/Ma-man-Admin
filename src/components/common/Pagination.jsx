import { useTranslation } from 'react-i18next'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

function Pagination({ currentPage, totalPages, onPageChange }) {
  const { t } = useTranslation()
  
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    
    // Logic for showing page numbers with ellipsis
    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always show first page
      pageNumbers.push(1)
      
      // Calculate start and end of shown pages
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)
      
      // Adjust start and end to always show 3 pages
      if (currentPage <= 3) {
        endPage = 4
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3
      }
      
      // Add ellipsis before middle pages if needed
      if (startPage > 2) {
        pageNumbers.push('...')
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }
      
      // Add ellipsis after middle pages if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('...')
      }
      
      // Always show last page
      pageNumbers.push(totalPages)
    }
    
    return pageNumbers.map((page, index) => {
      if (page === '...') {
        return (
          <span 
            key={`ellipsis-${index}`}
            className="px-3 py-1 text-neutral-500 dark:text-neutral-400"
          >
            ...
          </span>
        )
      }
      
      return (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md mx-1 ${
            currentPage === page
              ? 'bg-primary-500 text-white'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
          }`}
        >
          {page}
        </button>
      )
    })
  }

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`flex items-center px-3 py-1 rounded-md mx-1 ${
          currentPage === 1
            ? 'text-neutral-400 dark:text-neutral-600 cursor-not-allowed'
            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
        }`}
      >
        <FiChevronLeft className="mr-1" />
        {t('modules.prev')}
      </button>
      
      <div className="hidden sm:flex items-center">
        {renderPageNumbers()}
      </div>
      
      <div className="sm:hidden flex items-center">
        <span className="text-neutral-600 dark:text-neutral-400">
          {currentPage} / {totalPages}
        </span>
      </div>
      
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center px-3 py-1 rounded-md mx-1 ${
          currentPage === totalPages
            ? 'text-neutral-400 dark:text-neutral-600 cursor-not-allowed'
            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
        }`}
      >
        {t('modules.next')}
        <FiChevronRight className="ml-1" />
      </button>
    </div>
  )
}

export default Pagination