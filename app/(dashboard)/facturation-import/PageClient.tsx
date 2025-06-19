import LayoutSecond from '@/layouts/LayoutSecond'
import { Button } from '@heroui/button'
import { Link } from '@heroui/link'
import React from 'react'
import Content_facture_import from './components/Content-facture-import'
import Formulaire from './Formulaire'

const PageClient = () => {
  return (
    <Content_facture_import>
        <Formulaire />
    </Content_facture_import>
  )
}

export default PageClient