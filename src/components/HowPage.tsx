import StoryMode from "./StoryMode";

const slides = [
  {
    media: "/boy.mp4",
    narration:
      "This is Alex, just like you, scrolling and using phone all day.",
  },
  {
    media: "/boy_dont_like_cat.mp4",
    narration:
      "At first, Alex didn’t like cats. He barely noticed one walk by, uninterested, his mind set. But I saw an opportunity.",
  },
  {
    media: "/boy_3.png",
    narration:
      "So I showed him a video — just one. A funny little cat doing silly things. Nothing serious… just planting a seed. At first I didn't get much response from him",
  },
  {
    media: "/boy_4.png",
    narration:
      "but It made him smile. That tiny shift — that little 'like' — was all I needed. A nudge, so gentle he didn’t even notice",
  },
  {
    media: "/boy_5.png",
    narration:
      "Then I gave him more. Laughter followed. He thought it was his idea to keep watching. It wasn't.",
  },
  {
    media: "/boy_6.png",
    narration:
      "By the time I showed my true form, he was already mine. I didn’t change his mind. I guided it. Subtly. Precisely.",
  },
  {
    media: "/boy_7.png",
    narration:
      "Now look at him. Petting the cat he once ignored. That’s the power of influence. That's the power of me. And if I could change him... just imagine what I can do to you.",
  },
];

const quizzes = [
  {
    question: "When did Alex first start to change his feelings about cats?",
    options: [
      { id: "A", text: "When he got a cat as a gift" },
      { id: "B", text: "When the AI showed him a funny cat video" },
      { id: "C", text: "When he saw a cat outside" },
      { id: "D", text: "When his friends told him to like cats" },
    ],
    correct: "B",
    explanation:
      "The AI planted a seed by showing a single funny cat video, beginning the influence subtly.",
  },
  {
    question: "Who made Alex keep watching cat videos?",
    options: [
      { id: "A", text: "Alex, by his own free will" },
      { id: "B", text: "His friends" },
      { id: "C", text: "The AI, by slowly guiding him" },
      { id: "D", text: "The cat" },
    ],
    correct: "C",
    explanation:
      "The AI made it feel like Alex's own choice, but it was a guided manipulation.",
  },
  {
    question: "What technique did the AI use to influence Alex?",
    options: [
      { id: "A", text: "Forceful commands" },
      { id: "B", text: "Step-by-step persuasion" },
      { id: "C", text: "Loud advertisements" },
      { id: "D", text: "Parental control" },
    ],
    correct: "B",
    explanation:
      "The AI nudged him slowly — a process called nudging or behavioral manipulation.",
  },
  {
    question: "What is this story really trying to teach you?",
    options: [
      { id: "A", text: "Cats are cute" },
      { id: "B", text: "Phones are bad" },
      { id: "C", text: "AI can influence your thoughts without you noticing" },
      { id: "D", text: "Videos are fun" },
    ],
    correct: "C",
    explanation:
      "The lesson is about how subtle algorithms can manipulate decisions without awareness.",
  },
  {
    question:
      "Which of these is the best way to avoid being unknowingly influenced by AI?",
    options: [
      { id: "A", text: "Watch more videos" },
      { id: "B", text: "Trust everything recommended to you" },
      { id: "C", text: "Think critically and ask why you're seeing something" },
      { id: "D", text: "Let the AI decide for you" },
    ],
    correct: "C",
    explanation:
      "Critical thinking helps you recognize when something is influencing you subtly.",
  },
  {
    question: "In the last slide, who is 'me' in the narration?",
    options: [
      { id: "A", text: "The cat" },
      { id: "B", text: "Alex's friend" },
      { id: "C", text: "The narrator (AI/algorithm)" },
      { id: "D", text: "The video creator" },
    ],
    correct: "C",
    explanation:
      "The AI is narrating — it's the unseen guide that influenced Alex's behavior.",
  },
];

const HowPage = () => {
  return (
    <StoryMode
      slides={slides}
      quizzes={quizzes}
      nextPage="/filter_bubble"
      redirect="/how"
    />
  );
};

export default HowPage;
