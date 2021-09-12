import s from './FormControl.module.css'
import {FieldRenderProps} from "react-final-form";
import React, {FC} from "react";

export const element = (Element: typeof React.Component | string)
    : FC<FieldRenderProps<string>> => ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={`${s.formControl} ${hasError ? s.error : ''}`}>
            <div>
                <Element {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

