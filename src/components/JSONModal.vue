<template>
  <div v-if="visible" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-11/12 max-w-3xl max-h-[80vh] flex flex-col overflow-hidden">
      
      <!-- Header -->
      <div class="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">{{ title }}</h3>
        <div class="flex gap-2">
          <button @click="copyToClipboard" class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Copy
          </button>
          <button @click="$emit('close')" class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
            Close
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-4 overflow-auto flex-1 font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <pre>{{ formattedJson }}</pre>
      </div>

      <!-- Footer (optional) -->
      <div class="p-2 text-right text-xs text-gray-500 dark:text-gray-400">
        JSON Viewer
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: { type: Boolean, default: false },
    jsonData: { type: [Object, String], required: true },
    title: { type: String, default: "Response" }
  },
  computed: {
    formattedJson() {
      if (typeof this.jsonData === "string") {
        try { return JSON.stringify(JSON.parse(this.jsonData), null, 2); }
        catch { return this.jsonData; }
      }
      return JSON.stringify(this.jsonData, null, 2);
    }
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.formattedJson).then(() => {
        alert("✅ Copied to clipboard!");
      });
    }
  }
}
</script>
