import React from 'react'
import PropTypes from 'prop-types'
import { container, title, slogan } from './styles.css'

export default function Home (props) {
  return (
    <div className={container}>
      <p className={title}>{'Duckr'}</p>
      <p className={slogan}>{'The real time, cloud based, modular, scalable, social platform. In the cloud.'}</p>
    </div>
  )
}
