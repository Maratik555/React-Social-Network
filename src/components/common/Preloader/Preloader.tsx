import React from 'react'
import {Space, Spin} from 'antd'

const Preloader = () => {
  return (
      <Space size="middle">
        <Spin size="large" />
      </Space>
  )
}

export default Preloader