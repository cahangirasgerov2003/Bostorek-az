import { useToast } from "vue-toastification";
const successAction = (result) => {
  const toast = useToast();
  toast.success(result.data.message ? result.data.message : result, {
    position: "top-right",
    timeout: 3000,
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
  });
};

const errorAction = (result) => {
  const toast = useToast();
  toast.error(result, {
    position: "top-right",
    timeout: 2000,
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

export { successAction, calculateNumberOfPages, limitBooks, errorAction };
