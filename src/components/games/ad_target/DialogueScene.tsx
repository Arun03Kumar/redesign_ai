    import { useEffect, useState } from "react";
    import { useLocation, useNavigate } from "react-router-dom";

    const dialogue = [
    {
        speaker: "left",
        text: "Hey! I saw this cool pair of red sneakers online!",
    },
    {
        speaker: "right",
        text: "Really? I've been looking for sporty ones with black stripes!",
    },
    {
        speaker: "left",
        text: "Check this out... they've got customizable LED lights!",
    },
    {
        speaker: "right",
        text: "Whoa! Maybe we should both get matching pairs? 👟",
    },
    ];

    export default function DialogueScene() {
    const [index, setIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [chat, setChat] = useState<any>([]);
    const [showNext, setShowNext] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const navigate = useNavigate();
    const location = useLocation()

    const [showModal, setShowModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState("");

    const options = [
        { id: 1, text: "An ad for running shoes with excellent cushioning" },
        { id: 2, text: "An ad for formal business footwear" },
        { id: 3, text: "An ad for customizable LED sneakers with black stripes" }, // Correct option
        { id: 4, text: "An ad for winter snow boots" },
    ];

    const handleOptionSelect = (optionId:any) => {
        setSelectedOption(optionId);

        if (optionId === 3) {
        setFeedback("🎉 Hooray! Creating an interactive quiz is a great choice!");
        } else {
        setFeedback("🤔 Hmm, that's not the best option. Try again!");
        }
    };

    const resetModal = () => {
        setShowModal(false);
        setSelectedOption(null);
        setFeedback("");
    };

    useEffect(() => {
        let cancelled = false;
        const current = dialogue[index];
        if (!current) return;

        const full = current.text;
        setDisplayedText("");
        setIsTyping(true); // Start typing

        (async () => {
        for (let i = 0; i < full.length; i++) {
            if (cancelled) return;
            setDisplayedText(full.slice(0, i + 1));
            await new Promise((r) => setTimeout(r, 35));
        }

        if (cancelled) return;
        setChat((prev:any) => [...prev, current]);
        setIsTyping(false); // Stop typing after adding to chat

        await new Promise((r) => setTimeout(r, 800));
        if (cancelled) return;

        if (index < dialogue.length - 1) {
            setIndex(index + 1);
        } else {
            setIndex(dialogue.length);
            setShowNext(true);
        }
        })();

        return () => {
        cancelled = true;
        };
    }, [index]);

    const restart = () => {
        setIndex(0);
        setChat([]);
        setDisplayedText("");
        setShowNext(false);
        setIsTyping(false);
    };

    const AvatarLeft = () => (
        <div
        className="w-10 h-10 rounded-full bg-purple-300 border-2 border-purple-500
                        flex items-center justify-center text-xs font-bold text-purple-700 mr-4"
        >
        Alex
        </div>
    );
    const AvatarRight = () => (
        <div
        className="w-10 h-10 rounded-full bg-blue-300 border-2 border-blue-500
                        flex items-center justify-center text-xs font-bold text-blue-700 ml-4"
        >
        Riya
        </div>
    );

    const Bubble = ({ text, speaker, typing }:any) => (
        <div
        className={`px-4 py-2 rounded-2xl max-w-[40%] border-2 ${
            speaker === "left"
            ? "bg-purple-100 border-purple-300 text-purple-800"
            : "bg-blue-100 border-blue-300 text-blue-800"
        }`}
        >
        {typing ? (
            <>
            <span>{text}</span>
            {/* <span className="inline-block w-2 h-4 bg-current ml-1 animate-blink" /> */}
            </>
        ) : (
            text
        )}
        </div>
    );

    return (
        <div className="absolute inset-0 bg-gradient-to-br from-sky-200 to-emerald-100 flex flex-col items-center p-8">
        {/* Background Shapes (unchanged) */}
        <div className="absolute inset-0 flex justify-between items-end px-8 opacity-50">
            <div className="w-32 h-48 bg-green-600 rounded-t-full shadow-lg" />
            <div className="w-24 h-40 bg-green-500 rounded-t-full shadow-lg" />
            <div className="w-28 h-44 bg-green-600 rounded-t-full shadow-lg" />
        </div>

        {/* Chat Container */}
        <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-3xl">
            <div
            className="rounded-xl p-4 flex flex-col gap-4
                            overflow-auto h-[80vh]"
            >
            {/* Render past messages */}
            {chat.map((msg:any, i:any) => (
                <div key={i} className="w-full flex items-start">
                {msg.speaker === "left" ? (
                    <>
                    <AvatarLeft />
                    <Bubble text={msg.text} speaker="left" />
                    <div className="flex-1" />
                    </>
                ) : (
                    <>
                    <div className="flex-1" />
                    <Bubble text={msg.text} speaker="right" />
                    <AvatarRight />
                    </>
                )}
                </div>
            ))}

            {/* Typing message */}
            {isTyping && index < dialogue.length && (
                <div className="w-full flex items-start">
                {dialogue[index].speaker === "left" ? (
                    <>
                    <AvatarLeft />
                    <Bubble text={displayedText} speaker="left" typing />
                    <div className="flex-1" />
                    </>
                ) : (
                    <>
                    <div className="flex-1" />
                    <Bubble text={displayedText} speaker="right" typing />
                    <AvatarRight />
                    </>
                )}
                </div>
            )}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 mt-4">
            <button
                onClick={restart}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full shadow"
            >
                🔁 Replay
            </button>
            <button
                onClick={() => setShowModal(true)}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full shadow"
            >
                🔁 Craft Ad
            </button>
            {showNext && (
                <button
                onClick={() => navigate("/ad-crafter", {state: {from:location?.state?.from}})}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow"
                >
                ➡️ Next
                </button>
            )}
            </div>
            {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    AD Crafter Challenge
                </h2>
                <p className="text-center mb-6">
                    Choose the best advertising format to show the Alex or Riya:
                </p>

                <div className="space-y-3">
                    {options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option.id)}
                        className={`w-full px-4 py-3 rounded-lg text-left ${
                        selectedOption === option.id
                            ? "bg-blue-100 border border-blue-300"
                            : "hover:bg-gray-50"
                        }`}
                    >
                        {option.text}
                    </button>
                    ))}
                </div>

                {feedback && (
                    <div className="mt-6 p-4 rounded-lg text-center text-xl font-bold">
                    {feedback}
                    </div>
                )}

                <button
                    onClick={resetModal}
                    className="mt-4 w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded-full"
                >
                    Close
                </button>
                </div>
            </div>
            )}
        </div>

        {/* <style jsx>{`
            @keyframes blink {
            50% {
                opacity: 0;
            }
            }
            .animate-blink {
            animation: blink 1s step-end infinite;
            }
        `}</style> */}
        </div>
    );
    }
