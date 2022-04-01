// @ts-ignore
import s from './FormsControl.module.css'

export const Element: any = (Element: string | JSX.IntrinsicAttributes) => ({
           // @ts-ignore
           input, meta, ...props }): any => {
  const hasError = meta.touched && meta.error

    return (
    <div className={ s.formControl + " " + (hasError ? s.error : "") }>
        {/*@ts-ignore  */}
      <Element {...input} {...props} />
      { hasError && <span> { meta.error } </span> }
    </div>
  )
}



