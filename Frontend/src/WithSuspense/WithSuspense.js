import React, { Suspense } from 'react'
import Spinner from '../components/Spinner/Spinner'

const WithSuspense = (WrappedComponent) => {

    const UpdatedComponent = () => {        
        const renderPreLoader = () => {
            return <Spinner />
        }
        return <Suspense fallback={
            renderPreLoader()
        }>
            <WrappedComponent />
        </Suspense>
    }
    return UpdatedComponent
}

export default WithSuspense

