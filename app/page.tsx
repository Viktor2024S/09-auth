import css from "./Home.module.css";

export default function Home() {
  return (
    <main>
      <div className={css.container}>
        <h1 className={css.title}>
          <span className={css.appNameMain}>NoteHub</span>

          <span className={css.tagline}>
            Your Smartest Way to Organize Life!
          </span>
        </h1>
        <p className={css.description}>
          Imagine a world where every brilliant idea, every important reminder,
          and every personal reflection is perfectly organized and always at
          your fingertips. Welcome to NoteHub, the effortless and intuitive
          application designed to bring clarity and calm to your digital life.
          Whether you&#39;re a student, a professional, or simply someone who
          loves to stay organized, NoteHub is your personal hub for all your
          thoughts.
        </p>

        <h2 className={css.sectionHeading}>What Makes NoteHub Different?</h2>

        <ul className={css.featureList}>
          <li>
            <strong>Effortless Clarity:</strong> A clean, user-friendly
            interface for joyful writing, editing, and browsing. Focus on your
            thoughts, beautifully presented.
          </li>
          <li>
            <strong>Always With You:</strong> Instant access from any device,
            anywhere. Your synchronized ideas are ready when inspiration strikes
            or information is needed.
          </li>
          <li>
            <strong>Find Anything, Fast:</strong> Powerful keyword search and
            smart organization. Quickly pinpoint what you need, eliminating
            wasted time.
          </li>
          <li>
            <strong>Your Ideas, Protected:</strong> Secure and private insights,
            ensuring peace of mind while capturing thoughts.
          </li>
          <li>
            <strong>Tailored to You:</strong> Personalize your note-taking
            experience. NoteHub adapts to your unique style and how you think.
          </li>
        </ul>
        <p className={css.description}>
          <strong>Transform the Way You Think and Work.</strong>
          NoteHub isn&#39;t just an app; it&#39;s your partner in productivity
          and creativity. It helps you clear your mind, stay on top of your
          tasks, and unlock your full potential.
        </p>
        <p className={css.description}>
          Ready to get organized? Join NoteHub today and start turning your
          ideas into action!
        </p>
      </div>
    </main>
  );
}
