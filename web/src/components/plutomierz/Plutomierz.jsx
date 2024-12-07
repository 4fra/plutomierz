import "./Plutomierz.css"
import {useEffect, useState} from "react";
import useWebSocket from "react-use-websocket";

function Plutomierz() {
    const [plutaValue, setPlutaValue] = useState(0);
    const [parsedPlutaValue, setParsedPlutaValue] = useState(0);

    const plutaSocket = "wss://api.plutomierz.ovh";
    const {lastMessage} = useWebSocket(plutaSocket)

    const plutaColor = [
        {color: "red", minValue: -75, maxValue: -20, dialValue: 0},
        {color: "yellow", minValue: -20, maxValue: 10, dialValue: 55},
        {color: "green", minValue: 10, maxValue: 35, dialValue: 80},
        {color: "darkgreen", minValue: 35, maxValue: 75, dialValue: 100},
    ]

    useEffect(() => {
        console.log(lastMessage);

        if (lastMessage !== null && JSON.parse(lastMessage.data).type === 'pluta') {
            console.log(JSON.parse(lastMessage.data));

            setPlutaValue(JSON.parse(lastMessage.data).value);
            setParsedPlutaValue(100 - JSON.parse(lastMessage.data).value / 1.5);
        }
    }, [lastMessage]);

    const isPlutaLevelCritical = plutaValue > 100;
    const indicatorAngle = 135 + ((parsedPlutaValue + 75) / 150) * 270;

    // UWAGA!!!! Kod poniżej i trochę powyżej jest KRADZIONY i jego modyfikacja może być utrudniona.
    // Szczególną uwagę należy zwrócić na nazwy zmiennych, które mogą być mylące i błędne.
    const radius = 100;
    const centerX = 150;
    const centerY = 150;
    const x2 = centerX + radius * Math.cos((indicatorAngle * Math.PI) / 180);
    const y2 = centerY - radius * Math.sin((indicatorAngle * Math.PI) / 180);

    return (
        <div className="box">
            <svg className="canvas" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M 50 150 A 100 100 0 1 1 250 150"
                    stroke="url(#gradient)"
                    strokeWidth="20"
                    fill="none"
                    strokeLinecap="round"
                />
                <line
                    x1="150"
                    y1="150"
                    x2={x2}
                    y2={y2}
                    stroke="black"
                    strokeWidth="8"
                    strokeLinecap="round"
                />
                <circle cx="150" cy="150" r="5" fill="black"/>
                <defs>
                    <linearGradient id="gradient" gradientTransform="rotate(0)">
                        {plutaColor.map((color, key) => (
                            <stop key={key} offset={color.dialValue + "%"} stopColor={color.color}/>
                        ))}
                    </linearGradient>
                </defs>
            </svg>
            <div className={"plutaInfo"}>
                {plutaValue} Plut
            </div>
        </div>
    )
}

export default Plutomierz;