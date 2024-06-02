const getAllBooks = (req, res) => {
  const books = [
    {
      id: 1,
      name: "The Great Gatsby",
    },
    {
      id: 2,
      name: "1984",
    },
  ];

  // Bu JSON tipli deyerleri gondermek ucundur
  res.json(books);
};

// Kitablarla ilgili tum function-lar burda olacaqi ucun
// {} - obj seklinde qeyd edirik

export { getAllBooks };
