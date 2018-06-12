import React from 'react'
import Head from 'next/head'

const MyHead = ({title}) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

export default MyHead
