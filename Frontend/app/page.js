import Link from "next/link";

const feedbackUrl = "https://github.com/omkar-2225/OneNightRush-SPPU/issues/new";

export default function Home() {
  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="landing-copy">
          <div className="pattern-label">
            <span>SPPU · 2024 Pattern</span>
            <span className="label-dot" aria-hidden="true" />
            <span>Made for engineering students</span>
          </div>
          <h1>
            Your next
            <br />
            study session,
            <br />
            <em>sorted.</em>
          </h1>
          <p className="landing-intro">
            Notes, previous-year papers and practicals, gathered in one calm
            corner of the internet. Find what you need, then get on with it.
          </p>
          <Link className="button landing-cta" href="/browse">
            Get started <span aria-hidden="true">→</span>
          </Link>
          <p className="hero-note">
            Currently setting up First Year (common) and Computer Engineering.
          </p>
        </div>

        <aside className="landing-illustration" aria-label="Study materials available">
          <div className="illustration-top">
            <span>THE STUDY SHELF</span>
            <span className="illustration-stamp">24</span>
          </div>
          <p className="illustration-title">A good place to begin.</p>
          <div className="shelf-line">
            <span className="shelf-index">01</span>
            <span>
              <strong>First Year</strong>
              <small>Shared across engineering branches</small>
            </span>
            <span className="shelf-status">FE</span>
          </div>
          <div className="shelf-line">
            <span className="shelf-index">02</span>
            <span>
              <strong>Computer Engineering</strong>
              <small>Second Year · Semester 3</small>
            </span>
            <span className="shelf-status">CE</span>
          </div>
          <div className="illustration-foot">
            Pick a subject. Find the material. Take it from there.
          </div>
          <span className="illustration-orbit" aria-hidden="true" />
        </aside>
      </section>

      <section className="landing-details" aria-labelledby="how-it-works">
        <div className="landing-section-heading">
          <span className="section-kicker">A small start, built to grow</span>
          <h2 id="how-it-works">Less searching. More studying.</h2>
        </div>
        <div className="landing-card-grid">
          <article className="landing-card">
            <span className="landing-card-number">01 / FIND</span>
            <h3>Choose your year</h3>
            <p>
              Pick the 2024 pattern, then choose your branch, year and semester.
            </p>
          </article>
          <article className="landing-card">
            <span className="landing-card-number">02 / PICK</span>
            <h3>Open a subject</h3>
            <p>
              Notes, previous-year papers and practicals live together under
              each subject.
            </p>
          </article>
          <article className="landing-card">
            <span className="landing-card-number">03 / STUDY</span>
            <h3>Go at your pace</h3>
            <p>
              No sign-in and no complicated setup. Just the material you came
              looking for.
            </p>
          </article>
        </div>
      </section>

      <section className="feedback-panel">
        <div>
          <span className="section-kicker">Help shape the shelf</span>
          <h2>Missing something?</h2>
          <p>
            Tell us what subject, paper or correction would make this more
            useful for your next study session.
          </p>
        </div>
        <a
          className="button feedback-button"
          href={feedbackUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Share feedback <span aria-hidden="true">↗</span>
        </a>
      </section>
    </div>
  );
}
