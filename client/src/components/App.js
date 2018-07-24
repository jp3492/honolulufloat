import React from 'react'
import Header from './header/Header'
import './styles.css'

export default ({ children }) => {
  return (
    <div id="wrapper">
      <Header />
      {children}
    </div>
  )
}
