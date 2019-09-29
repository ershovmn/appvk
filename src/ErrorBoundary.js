import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return {hasError: true}
    }

    componentDidCatch(error, info) {
        //logErrorToMyService(error, info)
    }

    render() {
        if(this.state.hasError) {
            return (
                <h1>Это не баг, это фича</h1>
            )
        }
        return (
            this.props.children
        )
    }
}

export default ErrorBoundary