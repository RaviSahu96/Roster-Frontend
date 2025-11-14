export default function Button({ className = '', variant = 'primary', size = 'md', ...rest }) {
  const baseStyles = 'font-semibold transition-all duration-200 focus:outline-none focus:ring-2 rounded-lg border'
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  }
  
  const variants = {
    primary: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border-red-600',
    secondary: 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700 focus:ring-gray-600',
    dark: 'bg-black text-white border-gray-800 hover:bg-gray-900 focus:ring-gray-700',
    outline: 'bg-transparent text-red-400 border-red-600 hover:bg-red-600 hover:text-white focus:ring-red-500'
  }

  return (
    <button
      {...rest}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    />
  )
}