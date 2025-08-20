<template>
  <div class="font-mono text-sm text-left">
    <!-- Object -->
    <template v-if="isObject">
      <div>
        <span class="cursor-pointer select-none" @click="toggle">
          <span class="mr-1">{{ isOpen ? "▼" : "▶" }}</span>
          <span class="text-purple-400">{</span>
        </span>

        <div v-if="isOpen" class="ml-4">
          <div
            v-for="(val, key, idx) in json"
            :key="key"
            class="flex items-start mb-1"
          >
            <span class="text-blue-400 font-bold mr-2">{{ key }}:</span>
            <JSONTree :json="val" />
            <span
              v-if="idx < Object.keys(json).length - 1"
              class="text-purple-400"
            >,</span>
          </div>
        </div>

        <span class="text-purple-400">}</span>
      </div>
    </template>

    <!-- Array -->
    <template v-else-if="isArray">
      <div>
        <span class="cursor-pointer select-none" @click="toggle">
          <span class="mr-1">{{ isOpen ? "▼" : "▶" }}</span>
          <span class="text-purple-400">[</span>
        </span>

        <div v-if="isOpen" class="ml-4">
          <div
            v-for="(item, idx) in json"
            :key="idx"
            class="flex items-start"
          >
            <JSONTree :json="item" />
            <span
              v-if="idx < json.length - 1"
              class="text-purple-400"
            >,</span>
          </div>
        </div>

        <span class="text-purple-400">]</span>
      </div>
    </template>

    <!-- Primitive -->
    <template v-else>
      <span :class="valueClass">{{ formattedValue }}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: "JSONTree",
  props: {
    json: { type: [Object, Array, String, Number, Boolean, null], required: true }
  },
  data() {
    return {
      isOpen: true // by default, expanded
    };
  },
  computed: {
    isObject() {
      return this.json && typeof this.json === "object" && !Array.isArray(this.json);
    },
    isArray() {
      return Array.isArray(this.json);
    },
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
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    }
  },
  components: {
    JSONTree: () => import("./JSONTree.vue")
  }
};
</script>
