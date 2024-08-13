// Composable
import { ref, onMounted, onUnmounted } from "vue";
export default function useMouse() {
  const x = ref(0);
  const y = ref(0);

  function changeCoordinates(e) {
    x.value = e.pageX;
    y.value = e.pageY;
  }

  onMounted(() => window.addEventListener("mousemove", changeCoordinates));
  onUnmounted(() => window.removeEventListener("mousemove", changeCoordinates));

  return { x, y };
}
