// size value
const _size = {
  // for min/max width/height
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',

  // for all
  '1px': '1px',
  '10px': '10px',
  '14px': '14px',
  '16px': '16px',
  '18px': '18px',
  '20px': '20px',
  '24px': '24px',
  '32px': '32px',
  '40px': '40px',
  inherit: 'inherit',
  min: 'min-content',
  max: 'max-content'
}

module.exports = {
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
        '-2': '-2',
        '-3': '-3',
        '-4': '-4',
        '-5': '-5',
        '-6': '-6',
        '-7': '-7',
        '-8': '-8',
        '-9': '-9',
        '-10': '-10',
        '-12': '-12',
        '-13': '-13',
        '-14': '-14',
        '-15': '-15',
        '-16': '-16',
        '-17': '-17',
        '-18': '-18',
        '-19': '-19',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        12: '12',
        13: '13',
        14: '14',
        15: '15',
        16: '16',
        17: '17',
        18: '18',
        19: '19'
      },
      width: _size,
      minWidth: _size,
      height: _size,
      minHeight: _size,
      screens: {
        '-2xl': { max: '1535px' },
        '-xl': { max: '1279px' },
        '-lg': { max: '1023px' },
        '-md': { max: '767px' },
        '-sm': { max: '639px' }
      },
      inset: {
        25: '25%',
        50: '50%',
        75: '75%'
      },
      transitionDuration: {
        400: '0.4s'
      },
      colors: {
        inherit: 'inherit'
      },
      padding: {
        '8px': '8px',
        '9px': '9px',
        '10px': '10px',
        '11px': '11px',
        '12px': '12px',
        '13px': '13px',
        '14px': '14px'
      }
    }
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover', 'dark'],
    borderColor: ['responsive', 'hover', 'focus', 'group-hover', 'dark'],
    backgroundColor: ['responsive', 'hover', 'focus', 'group-hover', 'dark'],
    translate: ['responsive', 'hover', 'group-hover'],
    opacity: ['responsive', 'hover', 'focus', 'group-hover', 'dark'],
    position: ['responsive', 'hover', 'group-hover'],
    scale: ['responsive', 'hover', 'group-hover'],
    overflow: ['responsive', 'hover'],
    padding: ['responsive', 'hover'],
    fontSize: ['responsive', 'hover', 'group-hover'],
    borderStyle: ['responsive', 'hover', 'group-hover', 'focus', 'dark'],
    boxShadow: [
      'responsive',
      'hover',
      'focus',
      'active',
      'group-hover',
      'dark'
    ],
    borderWidth: ['responsive', 'hover', 'focus', 'group-hover']
  },
  darkMode: 'class',

  plugins: [require('@tailwindcss/custom-forms')]
}
