import React, { useContext } from 'react'
import { AppContext } from './components/AppContext'

export const Invoices = () => {
    const { invoices, user } = useContext(AppContext)

    return (
        <div>
            <button>Create Invoice</button>
            <div>
                {
                    invoices.map(invoice => {

                        return Object.entries(invoice).map(entry => {
                            return (
                                <div>
                                    <h3>{entry[0]}</h3>
                                    <h3>{entry[1]}</h3>
                                </div>
                            )
                        })
                    })
                }
            </div>
        </div>
    )
}
