import { create } from 'zustand'

interface BearState {
  bears: number,
  foodperbear: number,
}

const useBearStore = create<BearState>()(() => ({
  bears: 3,
  foodperbear: 4,
}))

function TotalFood() {
  var tF = useBearStore((state) => state.bears * state.foodperbear)
  return (
    <div>
      ${tF}
    </div>
  )
}
