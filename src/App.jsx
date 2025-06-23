import { useEffect, useRef, useState } from "react"
import { generate } from "./urug";

function App() {

  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  const [scount, setSCount] = useState(2);
  const [maxS, setMaxS] = useState(3);

  const [isTracking, setTracking] = useState(false);

  const uinput = useRef(null)
  const sliderBg = useRef(null)
  const sBtn = useRef(null)

  useEffect(() => {

    const OnMouseMove = (e) => {
      if (isTracking){
        setPosX(e.clientX)
        setPosY(e.clientY)
      }
    }

    const OnTouchMove = (e) => {
      if (isTracking) {
        const touch = e.touches[0]
        setPosX(touch.clientX)
        setPosY(touch.clientY)
      }
    }

    const OnMouseUp = () => {
      setTracking(false);
    }

    document.addEventListener('mousemove', OnMouseMove)
    document.addEventListener('touchmove', OnTouchMove)
    document.addEventListener('mouseup', OnMouseUp)
    document.addEventListener('touchend', OnMouseUp)

    return () => {
      document.removeEventListener('mousemove', OnMouseMove)
      document.removeEventListener('mouseup', OnMouseUp)
      document.removeEventListener('touchmove', OnTouchMove)
      document.removeEventListener('touchend', OnMouseUp)
    }
  }, [isTracking])


  useEffect(() => {
    const MoveSlider = () => {
      const slider = document.getElementById('slider');
      const pos = slider.getBoundingClientRect()
      const unit = pos.width / maxS
      const sets = {
        1: pos.x,
        2: pos.x + (unit*1),
        3: pos.x + (unit*2),
        4: pos.x + (unit*3)
      }

      let count = 1
      
      if (posX >= sets[4]) {
        count = 4
      } else if (posX >= sets[3]) {
        count = 3
      } else if (posX >= sets[2]){
        count = 2
      } else if (posX >= sets[1]){
        count = 1
      } else {
        count = 1
      }
      setSCount(count)

      const btn = sBtn.current
      const bg = sliderBg.current
      const mousePos = (posX - pos.x)
      let btnPos = 0
      if (mousePos < 0) {
        btnPos = 0
      } else if (mousePos > pos.width){
        btnPos = pos.width
      } else {
        btnPos = mousePos
      }
      btn.style.left = `${parseInt(btnPos - 15)}px`
      bg.style.width = `${parseInt(btnPos)}px`

    }

    if(isTracking) {
      MoveSlider()
    }
  }, [isTracking, posX, posY, maxS])

  useEffect(() => {
    const getSliderPos = () => {
      const slider = document.getElementById('slider');
      const pos = slider.getBoundingClientRect()
      const unit = pos.width / maxS

      const btn = sBtn.current
      const bg = sliderBg.current

      btn.style.left = `${parseInt((unit * (scount - 1)) - 15)}px`
      bg.style.width = `${parseInt((unit * (scount - 1)))}px`
    }

    document.addEventListener('resize', getSliderPos)

    if (!isTracking) {
      getSliderPos()
    }

    return () => {
      document.removeEventListener('resize', getSliderPos)
    }
  }, [scount, isTracking])


  const handleMouseDown = (e) => {
    setTracking(true);
  }

  const handleClickGen = (e) => {
    const username = generate(scount)
    uinput.current.value = username
  }

  return (
    <>
      <div className="absolute flex flex-col w-screen h-screen overflow-auto font-ubuntu bg-gradient-to-br text-white from-cyan-800 via-black to-pink-950 top-0 left-0">
        <div className="w-full my-auto mt-20 flex flex-col">
            <h3 className="text-center text-4xl font-bold uppercase font-['Oswald']">Unique Random Username Generator</h3>
            <div className="mt-5 w-full py-3">
              <div className="w-full h-full">
                <div className="relative">
                  <div className="absolute backdrop-blur-2xl bg-black inset-0"></div>
                  <input ref={uinput} type="text" className="relative text-center w-full outline-none transition text-white border border-pink-500 py-3 px-5 text-3xl" spellCheck={false} placeholder="Generate a username" />
                </div>
                <div className="mt-10">
                  <div className="w-full px-20 flex flex-col">
                      <button onClick={handleClickGen} className="mx-auto px-5 py-3 bg-pink-500 rounded text-2xl font-['Oswald'] mb-5 hover:bg-transparent border-2 cursor-pointer border-transparent transition hover:text-pink-500 hover:border-pink-500">Generate</button>
                      <h3 className="text-center text-2xl mb-10">Length:</h3>
                      <div id="slider" className="h-2 w-2/3 mx-auto bg-white relative rounded-full select-none">
                        <div ref={sliderBg} className="h-full absolute top-0 left-0 bg-sky-600 rounded-full select-none"></div>
                        <div onMouseDown={handleMouseDown} onTouchStart={handleMouseDown} ref={sBtn} className="h-[30px] w-[30px] rounded-full bg-sky-600 absolute -top-3 select-none"></div>
                      </div>
                      <h3 className="text-center text-2xl text-sky-600 mt-10">{scount} Syllables</h3>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div className="mt-20 flex flex-col px-50 pb-10">
          <h3 className="text-center text-3xl font-['Oswald'] mb-5">About</h3>
          <p className="mx-auto text-lg">
            If you are looking for a unique username that is elegant, catchy and free from numbers and pre-existing words. This is the site for you.
            Each username is randomly generated following basic rules of made-up words. In the end you get a possible completely unique name, that is easy to remember, free of numbers and no existing words.
            This was created out of passion for minimalistic and cool usernames. 
          </p>
        </div>
      </div>
    </>
  )
}

export default App
