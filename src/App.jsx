import { useEffect, useRef, useState } from "react"
import { generate } from "./urug";

function App() {

  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  const [scount, setSCount] = useState(2);
  const [maxS, setMaxS] = useState(3);
  const [gName, setGName] = useState("");

  const [isTracking, setTracking] = useState(false);

  const countRef = useRef(scount)
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
      countRef.current = scount
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
  }, [isTracking, scount])


  useEffect(() => {
    const MoveSlider = () => {
      const slider = document.getElementById('slider');
      const pos = slider.getBoundingClientRect()
      const unit = pos.width / maxS
      const sets = {
        1: (unit*0),
        2: (unit*1),
        3: (unit*2),
        4: (unit*3)
      }

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

      let count = 1
      const offset = 30
      const countS = countRef.current

      if (countS < 4 && (btnPos > sets[countS] + offset && (btnPos > sets[3] + offset && btnPos <= sets[4])) || btnPos >= sets[4] - offset){
        count = 4
      } else if(countS < 3  && (btnPos > sets[countS] + offset && (btnPos > sets[2] + offset && btnPos <= sets[3] + offset)) || (countS > 3 && (btnPos < sets[countS] + offset && (btnPos >= sets[3] + offset && btnPos < sets[4] - offset))) || (btnPos >= sets[3] - offset && btnPos <= sets[3] + offset)) {
        count = 3
      } else if(countS < 2 && (btnPos > sets[countS] + offset && (btnPos > sets[1] + offset && btnPos <= sets[2] + offset)) || (countS > 2 && (btnPos < sets[countS] + offset && (btnPos >= sets[2] + offset && btnPos < sets[3] - offset))) || (btnPos >= sets[2] - offset && btnPos <= sets[2] + offset)) {
        count = 2
      } else if (btnPos <= sets[1] + offset){
        count = 1
      }

      setSCount(count)
    }

    if(isTracking) {
      MoveSlider()
    }
  }, [isTracking, posX, posY, maxS])

  const getSliderPos = () => {
    const slider = document.getElementById('slider');
    const pos = slider.getBoundingClientRect()
    const unit = pos.width / maxS

    const btn = sBtn.current
    const bg = sliderBg.current
    const countS = countRef.current

    btn.style.left = `${parseInt((unit * (countS - 1)) - 15)}px`
    bg.style.width = `${parseInt((unit * (countS - 1)))}px`
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Enter"){
        const username = generate(scount)
        uinput.current.value = username
      }
    }

    window.addEventListener('resize', getSliderPos)
    document.addEventListener('keypress', handleKey)
    
    return () => {
      window.removeEventListener('resize', getSliderPos)
      document.removeEventListener('keypress', handleKey)
    }

  }, [])

  useEffect(() => {

    if (!isTracking) {
      getSliderPos()
    }
  }, [scount, isTracking])


  const handleMouseDown = (e) => {
    setTracking(true);
    if (e.touches) {
      const touch = e.touches[0]
      setPosX(touch.clientX)
      setPosY(touch.clientY)

    } else {
      setPosX(e.clientX)
      setPosY(e.clientY)
    }
  }

  const handleClickGen = (e) => {
    const username = generate(scount)
    setGName(username)
    uinput.current.value = username
  }

  const handleClickRandWord = async (e) => {
    const res = await fetch('https://random-word-api.vercel.app/api?words=1')
    if(res.ok) {
      const body = await res.json()
      uinput.current.value = gName + body[0]
    }
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
                <div className="bg-indigo-950 pb-5 pt-10">
                  <div className="w-full px-10 flex flex-col">
                      <div className="flex flex-wrap md:flex-nowrap justify-center mx-auto gap-5 mb-5">
                        <button onClick={handleClickGen} className="mb-auto px-5 py-3 bg-pink-500 rounded md:text-2xl font-['Oswald'] hover:bg-transparent border-2 cursor-pointer border-transparent transition hover:text-pink-500 hover:border-pink-500">Generate</button>
                        <div className="flex flex-col">
                          <button onClick={handleClickRandWord} className="px-5 py-3 bg-cyan-500 rounded md:text-2xl font-['Oswald'] hover:bg-transparent border-2 cursor-pointer border-transparent transition hover:text-cyan-500 hover:border-cyan-500">Add Random Word</button>
                          <a className="text-xs underline opacity-50 hover:opacity-80 text-center" href="https://random-word-api.vercel.app" target="_blank" rel="noreferrer">By Rando Vercel API</a>
                        </div>
                      </div>
                      <h3 className="text-center text-2xl mb-10">Length:</h3>
                      <div id="slider" className="h-2 w-full md:w-2/3 mx-auto bg-white relative rounded-full select-none">
                        <div ref={sliderBg} className="h-full absolute top-0 left-0 bg-cyan-500 rounded-full select-none"></div>
                        <div onMouseDown={handleMouseDown} onTouchStart={handleMouseDown} ref={sBtn} className="h-[30px] w-[30px] rounded-full bg-cyan-500 absolute -top-3 select-none"></div>
                      </div>
                      <h3 className="text-center text-2xl text-cyan-500 mt-10">{scount} Syllables</h3>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div className="mt-20 flex flex-col px-5 pb-10">
          <h3 className="text-center text-3xl font-['Oswald'] mb-5">About</h3>
          <p className="mx-auto text-lg md:w-2/3 lg:w-1/3">
            If you are looking for a unique username that is elegant and catchy. This is the site for you.
            Each username is randomly generated following basic rules of made-up words. You get a completely unique name, that is easy to remember and free of numbers.
            This was created out of passion for minimalistic and cool usernames.
          </p>
        </div>
      </div>
    </>
  )
}

export default App
