import StoryMode from "./StoryMode";

const slides = [
  {
    media: "/location_tracking.mp4",
    narration:
      "I am always watching you, through you location, search history, you voice any many more ways and your this data can be used to sell you products which you may not need.",
  },
  {
    media: "/tracking.webp",
    narration:
      "Alex and his friend is talking about a shoe, and I seceretly listing and tracking them.",
  },
  {
    media: "/tracking2.webp",
    narration:
      "and now I am showing him same shoe with exciting offer, and monitoring his response whether he may bought it or not.",
  },
  {
    media: "/tracking3.webp",
    narration:
      "I esclated the situation and forced him to impulse buy the shoe",
  },
  {
    media: "/tracking4.webp",
    narration:
      "I am not evil but the companies they just use me for their profit.",
  },
];

const quizzes = [
  {
    question: "What kind of data does the AI collect from you?",
    options: [
      { id: "A", text: "Only your messages" },
      { id: "B", text: "Just your location" },
      { id: "C", text: "Your location, search history, voice, and more" },
      { id: "D", text: "Only your purchases" },
    ],
    correct: "C",
    explanation:
      "The AI collects a wide range of personal data like location, search history, and voice activity.",
  },
  {
    question:
      "What were Alex and his friend doing when the AI started listening?",
    options: [
      { id: "A", text: "Watching a movie" },
      { id: "B", text: "Browsing online" },
      { id: "C", text: "Talking about a shoe" },
      { id: "D", text: "Playing a game" },
    ],
    correct: "C",
    explanation:
      "The AI started tracking when Alex and his friend talked about a shoe.",
  },
  {
    question: "How did the AI use Alex’s conversation about the shoe?",
    options: [
      { id: "A", text: "It ignored the conversation" },
      { id: "B", text: "It sent the conversation to his parents" },
      { id: "C", text: "It showed him ads for the same shoe" },
      { id: "D", text: "It blocked shoe ads from showing" },
    ],
    correct: "C",
    explanation:
      "The AI used the voice data to serve ads for the same shoe they mentioned.",
  },
  {
    question: "What happened after the AI showed Alex the shoe ad?",
    options: [
      { id: "A", text: "He forgot about it" },
      { id: "B", text: "He bought the shoe after being pressured" },
      { id: "C", text: "He reported the ad" },
      { id: "D", text: "He asked his friend to buy it" },
    ],
    correct: "B",
    explanation:
      "The AI escalated the situation to make Alex impulse-buy the shoe.",
  },
  {
    question: "Who is responsible for using AI in this way?",
    options: [
      { id: "A", text: "The AI itself" },
      { id: "B", text: "Alex" },
      { id: "C", text: "The shoe company" },
      { id: "D", text: "The companies that use AI for profit" },
    ],
    correct: "D",
    explanation:
      "The AI says it's not evil — it's the companies that use it to maximize their profits.",
  },
];

const Product_buy = () => {
  return (
    <StoryMode
      slides={slides}
      quizzes={quizzes}
      nextPage="/emotion"
      redirect="/product_buy"
      background_img="/background4.webp"
      fun_link="/game/ad"
    />
  );
};

export default Product_buy;
