import React, { Component } from 'react'

import Modal from '../../components/UI/Modal/Modal'
import Auxiliary from '../Auxiliary'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentDidMount() {
            // store the interceptor in a variable
            // so we can cancel it elsewhere

            // this.anyName --- creates new properties in this object class
            this.reqInterceptor =
                axios.interceptors.request.use(req => {
                    this.setState({ error: null })
                    return req
                })

            // store the interceptor in a variable
            // so we can cancel it elsewhere

            // this.anyName --- creates new properties in this instance of the class
            this.resInterceptor =
                axios.interceptors.response.use(res => res, err => {
                    this.setState({
                        error: err
                    })
                })
        }

        componentWillUnmount() {
            // testing
            // removing old interceptors to prevent memory leaks
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {

            // return some jsx including the WrappedComponent
            return (
                <Auxiliary>
                    <Modal show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error?.message}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            )
        }
    }
}

export default withErrorHandler