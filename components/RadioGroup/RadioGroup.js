import React from 'react';
import { string, array, func} from 'prop-types';
import { Input } from '~components';

const radioGroup = ({ inquiry, radiobuttons, onChange, onBlur }) => {
    const inputs = radiobuttons.map((radiobutton, index) => {
        return (
            <Input key={index} {...radiobutton} onChange={onChange} onBlur={onBlur} />
        );
    });
    return (
        <div>
            <div>{inquiry}</div>
            <div>{inputs}</div>
        </div>
    );
};

radioGroup.propTypes = {
    inquiry: string.isRequired,
    radiobuttons: array.isRequired,
    onChange: func.isRequired,
    onBlur: func
}

radioGroup.defaultProps = {
    onBlur: _ => _
}

export default radioGroup;
