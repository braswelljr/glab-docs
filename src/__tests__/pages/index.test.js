/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import Index from '@/pages/index'

describe('Index', () => {
  it('renders a heading', () => {
    render(<Index />)

    const heading = screen.getByRole('heading', {
      name: /Welcome to glab!/i
    })

    expect(heading).toBeInTheDocument()
  })
})
