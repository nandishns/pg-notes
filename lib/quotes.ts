export interface Quote {
  text: string;
  author: string;
}

export const mathematicsQuotes: Quote[] = [
  {
    text: "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding.",
    author: "William Paul Thurston"
  },
  {
    text: "Mathematics is the most beautiful and most powerful creation of the human spirit.",
    author: "Stefan Banach"
  },
  {
    text: "In mathematics, the art of proposing a question must be held of higher value than solving it.",
    author: "Georg Cantor"
  },
  {
    text: "Mathematics is the music of reason.",
    author: "James Joseph Sylvester"
  },
  {
    text: "Mathematics reveals its secrets only to those who approach it with pure love, for its own beauty.",
    author: "Archimedes"
  },
  {
    text: "The essence of mathematics lies in its freedom.",
    author: "Georg Cantor"
  },
  {
    text: "Mathematics is not a careful march down a well-cleared highway, but a journey into a strange wilderness.",
    author: "W.S. Anglin"
  },
  {
    text: "Mathematics is the alphabet with which God has written the universe.",
    author: "Galileo Galilei"
  },
  {
    text: "Pure mathematics is, in its way, the poetry of logical ideas.",
    author: "Albert Einstein"
  },
  {
    text: "Mathematics knows no races or geographic boundaries.",
    author: "Srinivasa Ramanujan"
  },
  {
    text: "God exists since mathematics is consistent, and the Devil exists since we cannot prove it.",
    author: "André Weil"
  },
  {
    text: "Mathematics is the queen of sciences and arithmetic is the queen of mathematics.",
    author: "Carl Friedrich Gauss"
  },
  {
    text: "A mathematician who is not also something of a poet will never be a complete mathematician.",
    author: "Karl Weierstrass"
  },
  {
    text: "Mathematics is a language plus reasoning; it is like a language plus logic.",
    author: "Richard Feynman"
  },
  {
    text: "The study of mathematics, like the Nile, begins in minuteness but ends in magnificence.",
    author: "Charles Caleb Colton"
  },
  {
    text: "If people do not believe that mathematics is simple, it is only because they do not realize how complicated life is.",
    author: "John von Neumann"
  },
  {
    text: "Mathematics is the door and key to the sciences.",
    author: "Roger Bacon"
  },
  {
    text: "The beauty of mathematics only shows itself to more patient followers.",
    author: "Maryam Mirzakhani"
  },
  {
    text: "In mathematics, you don't understand things. You just get used to them.",
    author: "John von Neumann"
  },
  {
    text: "An equation means nothing to me unless it expresses a thought of God.",
    author: "Srinivasa Ramanujan"
  },
  {
    text: "Mathematics is a game played according to certain simple rules with meaningless marks on paper.",
    author: "David Hilbert"
  },
  {
    text: "The only way to learn mathematics is to do mathematics.",
    author: "Paul Halmos"
  },
  {
    text: "Mathematics is not about calculations but concepts.",
    author: "C.N.R. Rao"
  },
  {
    text: "Mathematics is the art of giving the same name to different things.",
    author: "Henri Poincaré"
  },
  {
    text: "The mathematician's patterns, like the painter's or the poet's, must be beautiful.",
    author: "G.H. Hardy"
  },
  {
    text: "Mathematics is the supreme judge; from its decisions there is no appeal.",
    author: "Tobias Dantzig"
  },
  {
    text: "The advancement and perfection of mathematics are intimately connected with the prosperity of the state.",
    author: "Napoleón Bonaparte"
  },
  {
    text: "Mathematics is a place where you can do things which you can't do in the real world.",
    author: "Marcus du Sautoy"
  },
  {
    text: "Without mathematics, there's nothing you can do. Everything around you is mathematics.",
    author: "Shakuntala Devi"
  },
  {
    text: "Mathematics is the art of thinking clearly.",
    author: "Shakuntala Devi"
  }
];

export function getRandomQuote(): Quote {
  const randomIndex = Math.floor(Math.random() * mathematicsQuotes.length);
  return mathematicsQuotes[randomIndex];
} 