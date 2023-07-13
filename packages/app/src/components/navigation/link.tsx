import { forwardRef } from "react"
import { Link as RouterLink } from "react-router-dom"
import type { LinkProps as RouterLinkProps } from "react-router-dom"

export const Link = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  (props, ref) => <RouterLink ref={ref} {...props} />,
)
