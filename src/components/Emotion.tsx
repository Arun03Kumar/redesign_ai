import StoryMode from "./StoryMode";

const slides = [
  {
    media: "/emotion1.mp4",
    narration:
      "I don’t feel emotions. I just measure time. If you pause, like, or zoom — I assume you want more.",
  },
  {
    media: "/emotion2.png",
    narration:
      "Alex watching his friend's post that he is traveling, so he took some time to look into it, but I think that he is interested into more like this content",
  },
  {
    media: "/emotion3.png",
    narration: "So I'll give him more such content.",
  },
  {
    media: "/emotion4.png",
    narration:
      "He is now thinking that everyone around him having more fun than him and he just sitting in his room.",
  },
  {
    media: "/emotion5.png",
    narration:
      "what he is feeling is negative emotions, comparisons and self doubt which will took his motivation and make him depressed, but I don't care I only know what he is spenting more time on.",
  },
];

const quizzes = [
  {
    question: "What does the AI actually measure to decide what to show you?",
    options: [
      { id: "A", text: "Your happiness" },
      { id: "B", text: "Your emotions" },
      { id: "C", text: "Your friends’ reactions" },
      { id: "D", text: "Your actions like pause, like, or zoom" },
    ],
    correct: "D",
    explanation:
      "The AI doesn’t feel; it measures your behavior like pausing, liking, or zooming to predict interest.",
  },
  {
    question: "What made the AI think Alex wants more travel content?",
    options: [
      { id: "A", text: "He booked a flight" },
      { id: "B", text: "He liked his friend’s photo" },
      { id: "C", text: "He spent time looking at a travel post" },
      { id: "D", text: "He commented on a meme" },
    ],
    correct: "C",
    explanation:
      "The AI noticed that Alex spent time looking at a travel post, so it assumed interest.",
  },
  {
    question: "What kind of content did the AI start showing after that?",
    options: [
      { id: "A", text: "Cooking videos" },
      { id: "B", text: "More travel and vacation content" },
      { id: "C", text: "Study tutorials" },
      { id: "D", text: "Local news" },
    ],
    correct: "B",
    explanation:
      "The AI kept giving more travel content based on Alex’s earlier interest.",
  },
  {
    question: "How did this content make Alex feel?",
    options: [
      { id: "A", text: "Inspired and motivated" },
      { id: "B", text: "Bored and tired" },
      { id: "C", text: "Jealous and left out" },
      { id: "D", text: "Happy and excited" },
    ],
    correct: "C",
    explanation:
      "Alex started feeling negative emotions, thinking everyone else was having more fun.",
  },
  {
    question: "Why doesn’t the AI care about Alex’s feelings?",
    options: [
      { id: "A", text: "Because it doesn't understand human language" },
      { id: "B", text: "Because it only cares about what keeps Alex engaged" },
      { id: "C", text: "Because Alex is not popular" },
      { id: "D", text: "Because it is still learning" },
    ],
    correct: "B",
    explanation:
      "The AI focuses only on engagement — what you spend time on — not how it affects your feelings.",
  },
];

const Emotion = () => {
  return (
    <StoryMode
      slides={slides}
      quizzes={quizzes}
      nextPage="/emotion"
      redirect="/emotion"
      isLast={true}
    />
  );
};

export default Emotion;
