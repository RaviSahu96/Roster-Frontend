export default function Select({ className = '', children, ...rest }) {
  return (
    <select
      {...rest}
      className={`w-full px-3.5 py-2.5 border border-gray-700 rounded-lg bg-gray-900 text-white
        focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500
        transition-colors duration-200 text-sm appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0ibTQgNiA0IDQgNC00IiBzdHJva2U9IiNENjE0MTQiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=')] bg-no-repeat bg-[center_right_0.75rem] bg-[length:16px_16px] pr-10 ${className}`}
    >
      {children}
    </select>
  )
}