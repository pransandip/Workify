/**
  * Size: 40px
  * Font style: Roboto
  * Weight: Bold
  */
  export const heading1Bold = 'heading1Bold'

/**
 * Size: 32px
 * Font style: Roboto
 * Weight: Bold
 */
 export const heading2Bold = 'heading2Bold'

/**
 * Size: 24px
 * Font style: Roboto
 * Weight: Bold
 */
 export const heading3Bold = 'heading3Bold'

/**
 * Size: 20px
 * Font style: Roboto
 * Weight: Medium
 */
export const heading4Medium = 'heading4Medium'

/**
 * Size: 18px
 * Font style: Roboto
 * Weight: Medium
 */
 export const Heading5Medium = 'Heading5Medium'

/**
 * Size: 16px
 * Font style: Roboto
 * Weight: Medium
 */
 export const Heading6Medium = 'Heading6Medium'

/**
 * Size: 14px
 * Weight: Regular
 */
 export const body = 'body'

 /**
* Size: 14px
* Weight: Regular
*/
// export const P = 'P'


 /**
 * Size: 14px
 * Weight: Medium
 */
  export const InputLabel = 'InputLabel'

  /**
 * Size: 12px
 * Weight: Regular
 */
   export const small = 'small'


    /**
 * Size: 12px
 * Weight: Regular
 */
  export const error = 'error'



 export function getFontFamily(fontStyle) {
  return 'Roboto'
}


export function getFontSize(fontStyle) {
  switch(fontStyle) {
    case heading1Bold: return '40px'
    case heading2Bold: return '32px'
    case heading3Bold: return '24px'
    case heading4Medium: return '20px'
    case Heading5Medium: return '18px'
    case Heading6Medium: return '16px'
    case body: return '14px'
    case InputLabel: return '14px'
    case small: return '12px'
    case error: return '12px'
    default: return
  }
}

export function getFontWeight(fontStyle) {
  switch(fontStyle) {
    case heading1Bold: return '700'
    case heading2Bold: return '700'
    case heading3Bold: return '700'
    case heading4Medium: return '500'
    case Heading5Medium: return '500'
    case Heading6Medium: return '500'
    case body: return '400'
    case InputLabel: return '500'
    case small: return '400'
    case error: return '400'
    default: return
  }
}
