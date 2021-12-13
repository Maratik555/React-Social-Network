import React from 'react'
import s from './FormsControl.module.css'

export const Textarea = ({input,meta, ...props}) => {

  const hasError = meta.touched && meta.error

  return (
    <div className={s.formControl + " " + (hasError ? s.error : '')}>
      <textarea {...input} {...props} />
      { hasError && <span>error!</span>}
    </div>
  )
}