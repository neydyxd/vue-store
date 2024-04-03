<template>
  <div>
  </div>
</template>



<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
   name: "ErrorAlert",
   setup() {
    const notify = (text) => {
      toast(text, {
        autoClose: 2000,
        type: "error"
      }); // ToastOptions
    }
    return { notify };
   }
};
</script>




