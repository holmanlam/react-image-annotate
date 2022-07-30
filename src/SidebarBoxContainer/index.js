// @flow
import React, { memo } from "react"
import SidebarBox from "react-material-workspace-layout/SidebarBox"

export const SidebarBoxContainer = ({
  icon,
  title,
  children,
}) => {
  return (
      <SidebarBox icon={icon} title={title}>
        {children}
      </SidebarBox>
  )
}

export default memo(
  SidebarBoxContainer,
  (prev, next) => prev.title === next.title && prev.children === next.children
)
