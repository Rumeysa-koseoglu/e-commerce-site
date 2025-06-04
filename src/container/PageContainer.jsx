import React from 'react'
import Container from '@mui/material/Container';

function PageContainer({children}) { //children is represents the header.jsx
  return (
    <div>
      <Container maxWidth="lg">{children}</Container>{/**we imported a contaoner form MUI */}
    </div>
  )
}

export default PageContainer
