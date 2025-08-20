<template>
  <div v-if="visible" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div class="bg-gray-900 text-gray-100 rounded-2xl shadow-2xl w-11/12 max-w-4xl max-h-[80vh] flex flex-col overflow-hidden">
      
      <!-- Header -->
      <div class="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-800">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <div class="flex gap-2">
          <button @click="copyToClipboard" class="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 transition">
            Copy
          </button>
          <button @click="$emit('close')" class="px-3 py-1 bg-red-600 rounded hover:bg-red-700 transition">
            Close
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-4 overflow-auto flex-1 bg-gray-900">
        <JSONTree :json="jsonData" />
      </div>
    </div>
  </div>
</template>

<script>
import JSONTree from './JSONTree.vue'

export default {
  props: {
    visible: { type: Boolean, default: false },
    jsonData: { type: [Object, String], required: true },
    title: { type: String, default: "Response" }
  },
  components: { JSONTree },
  methods: {
    copyToClipboard() {
      const jsonStr = typeof this.jsonData === "string" ? this.jsonData : JSON.stringify(this.jsonData, null, 2)
      navigator.clipboard.writeText(jsonStr).then(() => alert("✅ Copied to clipboard!"))
    }
  }
}
</script>
