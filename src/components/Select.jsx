export default function Select({ className='', children, ...rest }) {
  return (
    <select
      {...rest}
      className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    >
      {children}
    </select>
  )
}
