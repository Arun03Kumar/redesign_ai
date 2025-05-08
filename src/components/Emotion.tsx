import StoryMode from "./StoryMode";
import vid1 from "../assets/story_module/story4/emotion1.mp4"
import img1 from "../assets/story_module/story4/emotion2.webp"
import img2 from "../assets/story_module/story4/emotion3.webp"
import img3 from "../assets/story_module/story4/emotion4.webp"
import img4 from "../assets/story_module/story4/emotion5.webp"

import backgroundImg from "../assets/background3.webp"

const slides = [
  {
    media: vid1,
    type: "video",
    narration:
      "I don’t feel emotions. I just measure time. If you pause, like, or zoom — I assume you want more.",
  },
  {
    media: img1,
    type: "image",
    narration:
      "Alex watching his friend's post that he is traveling, so he took some time to look into it, but I think that he is interested into more like this content",
  },
  {
    media: img2,
    type: "image",
    narration: "So I'll give him more such content.",
  },
  {
    media: img3,
    type: "image",
    narration:
      "He is now thinking that everyone around him having more fun than him and he just sitting in his room.",
  },
  {
    media: img4,
    type: "image",
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
      background_img={backgroundImg}
      fun_link="/game/social_media"
    />
  );
};

export default Emotion;
