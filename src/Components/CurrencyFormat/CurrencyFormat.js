import React from 'react'

function CurrencyFormat({amount}) {
  
  return (
    <div>
   ${amount.toFixed(2)}

    </div>
  )
}

export default CurrencyFormat