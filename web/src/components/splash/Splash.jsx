import motivationalPlutaJSON from "../../../../android/app/src/main/assets/motivationalPluta.json";
import {useEffect, useState} from "react";
import "./Splash.css"
import {useWebSocketContext} from "../../utils/websocketContext.jsx";

function Splash() {
    const motivationalPluta = motivationalPlutaJSON;
    const [splashText, setSplashText] = useState("");

    const {lastMessage} = useWebSocketContext();

    useEffect(() => {
        setSplashText(motivationalPluta[Math.floor(Math.random() * motivationalPluta.length)]);
    }, []);

    useEffect(() => {
        if (lastMessage !== null && JSON.parse(lastMessage.data).type === 'currentEventDescription') {
            setSplashText("EVENT: "+JSON.parse(lastMessage.data).description);
            console.log(JSON.parse(lastMessage.data))
        }
    }, [lastMessage]);

    return (
        <div className={"splash"}>
            {splashText}
        </div>
    )
}

export default Splash;