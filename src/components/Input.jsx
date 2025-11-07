export default function Input({ className='', ...rest }) {
  return (
    <input
      {...rest}
      className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    />
  )
}
