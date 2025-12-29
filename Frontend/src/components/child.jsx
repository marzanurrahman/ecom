import React, { memo} from 'react'

function Child({displayCount}) {
  console.log("Child Component Render....");

  return (
    <div>
    
    <button onClick={displayCount} className='p-3 bg-blue-500 text-white font-semibold'>
      Display
    </button>

    </div>
  );
}

export default memo(Child);