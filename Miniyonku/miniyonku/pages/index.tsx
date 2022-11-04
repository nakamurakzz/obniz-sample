import type { NextPage } from 'next'
import { useCallback } from 'react';
import axios from 'axios';

const useHome = () => {
  const connect = useCallback(async () => {
    console.log("connect");
    const res = await axios.get("/api/obniz", {
    });
    if(res.status == 200){
      console.log("connect success");
    }
  }, []);

  const close = useCallback(async () => {
    console.log("close");
    const res = await axios.post("/api/obniz", {
      command: "close",
    });
  }, []);

  const start = useCallback(async () => {
    console.log("start");
    const res = await axios.post("/api/obniz", {
      command: "start",
    });
    console.log(res.status)
  }, []);

  const stop = useCallback(async () => {
    console.log("stop");
    const res = await axios.post("/api/obniz", {
      command: "stop",
    });
  }, []);

  const reverse = useCallback(async () => {
    console.log("reverse");
    const res = await axios.post("/api/obniz", {
      command: "reverse",
    });
  }, []);

  return { start, connect, stop, reverse, close }
}

const Home: NextPage = () => {
  const { start, connect, stop, reverse, close } = useHome()
  return (
    <>
      <header className="flex bg-indigo-700 text-white p-6 justify-center">
        <div className='text-3xl'>操作</div>
      </header>
      <div className='m-10 flex justify-center'>
        <div className='container flex justify-center'>
          <button className='text-2xl w-36 bg-gradient-to-br bg-indigo-300 text-white rounded-full px-4 py-2 mx-2' onClick={connect}>
            connect
          </button>
          <button className='text-2xl w-36 bg-gradient-to-br bg-gray-500 text-white rounded-full px-4 py-2 mx-2' onClick={close}>
            close
          </button>
        </div>
      </div>
      <div className='m-10 flex justify-center'>
        <div className='container flex justify-center'>
          <button className='text-2xl w-36 bg-gradient-to-br bg-indigo-500 text-white rounded-full px-4 py-2' onClick={start}>
            start
          </button>
        </div>
      </div>
      <div className='m-10 flex justify-center'>
        <div className='container flex justify-center'>
          <button className='text-2xl w-36 bg-gradient-to-br bg-indigo-800 text-white rounded-full px-4 py-2' onClick={reverse}>
            reverse
          </button>
        </div>
      </div>
      <div className='m-10 flex justify-center'>
        <div className='container flex justify-center'>
          <button className='text-2xl w-36 bg-gradient-to-br bg-red-700 text-white rounded-full px-4 py-2' onClick={stop}>
            stop
          </button>
        </div>
      </div>      
      <div className='m-10 flex justify-center'>
        <div className='container flex justify-center'>
          <button className='text-2xl w-36 bg-gradient-to-br bg-red-300 text-white rounded-full px-4 py-2' onClick={stop}>
            horn
          </button>
        </div>
      </div>
      <div className='m-10 flex justify-center'>
        <div className='container flex justify-center'>
          <button className='text-2xl w-36 bg-gradient-to-br bg-red-300 text-white rounded-full px-4 py-2' onClick={stop}>
            light on
          </button>
        </div>
        <div className='container flex justify-center'>
          <button className='text-2xl w-36 bg-gradient-to-br bg-red-300 text-white rounded-full px-4 py-2' onClick={stop}>
            light off
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
