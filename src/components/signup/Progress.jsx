import React from 'react';
import PropTypes from 'prop-types';

function ProgressBar({value, max}) {
    return (
        <progress value ={value} max = {max}/>
    );
}

ProgressBar.propTypes = {
    value : PropTypes.number.isRequired,
    max : PropTypes.number,
    color : PropTypes.string,
    width: PropTypes.string,

}
ProgressBar.defaultProps = {
    max : 100,
    color : "beige"
}
export default ProgressBar;