import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home-root">
      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">Explore Chemistry with Curiosity</h1>
          <p className="hero-sub">
            Interactive periodic table, practice quizzes, and a smart reaction balancer — built for science enthusiasts.
          </p>
          <div className="hero-ctas">
            <Link to="/elements" className="btn primary">Explore Elements</Link>
            <Link to="/quizzes" className="btn outline">Take a Quiz</Link>
            <Link to="/reaction" className="btn ghost">Balance a Reaction</Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="molecule">H₂O</div>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">For curious minds</h2>
        <div className="cards">
          <article className="card">
            <h3>Interactive Elements</h3>
            <p>Visualize atomic data, properties and discover trends across the periodic table.</p>
          </article>

          <article className="card">
            <h3>Practice & Learn</h3>
            <p>Timed quizzes and instant feedback to sharpen your chemistry skills.</p>
          </article>

          <article className="card">
            <h3>Smart Balancer</h3>
            <p>Balance chemical equations quickly and learn the underlying stoichiometry.</p>
          </article>
        </div>
      </section>

      <section className="bottom-cta">
        <div>
          <h3>Ready to dive in?</h3>
          <p>Join the community of learners exploring the world of chemistry.</p>
        </div>
        <div>
          <Link to="/quizzes" className="btn primary">Start a Quiz</Link>
        </div>
      </section>
    </main>
  );
}