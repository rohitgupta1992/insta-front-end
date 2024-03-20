import React,{useEffect} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import PageRender from "./PageRender";
import Alert from './components/alert/Alert';
import NotFound from "./components/NotFound";
import Header from "./components/header/Header";
import Home from "./pages/home";
import StatusModal from "./components/StatusModal";
import Login from "./pages/login"
import Register from './pages/register'
import io from 'socket.io-client'
import SocketClient from './SocketClient'
import { GLOBALTYPES } from './redux/actions/globalTypes'
import { refreshToken } from './redux/actions/authAction'
import { getPosts } from './redux/actions/postAction'
import { getSuggestions } from './redux/actions/suggestionsAction'
import { getNotifies } from './redux/actions/notifyAction'
import CallModal from './components/message/CallModal'
import Peer from 'peerjs'

export default function App() {

  const { auth, status, call } = useSelector(state => state);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())

    const socket = io()
    dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
    return () => socket.close()
  },[dispatch])
  
  useEffect(() => {
    if(auth.token) {
      dispatch(getPosts(auth.token))
      dispatch(getSuggestions(auth.token))
      dispatch(getNotifies(auth.token))
    }
  }, [dispatch, auth.token])

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") {}
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {}
      });
    }
  },[])
  
  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: '/', secure: true
    })
    console.log(newPeer)
    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
  },[dispatch])



  const Layout = () => {
    return (
      <div>
        <Alert/>
        <input type="checkbox" id="theme" />
        <div className={`App ${status && 'mode'}`}>
          <div className="main">
          {auth.token && <Header />}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}
            <Routes>
              <Route path="/" element={auth.token ?<Home />:<Login/>} />
              <Route path="/:page" element={auth.token ?<PageRender />:<Login/>} />
              <Route path="/:page/:id" element={auth.token ?<PageRender />:<Login/>} />
              <Route path="*" element={<NotFound />} />
              <Route path="register" element={<Register/>}/>
            </Routes>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Layout />
    </Router>
  );
}
