import React from 'react'

import 'react-dadata/dist/react-dadata.css'
import { AddressSuggestions } from 'react-dadata'

interface Props {
  onChange?: (value?: string) => void
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return <AddressSuggestions token="" onChange={data => onChange?.(data?.value)} />
}
