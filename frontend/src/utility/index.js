import { useToast } from "vue-toastification";

const sameOptionsToast = {
  position: "top-right",
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
};

const successAction = (result) => {
  const toast = useToast();
  toast.success(result.data.message ? result.data.message : result, {
    timeout: 3000,
    ...sameOptionsToast,
  });
};

const errorAction = (result) => {
  const toast = useToast();
  toast.error(result, {
    timeout: 2000,
    ...sameOptionsToast,
  });
};

const warningAction = (result) => {
  const toast = useToast();
  toast.error(result, {
    timeout: 2000,
    ...sameOptionsToast,
  });
};

const calculateNumberOfPages = (userUploadedBooks, perPage) => {
  return Math.ceil(userUploadedBooks.length / perPage);
};

const limitBooks = (current, perPage, returnUploadedBooks) => {
  const startBookNumber = current * perPage - perPage;
  const endBookNumber = startBookNumber + perPage;
  return returnUploadedBooks.slice(startBookNumber, endBookNumber);
};

const addRatingsForBook = (books, ratings) => {
  // console.log(books, "Booookkkess");
  books.map((book) => {
    const ratingsForBook = ratings?.filter((rating) => {
      return rating.book._id === book._id || rating.book === book._id;
    });

    book.ratings = ratingsForBook;
  });
};

const averageRatings = (book) => {
  if (book?.ratings?.length > 0) {
    const sumRatings = book.ratings.reduce((sum, item) => sum + item.rating, 0);

    return Number((sumRatings / book.ratings.length).toFixed(1));
  } else {
    return "N/A";
  }
};

const compareRatings = (book) => {
  if (averageRatings(book) > 6.6) {
    return "bg-success";
  } else if (averageRatings(book) > 3.3) {
    return "bg-warning";
  }
  return "bg-danger";
};

export {
  successAction,
  calculateNumberOfPages,
  limitBooks,
  errorAction,
  warningAction,
  addRatingsForBook,
  averageRatings,
  compareRatings,
};
