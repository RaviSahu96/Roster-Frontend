export default function Input({ className = '', ...rest }) {
  return (
    <input
      {...rest}
      className={`w-full px-3.5 py-2.5 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-500 
        focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
        transition-colors duration-200 text-sm ${className}`}
    />
  )
}