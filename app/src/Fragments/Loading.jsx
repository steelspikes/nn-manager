import React from "react";
import '../Styles/Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faNetworkWired } from '@fortawesome/free-solid-svg-icons'
import '../Styles/Loading.css';

function Loading({
    show, text
}) {
    return show && <div className="absolute z-40 w-full h-screen bg-black/10 flex items-center justify-center loading">
        <div className="loader mr-5"></div>
        <p className="text-2xl font-bold">{text}</p>
    </div>
}

export default Loading;
