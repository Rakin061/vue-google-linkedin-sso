<template>
  <div class="font-mono text-sm">
    <template v-if="isObject">
      <span class="text-purple-400">{</span>
      <div class="ml-4">
        <div v-for="(val, key) in json" :key="key" class="mb-1">
          <span class="text-blue-400 font-bold">{{ key }}:</span>
          <JSONTree :json="val" />
        </div>
      </div>
      <span class="text-purple-400">}</span>
    </template>

    <template v-else-if="isArray">
      <span class="text-purple-400">[</span>
      <div class="ml-4">
        <div v-for="(item, idx) in json" :key="idx">
          <JSONTree :json="item" />
        </div>
      </div>
      <span class="text-purple-400">]</span>
    </template>

    <template v-else>
      <span :class="valueClass">{{ formattedValue }}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: "JSONTree",
  props: { json: { type: [Object, Array, String, Number, Boolean, null], required: true } },
  computed: {
    isObject() { return this.json && typeof this.json === "object" && !Array.isArray(this.json); },
    isArray() { return Array.isArray(this.json); },
    formattedValue() {
      if (typeof this.json === "string") return `"${this.json}"`;
      if (this.json === null) return "null";
      return this.json.toString();
    },
    valueClass() {
      if (typeof this.json === "string") return "text-green-400";
      if (typeof this.json === "number") return "text-yellow-400";
      if (typeof this.json === "boolean") return "text-pink-400";
      if (this.json === null) return "text-gray-400 italic";
      return "";
    }
  },
  components: { JSONTree: () => import('./JSONTree.vue') }
}
</script>
