interface Props {
    children:React.ReactNode
}
function layout({ children }:  Props ) {
  return <div className="flex item-center justify-center h-full">{children}</div>;
}

export default layout;