import type {ComponentProps} from 'react'
import styles from './CommonButton.module.css'

type CommonButtonVariant = 'primary' | 'ghost'

interface CommonButtonProps extends ComponentProps<'button'> {
  variant?: CommonButtonVariant
}

const variantClass: Record<CommonButtonVariant, string | undefined> = {
  primary: undefined,
  ghost: styles.ghost,
}

// No 'use client' on purpose: as a Server Component it works as a submit
// button for Server Action forms; rendered inside a Client Component it
// becomes client code and onClick works. type defaults to "button" because
// the HTML default ("submit") silently submits surrounding forms.
export function CommonButton({
  variant = 'primary',
  type = 'button',
  className,
  ...props
}: CommonButtonProps) {
  const classes = ['button', variantClass[variant], className].filter(Boolean).join(' ')

  return <button type={type} className={classes} {...props} />
}
