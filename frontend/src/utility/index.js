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

export { successAction };
