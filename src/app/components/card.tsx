import React from 'react'

const listInfo = [
  { id: 1, title: 'cpu', content: 'Intel Core i3', number: '' },
  { id: 2, title: 'gpu', content: 'RTX', number: '3060' },
  { id: 3, title: 'ram', content: '', number: '8' },
  { id: 4, title: 'storage', content: '', number: '128' },
]

const Card = () => {
  return (
    <div className="card">
      <div className="card__background">
        <img src="/assets/images/configuration-background.svg" alt="Configuration Background" />
      </div>
      <div className="card__list space-y-2">
        {listInfo.map(item => (
          <div className="flex items-center justify-between text-base leading-[20px] font-geist" key={item.id}>
            <div className="uppercase text-green-700">{item.title}</div>
            <div className="flex items-center space-x-1 text-title">
              <p>{item.content} <span>{item.number}</span></p>
              {(item.title !== 'cpu' && item.title !== 'gpu') && (
                <span>{item.title === 'profit' ? '/ hour' : 'GB'}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Card