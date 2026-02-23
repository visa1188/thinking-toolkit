// icons.js

const Icons = {

  circle: (size = 80) => `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="4" fill="black"/>
    </svg>
  `,

  circleSmall: () => Icons.circle(60),
  circleLarge: () => Icons.circle(120),

  tallBar: () => `
    <svg width="40" height="140" viewBox="0 0 40 140">
      <rect width="40" height="140" fill="black"/>
    </svg>
  `,

  shortBar: () => `
    <svg width="40" height="70" viewBox="0 0 40 70">
      <rect width="40" height="70" fill="black"/>
    </svg>
  `,

  glassFull: () => `
    <svg width="60" height="90" viewBox="0 0 60 90">
      <rect x="5" y="5" width="50" height="80"
        stroke="black" stroke-width="4" fill="lightblue"/>
    </svg>
  `,

  glassEmpty: () => `
    <svg width="60" height="90" viewBox="0 0 60 90">
      <rect x="5" y="5" width="50" height="80"
        stroke="black" stroke-width="4" fill="none"/>
    </svg>
  `,

  flame: () => `
    <svg width="80" height="80" viewBox="0 0 100 100">
      <path d="M50 10 C70 40, 80 60, 50 90 C20 60, 30 40, 50 10 Z"
        fill="red"/>
    </svg>
  `,

  snowflake: () => `
    <svg width="80" height="80" viewBox="0 0 100 100">
      <line x1="50" y1="10" x2="50" y2="90" stroke="blue" stroke-width="6"/>
      <line x1="10" y1="50" x2="90" y2="50" stroke="blue" stroke-width="6"/>
      <line x1="20" y1="20" x2="80" y2="80" stroke="blue" stroke-width="6"/>
      <line x1="80" y1="20" x2="20" y2="80" stroke="blue" stroke-width="6"/>
    </svg>
  `,
};