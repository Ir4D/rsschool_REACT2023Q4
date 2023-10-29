const Spinner = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        margin: 'auto',
        background: 'rgb(36, 36, 36)',
        display: 'block',
        shapeRendering: 'auto',
        animationPlayState: 'running',
        animationDelay: '0s',
      }}
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      {Array(12)
        .fill(null)
        .map((_, index) => {
          const rotation = index * 30;
          const begin = `${-index / 12}s`;
          return (
            <g
              key={index}
              transform={`rotate(${rotation} 50 50)`}
              style={{
                animationPlayState: 'running',
                animationDelay: '0s',
              }}
            >
              <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#ffffff" style={{ animationPlayState: 'running', animationDelay: '0s' }}>
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin={begin} repeatCount="indefinite" style={{ animationPlayState: 'running', animationDelay: '0s' }}></animate>
              </rect>
            </g>
          );
        })}
    </svg>
  )
}

export default Spinner;