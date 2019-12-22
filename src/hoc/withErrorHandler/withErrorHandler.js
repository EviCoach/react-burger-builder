import React from 'react'
const withErrorHandler = (WrappedComponent) => {
    return (props) => {
    // return some jsx including the WrappedComponent
    return (
        <WrappedComponent {...props} />
        )
    }
}

export default withErrorHandler