"use client"
import { Link } from '@heroui/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className="flex flex-row gap-5 border-b border-gray-100 dark:border-gray-700  pb-4">
          <Link href="/facturation-import">Facturation</Link>
          <Link href="/facturation-import-ligne-facture">Ligne facture</Link>
          <Link href="/facturation-import-camion">Camions</Link>
          <Link href="/facturation-import-type-marchandise">Types marchandises</Link>
          <Link href="facturation-import-format-facture">Format facture</Link>
        </div>
  )
}

export default Navbar