import React from 'react';
import { string, shape, func, bool } from 'prop-types';
import ImageInput from './ImageInput';
import ResumeInput from './ResumeInput';
import styles from './Input.module.scss';

export const Input = (props) => {
    const { 
        type, 
        error,
        placeholder,
        name, 
        label, 
        value, 
        required, 
        checked,
        validation = {},
        validated = true,
        onChange, 
        onBlur,
        file,
        fileId
    } = props;
    const { type: validationType } = validation;
    if (validationType === 'image') {
        return (
            <ImageInput {...{
                ...props,
                fileId
            }}/>
        );
    }

    if (validationType === 'resume') {
        return (
            <ResumeInput {...{
                ...props,
                fileId
            }} />
        );
    }
    const changeHandler = (e) => {
        const { value, files } = e.target;
        const filedata = files?.[0];
        onChange({name, value, filedata});
    }
    const labelText = <span>{label}{required && <span className="required">*</span>}</span>;
    let inputWithLabel = (
        <>
            {label && <label htmlFor={name}>{labelText}</label>}
            <input
                value={file || value}
                placeholder={placeholder}
                onChange={changeHandler}
                onBlur={() => onBlur(name)}
                name={name}
                type={type}
                required={required}
            />
        </>
    );

    if (type === 'checkbox') {
        inputWithLabel = (
            <>
                <input
                    value={value}
                    onChange={changeHandler}
                    onBlur={() => onBlur(name)}
                    name={name}
                    checked={checked}
                    placeholder={placeholder}
                    type={type}
                    required={required} 
                />
                <span>{labelText}</span>
            </>
        );
    }

    if (type === 'radio') {
        inputWithLabel = (
            <>
                <input
                    value={value}
                    onChange={changeHandler}
                    onBlur={() => onBlur(name)}
                    name={name}
                    checked={checked}
                    type={type}
                    required={required}
                />
                <span>{labelText}</span>
            </>

        )
    }

    return (
        <div>
            {inputWithLabel}
            <div className={styles.error}>{!validated ? error : ' '}</div>
        </div>
    );
};

Input.propTypes = {
    type: string,
    error: string,
    name: string.isRequired, 
    label: string, 
    placeholder: string,
    value: string, 
    required: bool, 
    checked: bool,
    validation: shape({}),
    validated: bool,
    onChange: func.isRequired, 
    onBlur: func,
    file: shape({}),
    fileId: string
}

Input.defaultProps = {
    onBlur: _ => _,
    fileId: '',
    type: '',
    label: '',
    placeholder: '',
    error: '',
    value: '',
    required: false,
    checked: false,
    validation: {},
    validated: true,
    title: {},
}

export default Input;