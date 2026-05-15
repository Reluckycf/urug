import { useEffect, useRef, useState } from "react"
import { generate } from "./urug";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function App() {

  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  const [scount, setSCount] = useState(4);
  const [wcount, setWCount] = useState(4)
  const [gName, setGName] = useState("");
  const [randomWord, setRandomWord] = useState("");
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const [isTracking, setTracking] = useState(false);
  const [isTracking2, setTracking2] = useState(false);

  const maxS = useRef(40-4)
  const maxW = useRef(25-1)
  const countRef = useRef(scount)
  const countRef2 = useRef(wcount)
  const uinput = useRef(null)
  const sliderBg = useRef(null)
  const sBtn = useRef(null)
  const sliderBg2 = useRef(null)
  const sBtn2 = useRef(null)
  const lengthInput1 = useRef(null)
  const lengthInput2 = useRef(null)

  useEffect(() => {

    const OnMouseMove = (e) => {
      if (isTracking || isTracking2){
        setPosX(e.clientX)
        setPosY(e.clientY)
      }
    }

    const OnTouchMove = (e) => {
      if (isTracking || isTracking2) {
        const touch = e.touches[0]
        setPosX(touch.clientX)
        setPosY(touch.clientY)
      }
    }

    const OnMouseUp = () => {
      setTracking(false);
      setTracking2(false);
      countRef.current = scount
      countRef2.current = wcount
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
  }, [isTracking, isTracking2, scount, wcount])


  useEffect(() => {
    const MoveSlider = () => {
      const slider = document.getElementById('slider');
      const pos = slider.getBoundingClientRect()
      const unit = pos.width / maxS.current
      let sets = []
      for (let i = 0; i < maxS.current + 1; i++) {
        sets.push(unit*i)
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
      const offset = (sets[0] + sets[1]) / 2
      const countS = countRef.current
      const min = 4

      if (countS < (sets.length) && (btnPos > sets[countS-1] + offset && (btnPos > sets[sets.length-2] + offset && btnPos <= sets[sets.length-1])) || btnPos >= sets[sets.length-1] - offset){
        count = sets.length-1 + min
      } 

      for(let i = 0; i < sets.length; i++) {
        if (countS < i+1 && (btnPos > sets[countS-1] + offset && (btnPos > sets[i-1] + offset && btnPos <= sets[i] + offset)) || (countS > i+1 && (btnPos < sets[countS-1] + offset && (btnPos >= sets[i] + offset && btnPos < sets[i+1] - offset))) || (btnPos >= sets[i] - offset && btnPos <= sets[i] + offset)) {
          count = i + min
        }
      }

      // if (btnPos <= sets[0] + offset){
      //   count = min
      // }

      setSCount(count)
    }

    const MoveSlider2 = () => {
      const slider = document.getElementById('slider2');
      const pos = slider.getBoundingClientRect()
      const unit = pos.width / maxW.current
      let sets = []
      for (let i = 0; i < maxW.current + 1; i++) {
        sets.push(unit*i)
      }

      const btn = sBtn2.current
      const bg = sliderBg2.current
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
      const offset = (sets[0] + sets[1]) / 2
      const countS = countRef2.current
      const min = 1

      if (countS < (sets.length) && (btnPos > sets[countS-1] + offset && (btnPos > sets[sets.length-2] + offset && btnPos <= sets[sets.length-1])) || btnPos >= sets[sets.length-1] - offset){
        count = sets.length-1 + min
      } 

      for(let i = 0; i < sets.length; i++) {
        if (countS < i+1 && (btnPos > sets[countS-1] + offset && (btnPos > sets[i-1] + offset && btnPos <= sets[i] + offset)) || (countS > i+1 && (btnPos < sets[countS-1] + offset && (btnPos >= sets[i] + offset && btnPos < sets[i+1] - offset))) || (btnPos >= sets[i] - offset && btnPos <= sets[i] + offset)) {
          count = i + min
        }
      }

      // if (btnPos <= sets[0] + offset){
      //   count = min
      // }

      setWCount(count)
    }

    if(isTracking) {
      MoveSlider()
    }
    if(isTracking2) {
      MoveSlider2()
    }
  }, [isTracking, isTracking2, posX, posY, maxS])

  const getSliderPos = () => {
    const slider = document.getElementById('slider');
    const pos = slider.getBoundingClientRect()
    const unit = pos.width / maxS.current

    const btn = sBtn.current
    const bg = sliderBg.current
    const countS = countRef.current

    btn.style.left = `${parseInt((unit * (countS - 4)) - 15)}px`
    bg.style.width = `${parseInt((unit * (countS - 4)))}px`
  }

  const getSliderPos2 = () => {
    const slider = document.getElementById('slider2');
    const pos = slider.getBoundingClientRect()
    const unit = pos.width / maxW.current

    const btn = sBtn2.current
    const bg = sliderBg2.current
    const countS = countRef2.current

    btn.style.left = `${parseInt((unit * (countS - 1)) - 15)}px`
    bg.style.width = `${parseInt((unit * (countS - 1)))}px`
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Enter"){
        handleClickGenAll()
      }
    }

    const setPos = () => {
      getSliderPos()
      getSliderPos2()
    }

    window.addEventListener('resize', setPos)
    document.addEventListener('keypress', handleKey)
    
    return () => {
      window.removeEventListener('resize', setPos)
      document.removeEventListener('keypress', handleKey)
    }

  }, [])

  useEffect(() => {

    if (!isTracking) {
      getSliderPos()
    }

    if(!isTracking2) {
      getSliderPos2()
    }

    lengthInput1.current.value = scount
    lengthInput2.current.value = wcount


  }, [scount, wcount, isTracking, isTracking2])


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

  const handleMouseDown2 = (e) => {
    setTracking2(true);
    if (e.touches) {
      const touch = e.touches[0]
      setPosX(touch.clientX)
      setPosY(touch.clientY)

    } else {
      setPosX(e.clientX)
      setPosY(e.clientY)
    }
  }

  const handleChangeLength = (e) => {
    const value = parseInt(e.target.value)
    if (value >= 4 && value <= 40) {
      setSCount(value)
      countRef.current = value
      getSliderPos()
    }
  }

  const handleChangeLengthWord = (e) => {
    const value = parseInt(e.target.value)
    if (value >= 1 && value <= 25) {
      setWCount(value)
      countRef2.current = value
      getSliderPos2()
    }
  }


  const handleClickGen = (e) => {
    setGenerating(true)
    let countInt = 0
    let maxCount = Math.random() * (8 - 4) + 4
    const interval = setInterval(() => {
      if(countInt <= maxCount) {
        const username = generate(scount)
        setGName(username)
        countInt++;
      } else {
        clearInterval(interval)
        setGenerating(false)
      }
    }, 50)
  }

  const handleClickGenAll = async () => {
    setGenerating(true)
    let countInt = 0
    let maxCount = Math.random() * (8 - 4) + 4
    const interval = setInterval(() => {
      if(countInt <= maxCount) {
        const username = generate(scount)
        setGName(username)
        countInt++;
      } else {
        clearInterval(interval)
        setGenerating(false)
      }
    }, 50)

    const res = await fetch(`${import.meta.env.VITE_API_URL}/words?length=${wcount}`)
    if(res.ok) {
      setGenerating(true)
      const body = await res.json()
      setRandomWord(body[0].text.toLowerCase().replace(/[^a-zA-Z]/g, ""))
      setTimeout(() => {
        setGenerating(false)
      }, 400)
    }

  }

  const handleClickRandWord = async (e) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/words?length=${wcount}`)
    if(res.ok) {
      setGenerating(true)
      const body = await res.json()
      setRandomWord(body[0].text.toLowerCase().replace(/[^a-zA-Z]/g, ""))
      setTimeout(() => {
        setGenerating(false)
      }, 400)
    }
  }

  const handleCopy = (e) => {
    if (!gName && !randomWord) {
      return
    }
    navigator.clipboard.writeText(gName+randomWord)
      .then(() => {
        setCopied(true);
        setTimeout(()=> {
          setCopied(false)
        }, 3000)
      })
      .catch(err => {
        console.error("Failed to copy text: ", err);
      });
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
                  <div className="relative w-full text-white border border-pink-500 py-3 px-5 text-3xl flex justify-center overflow-x-auto">
                    <p onClick={handleCopy} title="Click to copy" className={`w-full text-center ${gName||randomWord? "cursor-pointer" : ""}`}>
                      <span id="gName" className={`${gName ? "" : "opacity-70"} ${generating ? "text-pink-500" : "text-white"} transition duration-300`}>{gName ? gName : "Generate a username"}</span>
                      <span id="randomWord" className={`${generating ? "text-cyan-500" : "text-white"} transition duration-300`}>{randomWord}</span>
                    </p>
                  </div>
                  <div className={`Copied-text ${copied ? "opacity-100" : "opacity-0"} transition duration-1000 select-none pointer-events-none z-10 absolute w-full -bottom-11 flex items-center justify-center`}>
                    <div className="absolute bg-slate-700 w-4 h-4 rotate-45 -top-1"></div>
                    <div className="relative bg-slate-700 px-3 py-2 rounded">Username Copied!</div>
                  </div>
                  {/* <input onChange={handleChange} ref={uinput} type="text" className="relative text-center w-full outline-none transition text-white border border-pink-500 py-3 px-5 text-3xl" spellCheck={false} placeholder="Generate a username" /> */}
                </div>
                <div className="bg-indigo-950 pb-20 pt-15">
                  <div className="w-full px-10 flex flex-col">
                      <div className="flex flex-wrap sm:flex-row flex-col md:flex-nowrap gap-5 mb-5 mx-auto justify-center">
                        <button onClick={handleClickGen} className="mb-auto justify-self-center px-5 py-3 bg-pink-500 rounded md:text-2xl font-['Oswald'] hover:bg-transparent border-2 cursor-pointer border-transparent transition hover:text-pink-500 hover:border-pink-500">Random Name</button>  
                        <div className="order-first md:order-none group relative bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mb-auto rounded">
                            <div className="absolute inset-0 bg-transparent group-hover:bg-indigo-950 rounded m-0.5 transition"></div>
                            <button onClick={handleClickGenAll} className="relative mb-auto justify-self-center px-5 py-3 bg-gradient-to-r border-2 border-transparent hover:from-pink-500 hover:via-purple-500 hover:to-cyan-500 rounded md:text-2xl font-['Oswald'] cursor-pointer transition hover:text-transparent bg-clip-text ">Generate Username</button>
                        </div>
                        <div className="flex flex-col">
                          <button onClick={handleClickRandWord} className="px-5 py-3 bg-cyan-500 rounded md:text-2xl font-['Oswald'] hover:bg-transparent border-2 cursor-pointer border-transparent transition hover:text-cyan-500 hover:border-cyan-500">Random Word</button>
                          <a className="text-xs underline opacity-50 hover:opacity-80 text-center" href={import.meta.env.VITE_API_URL + "/docs"} target="_blank" rel="noreferrer">By URUG Random Word Generator</a>
                        </div>
                        {
                          randomWord && (
                            <button onClick={()=>setRandomWord("")} title="Remove Random Word" className="mb-auto px-5 py-3 bg-cyan-500 rounded md:text-2xl font-['Oswald'] hover:bg-transparent border-2 cursor-pointer border-transparent transition hover:text-cyan-500 hover:border-cyan-500">
                              <span className="hidden sm:block">
                                <FontAwesomeIcon icon={faXmark}/>
                              </span>
                              <span className="sm:hidden">Remove Word</span>
                            </button>
                          )
                        }
                        
                      </div>
                      {
                        (gName || randomWord) && (
                          <a href={"https://instantusername.com/?q=" + encodeURI(gName+randomWord)} target="_blank" rel="noreferrer" title="Check if the username is available on social media" className="mx-auto mb-10 px-5 py-2 disabled:opacity-60 bg-emerald-500 rounded md:text-2xl font-['Oswald'] hover:bg-transparent border-2 cursor-pointer border-transparent transition hover:text-emerald-500 hover:border-emerald-500">
                            <div className="flex gap-2 items-center">
                              <p>Check Username</p>
                              <div className="text-lg">
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                              </div>
                            </div>
                          </a>
                        )
                      }
                      <div className="Sliders flex flex-col gap-10">
                        <div className="nameSlider flex flex-col">
                          <div className="flex text-2xl mb-10 mx-auto gap-2">
                            <h3 className="">Name Length:</h3>
                            <input ref={lengthInput1} onChange={handleChangeLength} className="w-10 outline-none" type="number" min={4} max={40} defaultValue={scount} />
                          </div>
                          <div id="slider" className="h-2 w-full md:w-2/3 mx-auto bg-white relative rounded-full select-none">
                            <div ref={sliderBg} className="h-full absolute top-0 left-0 bg-pink-500 rounded-full select-none"></div>
                            <div onMouseDown={handleMouseDown} onTouchStart={handleMouseDown} ref={sBtn} className="h-[30px] w-[30px] rounded-full bg-pink-500 absolute -top-3 select-none"></div>
                          </div>
                        </div>
                        <div className="wordSlider flex flex-col">
                          <div className="flex text-2xl mb-10 mx-auto gap-2">
                            <h3 className="">Random Word Length:</h3>
                            <input ref={lengthInput2} onChange={handleChangeLengthWord} className="w-10 outline-none" type="number" min={1} max={25} defaultValue={wcount} />
                          </div>
                          <div id="slider2" className="h-2 w-full md:w-2/3 mx-auto bg-white relative rounded-full select-none">
                            <div ref={sliderBg2} className="h-full absolute top-0 left-0 bg-cyan-500 rounded-full select-none"></div>
                            <div onMouseDown={handleMouseDown2} onTouchStart={handleMouseDown2} ref={sBtn2} className="h-[30px] w-[30px] rounded-full bg-cyan-500 absolute -top-3 select-none"></div>
                          </div>
                        </div>

                      </div>
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
          <div className="mt-10 flex flex-col">
            <div className="flex w-full justify-center text-2xl mb-2">
              <a href="https://github.com/Reluckycf/urug/">
                <FontAwesomeIcon icon={faGithub}/>
              </a>
            </div>
            <a href="https://github.com/Reluckycf" target="_blank" rel="noreferrer" className="mx-auto text-sm hover:underline">by Reluckycf</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
