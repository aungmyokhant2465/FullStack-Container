import React from 'react'

const Notification = (props) => {
    if(!props.message) {
        return null
    }
    return (
        <div style={props.isError ? styles.error : styles.success}>
            {props.message}
        </div>
    )
}

const styles = {
    error: {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    },
    success: {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
}

export default Notification