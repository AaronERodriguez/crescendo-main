"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import * as Tone from "tone";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { Slider } from "./ui/slider";
import {motion, AnimatePresence} from 'framer-motion';

const Piano = () => {
  //State of Octave
  const [octave, setOctave] = React.useState<number>(4);
  const [volume, setVolume] = React.useState<number>(0);
  //Creation of Synth
  const synth = useRef<Tone.PolySynth | null>(null);

  //Refs for each key
  const qRef = useRef<HTMLButtonElement>(null);
  const wRef = useRef<HTMLButtonElement>(null);
  const eRef = useRef<HTMLButtonElement>(null);
  const rRef = useRef<HTMLButtonElement>(null);
  const tRef = useRef<HTMLButtonElement>(null);
  const yRef = useRef<HTMLButtonElement>(null);
  const uRef = useRef<HTMLButtonElement>(null);
  const iRef = useRef<HTMLButtonElement>(null);
  const oRef = useRef<HTMLButtonElement>(null);
  const pRef = useRef<HTMLButtonElement>(null);
  const twoRef = useRef<HTMLButtonElement>(null);
  const threeRef = useRef<HTMLButtonElement>(null);
  const fiveRef = useRef<HTMLButtonElement>(null);
  const sixRef = useRef<HTMLButtonElement>(null);
  const sevenRef = useRef<HTMLButtonElement>(null);
  const nineRef = useRef<HTMLButtonElement>(null);
  const zeroRef = useRef<HTMLButtonElement>(null);

  //Run once on component mount
  useEffect(() => {
    // Clean up the synth when the component unmounts
    synth.current = new Tone.PolySynth(Tone.Synth).toDestination();
    synth.current.set({ volume: volume });

    //Will keep track of pressed keys to avoid retriggering while held down
    const pressedKeys = new Set<string>();
    //Keyboard event handlers
    const keyNoteMap: Record<string, string> = {
      q: `C${octave}`,
      w: `D${octave}`,
      e: `E${octave}`,
      r: `F${octave}`,
      t: `G${octave}`,
      y: `A${octave}`,
      u: `B${octave}`,
      i: `C${octave + 1}`,
      o: `D${octave + 1}`,
      p: `E${octave + 1}`,
      "2": `C#${octave}`,
      "3": `D#${octave}`,
      "5": `F#${octave}`,
      "6": `G#${octave}`,
      "7": `A#${octave}`,
      "9": `C#${octave + 1}`,
      "0": `D#${octave + 1}`,
    };
    // Map keys to their corresponding refs
    const keyRefMap: Record<
      string,
      React.RefObject<HTMLButtonElement | null>
    > = {
      q: qRef,
      w: wRef,
      e: eRef,
      r: rRef,
      t: tRef,
      y: yRef,
      u: uRef,
      i: iRef,
      o: oRef,
      p: pRef,
      "2": twoRef,
      "3": threeRef,
      "5": fiveRef,
      "6": sixRef,
      "7": sevenRef,
      "9": nineRef,
      "0": zeroRef,
    };

    // Handlers for keydown and keyup events
    const keyDownHandler = (event: KeyboardEvent) => {
      const note = keyNoteMap[event.key.toLowerCase()];
      const button = keyRefMap[event.key.toLowerCase()]?.current;
      if (note && button && !pressedKeys.has(event.key)) {
        pressedKeys.add(event.key);
        playNote(note, button);
      }
    };

    const keyUpHandler = (event: KeyboardEvent) => {
      const note = keyNoteMap[event.key.toLowerCase()];
      const button = keyRefMap[event.key.toLowerCase()]?.current;
      if (note && button) {
        pressedKeys.delete(event.key);
        releaseNote(note, button);
      }
    };

    // Attach event listeners
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
      synth.current?.dispose();
    };
  }, [octave, volume]);

  //Functions to play and release notes
  const playNote = async (note: string, button: HTMLButtonElement) => {
    button.classList.add("!bg-purple-700");
    const now = Tone.now();
    synth.current?.triggerAttack(note, now);
  };
  const releaseNote = async (note: string, button: HTMLButtonElement) => {
    button.classList.remove("!bg-purple-700");
    const now = Tone.now();
    synth.current?.triggerRelease([note], now + 0.1);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Piano Layout */}
      <div className="flex flex-row w-full justify-center items-center gap-4">
        <Button size={'icon'} variant={'ghost'} onClick={() => setOctave((curr) => curr > 1 ? curr - 1 : 1)}>
          <ArrowLeftCircle className="h-6 w-6" />
        </Button>
        {/* Piano Container */}
        <div className="flex flex-col gap-0.5 select-none items-center">
          {/* Black keys positioned over white keys */}
          <div className="flex relative -left-63 text-white">
            <Button
              className="absolute h-24 left-8 flex items-end"
              onMouseDown={(e) => playNote(`C#${octave}`, e.currentTarget)}
              onMouseUp={(e) => releaseNote(`C#${octave}`, e.currentTarget)}
              onMouseLeave={(e) => releaseNote(`C#${octave}`, e.currentTarget)}
              ref={twoRef}
            >
              <span className="absolute">2</span>
            </Button>
            <Button
              className="absolute h-24 left-22 flex items-end"
              onMouseDown={(e) => playNote(`D#${octave}`, e.currentTarget)}
              onMouseUp={(e) => releaseNote(`D#${octave}`, e.currentTarget)}
              onMouseLeave={(e) => releaseNote(`D#${octave}`, e.currentTarget)}
              ref={threeRef}
            >
              <span className="absolute">3</span>
            </Button>
            <Button
              className="absolute h-24 left-46 flex items-end"
              onMouseDown={(e) => playNote(`F#${octave}`, e.currentTarget)}
              onMouseUp={(e) => releaseNote(`F#${octave}`, e.currentTarget)}
              onMouseLeave={(e) => releaseNote(`F#${octave}`, e.currentTarget)}
              ref={fiveRef}
            >
              <span className="absolute">5</span>
            </Button>
            <Button
              className="absolute h-24 left-60 flex items-end"
              onMouseDown={(e) => playNote(`G#${octave}`, e.currentTarget)}
              onMouseUp={(e) => releaseNote(`G#${octave}`, e.currentTarget)}
              onMouseLeave={(e) => releaseNote(`G#${octave}`, e.currentTarget)}
              ref={sixRef}
            >
              <span className="absolute">6</span>
            </Button>
            <Button
              className="absolute h-24 left-72 flex items-end"
              onMouseDown={(e) => playNote(`A#${octave}`, e.currentTarget)}
              onMouseUp={(e) => releaseNote(`A#${octave}`, e.currentTarget)}
              onMouseLeave={(e) => releaseNote(`A#${octave}`, e.currentTarget)}
              ref={sevenRef}
            >
              <span className="absolute">7</span>
            </Button>
            <Button
              className="absolute h-24 left-96 flex items-end"
              onMouseDown={(e) => playNote(`C#${octave + 1}`, e.currentTarget)}
              onMouseUp={(e) => releaseNote(`C#${octave + 1}`, e.currentTarget)}
              onMouseLeave={(e) => releaseNote(`C#${octave + 1}`, e.currentTarget)}
              ref={nineRef}
            >
              <span className="absolute">9</span>
            </Button>
            <Button
              className="absolute h-24 left-110 flex items-end"
              onMouseDown={(e) => playNote(`D#${octave + 1}`, e.currentTarget)}
              onMouseUp={(e) => releaseNote(`D#${octave + 1}`, e.currentTarget)}
              onMouseLeave={(e) => releaseNote(`D#${octave + 1}`, e.currentTarget)}
              ref={zeroRef}
            >
              <span className="absolute">0</span>
            </Button>
          </div>
          {/* White keys */}
          <div className="flex gap-0.5">
            <Button
              className="bg-white border border-black h-40 w-12 flex items-end"
              onMouseDown={(e) => playNote(`C${octave}`, e.currentTarget)}
              onMouseUp={(e) => releaseNote(`C${octave}`, e.currentTarget)}
              onMouseLeave={(e) => releaseNote(`C${octave}`, e.currentTarget)}
              ref={qRef}
            >
              <span className="absolute text-black">Q</span>
            </Button>
            <Button
              className="bg-white border border-black h-40 w-12 flex items-end"
              onMouseDown={(e) => playNote(`D${octave}`, e.currentTarget)}
              onMouseUp={(e) => releaseNote(`D${octave}`, e.currentTarget)}
              onMouseLeave={(e) => releaseNote(`D${octave}`, e.currentTarget)}
              ref={wRef}
            >
              <span className="absolute text-black">W</span>
            </Button>
            <Button
              className="bg-white border border-black h-40 w-12 flex items-end"
              onMouseDown={(e) => playNote(`E${octave}`, e.currentTarget)}
              onMouseUp={(e) => releaseNote(`E${octave}`, e.currentTarget)}
              onMouseLeave={(e) => releaseNote(`E${octave}`, e.currentTarget)}
              ref={eRef}
            >
              <span className="absolute text-black">E</span>
            </Button>
            <Button
              className="bg-white border border-black h-40 w-12 flex items-end"
              onMouseDown={(e) => playNote(`F${octave}`, e.currentTarget)}
              onMouseUp={(e) => releaseNote(`F${octave}`, e.currentTarget)}
              onMouseLeave={(e) => releaseNote(`F${octave}`, e.currentTarget)}
              ref={rRef}
            >
              <span className="absolute text-black">R</span>
            </Button>
            <Button
              className="bg-white border border-black h-40 w-12 flex items-end"
              onMouseDown={(e) => playNote(`G${octave}`, e.currentTarget)}
              onMouseUp={(e) => releaseNote(`G${octave}`, e.currentTarget)}
              onMouseLeave={(e) => releaseNote(`G${octave}`, e.currentTarget)}
              ref={tRef}
            >
              <span className="absolute text-black">T</span>
            </Button>
            <Button
              className="bg-white border border-black h-40 w-12 flex items-end"
              onMouseDown={(e) => playNote(`A${octave}`, e.currentTarget)}
              onMouseUp={(e) => releaseNote(`A${octave}`, e.currentTarget)}
              onMouseLeave={(e) => releaseNote(`A${octave}`, e.currentTarget)}
              ref={yRef}
            >
              <span className="absolute text-black">Y</span>
            </Button>
            <Button
              className="bg-white border border-black h-40 w-12 flex items-end"
              onMouseDown={(e) => playNote(`B${octave}`, e.currentTarget)}
              onMouseUp={(e) => releaseNote(`B${octave}`, e.currentTarget)}
              onMouseLeave={(e) => releaseNote(`B${octave}`, e.currentTarget)}
              ref={uRef}
            >
              <span className="absolute text-black">U</span>
            </Button>
            <Button
              className="bg-white border border-black h-40 w-12 flex items-end"
              onMouseDown={(e) => playNote(`C${octave + 1}`, e.currentTarget)}
              onMouseUp={(e) => releaseNote(`C${octave + 1}`, e.currentTarget)}
              onMouseLeave={(e) => releaseNote(`C${octave + 1}`, e.currentTarget)}
              ref={iRef}
            >
              <span className="absolute text-black">I</span>
            </Button>
            <Button
              className="bg-white border border-black h-40 w-12 flex items-end"
              onMouseDown={(e) => playNote(`D${octave + 1}`, e.currentTarget)}
              onMouseUp={(e) => releaseNote(`D${octave + 1}`, e.currentTarget)}
              onMouseLeave={(e) => releaseNote(`D${octave + 1}`, e.currentTarget)}
              ref={oRef}
            >
              <span className="absolute text-black">O</span>
            </Button>
            <Button
              className="bg-white border border-black h-40 w-12 flex items-end"
              onMouseDown={(e) => playNote(`E${octave + 1}`, e.currentTarget)}
              onMouseUp={(e) => releaseNote(`E${octave + 1}`, e.currentTarget)}
              onMouseLeave={(e) => releaseNote(`E${octave + 1}`, e.currentTarget)}
              ref={pRef}
            >
              <span className="absolute text-black">P</span>
            </Button>
          </div>
        </div>
        <Button size={'icon'} variant={'ghost'} onClick={() => setOctave((curr) => curr < 7 ? curr + 1 : 7)}>
          <ArrowRightCircle className="h-6 w-6" />
        </Button>
      </div>
      {/* Current octave */}
      <div className="overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={octave}
            initial={{ scale: 1, y: 0 }}
            animate={{ scale: [1, 1.3, 1], y: [0, -10, 0] }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center text-sm mt-2 font-semibold"
          >
            Current Octave: {octave}
          </motion.p>
        </AnimatePresence>
        <div className="flex flex-row items-center justify-center gap-2">
          <p className="text-center text-sm">Volume: {volume}</p>
          <Slider
            value={[volume]}
            min={-100}
            max={20}
            onValueChange={(value) => {
              console.log(value[0]);
              setVolume(value[0]);
            }}
            className="w-32"
          />
        </div>
      </div>
    </div>
  );
};

export default Piano;
