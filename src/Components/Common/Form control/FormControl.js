import s from './FormControl.module.css'

export const element = (Element) => ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={`${s.formControl} ${hasError ? s.error: ''}`}>
            <div>
                <Element {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

