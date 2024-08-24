import React from 'react'

const listInfo = [
  { id: 1, title: 'profit', content: '', number: '10,000' },
  { id: 2, title: 'cpu', content: 'Intel Core i3', number: '' },
  { id: 3, title: 'gpu', content: 'RTX', number: '3060' },
  { id: 4, title: 'ram', content: '', number: '8' },
  { id: 5, title: 'storage', content: '', number: '128' },
]

const Card = () => {
  return (
    <div className="card">
      <div className="card__border"></div>
      <div className="card__border"></div>
      <div className="card__list space-y-1">
        {listInfo.map(item => (
          <div className="flex items-center justify-between" key={item.id}>
            <div className="uppercase font-semibold text-white-50">{item.title}</div>
            <div className="flex items-center space-x-1">
              {item.title === 'profit' && <img className="size-4" src="/assets/images/icons/icon-star-circle.svg" alt="Icon Star" />}
              <p className=" text-white font-semibold">{item.content} <span className="font-geist">{item.number}</span></p>
              {(item.title !== 'cpu' && item.title !== 'gpu') && (
                <span className="text-white-50 font-semibold">{item.title === 'profit' ? '/ hour' : 'GB'}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Card