import s from './FormControl.module.css'

export const element = (Element, cols, rows) => ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={`${s.formControl} ${hasError ? s.error : ''}`}>
            <div>
                <Element {...input} {...props} cols={cols} rows={rows}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

