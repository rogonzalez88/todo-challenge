type Props = {
  children?: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex items-center justify-center w-screen h-screen font-medium">
      <div className="flex flex-grow items-center justify-center h-full text-gray-600 bg-gray-100">
        <div className="max-w-full p-6 bg-white rounded-lg shadow-lg w-96">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout